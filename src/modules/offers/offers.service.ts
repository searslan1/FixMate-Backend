import { PrismaClient, OfferStatus, OfferType } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateOfferInput {
    serviceRequestId: number;
    price: number;
    type: OfferType;
    date: string;
    time: string;
    message?: string;
    durationEstimate: number;  // ✅ eklendi
  }
  

export class OfferService {
  // Teklif oluşturma
  async createOffer(mechanicId: number, input: CreateOfferInput) {
    const { serviceRequestId, price, type, date, time, message, durationEstimate } = input;

    // İlgili iş talebi kontrolü
    const request = await prisma.serviceRequest.findUnique({
      where: { id: serviceRequestId },
    });

    if (!request) throw new Error('İlgili iş talebi bulunamadı.');

    // Teklif oluştur
    const offer = await prisma.offer.create({
        data: {
            serviceRequestId,
            mechanicId,
            price,
            type,
            date,
            time,
            message,
            durationEstimate,
            status: OfferStatus.PENDING,
          },
      select: {
        id: true,
        price: true,
        type: true,
        date: true,
        time: true,
        status: true,
        createdAt: true,
      },
    });

    return offer;
  }

  // Ustanın kendi teklifleri
  async getMyOffers(mechanicId: number, status?: string) {
    const filters: any = { mechanicId };

    if (status && ['PENDING', 'ACCEPTED', 'REJECTED'].includes(status)) {
      filters.status = status;
    }

    const offers = await prisma.offer.findMany({
      where: filters,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        serviceRequestId: true,
        price: true,
        type: true,
        date: true,
        time: true,
        status: true,
        createdAt: true,
      },
    });

    return offers;
  }

  // Kullanıcının iş talebine gelen teklifler
  async getOffersByServiceRequestId(userId: number, serviceRequestId: number) {
    const request = await prisma.serviceRequest.findUnique({
      where: { id: serviceRequestId },
    });

    if (!request || request.userId !== userId) {
      throw new Error('İş talebine erişim yetkiniz yok.');
    }

    const offers = await prisma.offer.findMany({
      where: { serviceRequestId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        mechanicId: true,
        price: true,
        type: true,
        date: true,
        time: true,
        status: true,
        message: true,
        createdAt: true,
      },
    });

    return offers;
  }

  // Teklif durumu güncelleme
  async updateOfferStatus(userId: number, offerId: number, status: OfferStatus) {
    const offer = await prisma.offer.findUnique({
      where: { id: offerId },
      include: {
        serviceRequest: true,
      },
    });

    if (!offer || offer.serviceRequest.userId !== userId) {
      throw new Error('Bu teklife erişim yetkiniz yok.');
    }

    if (!['ACCEPTED', 'REJECTED'].includes(status)) {
      throw new Error('Geçersiz teklif durumu.');
    }

    const updated = await prisma.offer.update({
      where: { id: offerId },
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
