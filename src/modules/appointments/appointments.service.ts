import { PrismaClient, AppointmentStatus, UserRole, ServiceLocation } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateAppointmentInput {
  serviceRequestId?: number;
  mechanicId: number;
  vehicleId?: number;
  brand?: string;
  model?: string;
  year?: number;
  mileage?: number;
  serviceType: string;
  description: string;
  location: string;
  serviceLocation: ServiceLocation;
  date: string;
  time: string;
}

export class AppointmentService {
  // Randevu oluştur (manuel veya teklif üzerinden)
  async createAppointment(userId: number, role: UserRole, input: CreateAppointmentInput) {
    const {
      serviceRequestId,
      mechanicId,
      vehicleId,
      brand,
      model,
      year,
      mileage,
      serviceType,
      description,
      location,
      serviceLocation,
      date,
      time,
    } = input;

    if (!serviceType || !description || !mechanicId || !date || !time || !location || !serviceLocation) {
      throw new Error('Zorunlu alanlar eksik');
    }

    let vehicleData: {
        vehicleId: number | null;
        brand?: string;
        model?: string;
        year?: number;
        mileage?: number;
      } = { vehicleId: null };
      

    if (vehicleId) {
      const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
      if (!vehicle || vehicle.userId !== userId) {
        throw new Error('Araç bulunamadı veya size ait değil');
      }
      vehicleData = {
        vehicleId: vehicle.id,
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        mileage: mileage ?? undefined,
      };
    } else if (!brand || !model || !year || !mileage) {
      throw new Error('Manuel araç bilgileri eksik');
    }

    const appointment = await prisma.appointment.create({
      data: {
        serviceRequestId: serviceRequestId ?? null,
        customerId: userId,
        mechanicId,
        vehicleId: vehicleData.vehicleId,
        brand: vehicleData.brand,
        model: vehicleData.model,
        year: vehicleData.year,
        mileage: vehicleData.mileage,
        serviceType,
        description,
        location,
        serviceLocation,
        date: new Date(date),
        time,
        status: AppointmentStatus.SCHEDULED,
      },
      select: {
        id: true,
        serviceType: true,
        date: true,
        time: true,
        status: true,
        createdAt: true,
      },
    });

    return appointment;
  }

  // Kullanıcı veya usta kendi randevularını listeler
  async getMyAppointments(userId: number, role: UserRole) {
    const filter = role === 'MECHANIC' ? { mechanicId: userId } : { customerId: userId };

    const appointments = await prisma.appointment.findMany({
      where: filter,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        serviceType: true,
        date: true,
        time: true,
        status: true,
        location: true,
        serviceLocation: true,
      },
    });

    return appointments;
  }

  // Randevu detayını getir
  async getAppointmentById(userId: number, role: UserRole, appointmentId: number) {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) throw new Error('Randevu bulunamadı');

    if (
      (role === 'CUSTOMER' && appointment.customerId !== userId) ||
      (role === 'MECHANIC' && appointment.mechanicId !== userId)
    ) {
      throw new Error('Bu randevuya erişim yetkiniz yok');
    }

    return appointment;
  }

  // Usta randevu statüsünü günceller
  async updateAppointmentStatus(
    mechanicId: number,
    appointmentId: number,
    status: AppointmentStatus
  ) {
    const valid = ['IN_PROGRESS', 'COMPLETED'];
    if (!valid.includes(status)) throw new Error('Geçersiz durum');

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) throw new Error('Randevu bulunamadı');
    if (appointment.mechanicId !== mechanicId) throw new Error('Yetkisiz erişim');

    // ✅ Eğer "COMPLETED" yapılmak isteniyorsa → servis kaydı kontrolü yap
    if (status === 'COMPLETED') {
      const serviceLog = await prisma.serviceLog.findUnique({
        where: {
          appointmentId: appointment.id,
        },
      });

      if (!serviceLog) {
        throw new Error('Servis kaydı olmadan randevu tamamlanamaz');
      }
    }

    const updated = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status },
      select: {
        id: true,
        status: true,
        updatedAt: true,
      },
    });

    return updated;
  }
}
