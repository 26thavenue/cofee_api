import { PrismaClient } from '@prisma/client';

export const connectDB = async () => {
  const prisma = new PrismaClient();

  try {
    // Connect to the database
    await prisma.$connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};