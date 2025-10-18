import { PrismaClient } from '@prisma/client';

/**
 * Prisma Client Singleton
 *
 * This ensures a single PrismaClient instance is used throughout the application.
 * In development, this prevents exhausting database connections during hot-reload.
 * In production, this optimizes connection pooling.
 */

// Extend global type to include prisma
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// Create Prisma Client with logging configuration
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn'] // Verbose logging in development
        : ['error'], // Only errors in production
  });

// Prevent multiple instances in development (hot-reload)
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;
