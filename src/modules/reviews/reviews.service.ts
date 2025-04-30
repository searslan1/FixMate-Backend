import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateReviewInput {
  appointmentId: number;
  rating: number;
  comment?: string;
}

export class ReviewService {
  // Yorum oluştur
  async createReview(userId: number, input: CreateReviewInput) {
    const { appointmentId, rating, comment } = input;

    if (!rating || rating < 1 || rating > 5) {
      throw new Error('Puan 1 ile 5 arasında olmalıdır');
    }

    // Randevu kontrolü
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      throw new Error('Randevu bulunamadı');
    }

    if (appointment.customerId !== userId) {
      throw new Error('Bu randevu size ait değil');
    }

    if (appointment.status !== 'COMPLETED') {
      throw new Error('Sadece tamamlanan randevulara yorum yapılabilir');
    }

    // Daha önce yorum yapılmış mı?
    const existing = await prisma.review.findFirst({
      where: {
        userId,
        mechanicId: appointment.mechanicId,
        appointmentId: appointment.id,
      },
    });

    if (existing) {
      throw new Error('Bu randevuya zaten yorum yapılmış');
    }

    const review = await prisma.review.create({
      data: {
        userId,
        mechanicId: appointment.mechanicId,
        appointmentId: appointment.id,
        rating,
        comment: comment ?? null,
      },
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
      },
    });

    return review;
  }

  // Kullanıcının kendi yorumları
  async getMyReviews(userId: number) {
    return prisma.review.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        mechanic: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  // Belirli ustaya ait tüm yorumlar + ortalama puan
  async getMechanicReviews(mechanicId: number) {
    const reviews = await prisma.review.findMany({
      where: { mechanicId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    const average = await prisma.review.aggregate({
      where: { mechanicId },
      _avg: {
        rating: true,
      },
    });

    return {
      averageRating: average._avg.rating ?? 0,
      totalReviews: reviews.length,
      reviews,
    };
  }
}
