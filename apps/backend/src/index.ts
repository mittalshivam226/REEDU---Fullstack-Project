import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/auth.routes';
import listingRoutes from './routes/listings.routes';

// Load the root environment variables
dotenv.config({ path: path.join(__dirname, '../../../.env') });

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// API Routers
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);

app.get('/api/health', async (req, res) => {
  try {
    // Ping to verify MongoDB connection is successful
    await prisma.$runCommandRaw({ ping: 1 });
    res.status(200).json({ status: 'healthy', database: 'connected to MongoDB' });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', error: error });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 [BACKEND] Clean Server running on port ${PORT}`);
  console.log(`🔌 [DATABASE] Standby for MongoDB Queries...`);
});
