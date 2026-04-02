import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middlewares/auth.middleware';

export const createListing = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, price, condition, location, tags, edition, isbn, images } = req.body;

    if (!title || !price || !condition || !location) {
      res.status(400).json({ success: false, message: 'Missing minimum required fields (title, price, condition, location)' });
      return;
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price: Number(price),
        condition,
        location,
        tags: tags || [],
        edition,
        isbn,
        images: images || [],
        userId: req.user.id, // Enforced by auth.middleware
      },
      include: {
         user: {
            select: { name: true, id: true }
         }
      }
    });

    res.status(201).json({ success: true, listing });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getListings = async (req: Request, res: Response): Promise<void> => {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
         user: {
            select: { name: true, id: true }
         }
      }
    });

    res.status(200).json({ success: true, count: listings.length, listings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getListingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const listing = await prisma.listing.findUnique({
      where: { id: req.params.id },
      include: {
         user: {
            select: { name: true, createdAt: true }
         }
      }
    });

    if (!listing) {
      res.status(404).json({ success: false, message: 'Listing document missing from MongoDB' });
      return;
    }

    res.status(200).json({ success: true, listing });
  } catch (error: any) {
    if (error.code === 'P2023') { // Prisma ObjectId malformed error trap
      res.status(400).json({ success: false, message: 'Invalid MongoDB ObjectId provided in URL route' });
      return;
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserListings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const listings = await prisma.listing.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ success: true, count: listings.length, listings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
