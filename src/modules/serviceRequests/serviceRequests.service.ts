import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateServiceRequestInput {
  vehicleId?: number;
  brand?: string;
  model?: string;
  year?: number;
  mileage?: number;
  serviceType: string;
  title: string;
  description: string;
  urgency: 'NORMAL' | 'URGENT' | 'PLANNED';
  location: string;
  serviceLocation: 'GARAGE' | 'ON_SITE';
  preferredDate?: Date;
  maxBudget?: number;
  imageUrls?: string[];
}

export class ServiceRequestService {
    async createServiceRequest(userId: number, input: CreateServiceRequestInput) {
        const {
          vehicleId,
          brand,
          model,
          year,
          mileage,
          serviceType,
          title,
          description,
          urgency,
          location,
          serviceLocation,
          preferredDate,
          maxBudget,
          imageUrls = [],
        } = input;
      
        if (vehicleId) {
          const vehicle = await prisma.vehicle.findUnique({
            where: { id: vehicleId },
          });
      
          if (!vehicle || vehicle.userId !== userId) {
            throw new Error('Araç bulunamadı veya size ait değil.');
          }
        } else {
          if (!brand || !model || !year || !mileage) {
            throw new Error('Araç bilgileri eksik.');
          }
        }
      
        const serviceRequest = await prisma.serviceRequest.create({
          data: {
            user: { connect: { id: userId } },
            ...(vehicleId
              ? { vehicle: { connect: { id: vehicleId } } }
              : {
                  brand,
                  model,
                  year,
                  mileage,
                }),
            serviceType,
            title,
            description,
            urgency,
            location,
            serviceLocation,
            preferredDate,
            maxBudget,
            imageUrls,
          },
          select: {
            id: true,
            description: true,
            status: true,
            createdAt: true,
          },
        });
      
        return serviceRequest;
      }
      


  // Kendi iş taleplerini listeleme
  async getMyServiceRequests(userId: number) {
    const serviceRequests = await prisma.serviceRequest.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        description: true,
        serviceType: true,
        urgency: true,
        location: true,
        serviceLocation: true,
        preferredDate: true,
        maxBudget: true,
        status: true,
        createdAt: true,
      },      
    });

    return serviceRequests;
  }

  // Belirli bir iş talebini görüntüleme
  async getServiceRequestById(userId: number, serviceRequestId: number) {
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: serviceRequestId },
      select: {
        id: true,
        title: true,
        description: true,
        serviceType: true,
        urgency: true,
        location: true,
        serviceLocation: true,
        preferredDate: true,
        maxBudget: true,
        status: true,
        createdAt: true,
      },
    });
  

    if (!serviceRequest) {
      throw new Error('İş talebi bulunamadı.');
    }

    // Başka bir kullanıcının talebine erişim engelle
    const belongsToUser = await prisma.serviceRequest.findFirst({
      where: {
        id: serviceRequestId,
        userId: userId,
      },
    });

    if (!belongsToUser) {
      throw new Error('Bu iş talebine erişim yetkiniz yok.');
    }

    return serviceRequest;
  }

  // İş talebini iptal etme
  async cancelServiceRequest(userId: number, serviceRequestId: number) {
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: serviceRequestId },
    });

    if (!serviceRequest) {
      throw new Error('İş talebi bulunamadı.');
    }

    if (serviceRequest.userId !== userId) {
      throw new Error('Bu iş talebini iptal etme yetkiniz yok.');
    }

    if (serviceRequest.status !== 'PENDING') {
      throw new Error('Sadece bekleyen iş talepleri iptal edilebilir.');
    }

    await prisma.serviceRequest.update({
      where: { id: serviceRequestId },
      data: { status: 'CANCELLED' },
    });

    return;
  }
}
