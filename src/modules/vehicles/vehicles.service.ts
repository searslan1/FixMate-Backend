import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateVehicleInput {
  brand: string;
  model: string;
  year: number;
  plate: string;
}

export class VehicleService {
  // Araç ekleme
  async createVehicle(userId: number, data: CreateVehicleInput) {
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { plate: data.plate },
    });

    if (existingVehicle) {
      throw new Error('Bu plaka zaten kayıtlı.');
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        brand: data.brand,
        model: data.model,
        year: data.year,
        plate: data.plate,
        userId: userId,
      },
      select: {
        id: true,
        brand: true,
        model: true,
        year: true,
        plate: true,
        createdAt: true,
      },
    });

    return vehicle;
  }

  // Kendi araçlarını listeleme
  async getMyVehicles(userId: number) {
    const vehicles = await prisma.vehicle.findMany({
      where: { userId: userId },
      select: {
        id: true,
        brand: true,
        model: true,
        year: true,
        plate: true,
        createdAt: true,
      },
    });

    return vehicles;
  }

  // Araç silme
  async deleteVehicle(userId: number, vehicleId: number) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      throw new Error('Araç bulunamadı.');
    }

    if (vehicle.userId !== userId) {
      throw new Error('Bu aracı silme yetkiniz yok.');
    }

    await prisma.vehicle.delete({
      where: { id: vehicleId },
    });

    return;
  }
  // Araç güncelleme
async updateVehicle(userId: number, vehicleId: number, data: { brand?: string; model?: string; year?: number; plate?: string }) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });
  
    if (!vehicle) {
      throw new Error('Araç bulunamadı.');
    }
  
    if (vehicle.userId !== userId) {
      throw new Error('Bu aracı güncelleme yetkiniz yok.');
    }
  
    // Eğer yeni plaka girildiyse ve değiştiriliyorsa, çakışma kontrolü
    if (data.plate && data.plate !== vehicle.plate) {
      const plateExists = await prisma.vehicle.findUnique({
        where: { plate: data.plate },
      });
  
      if (plateExists) {
        throw new Error('Bu plaka başka bir araçta kayıtlı.');
      }
    }
  
    const updatedVehicle = await prisma.vehicle.update({
      where: { id: vehicleId },
      data: {
        brand: data.brand,
        model: data.model,
        year: data.year,
        plate: data.plate,
      },
      select: {
        id: true,
        brand: true,
        model: true,
        year: true,
        plate: true,
        createdAt: true,
      },
    });
  
    return updatedVehicle;
  }
  async getVehicleServiceHistory(vehicleId: number, userId: number) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });
  
    if (!vehicle) throw new Error('Araç bulunamadı.');
    if (vehicle.userId !== userId) throw new Error('Bu araca erişim yetkiniz yok.');
  
    const appointments = await prisma.appointment.findMany({
      where: { vehicleId },
      include: {
        serviceLog: true, // 🔥 ilişkili servis kaydı
      },
      orderBy: { date: 'desc' },
    });
  
    return appointments.filter(a => a.serviceLog); // sadece servis girilmiş kayıtlar döner
  }
  
}
