import express from 'express';
import { createListing, getListings, getListingById } from '../controllers/listings.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.route('/').get(getListings).post(protect, createListing);
router.route('/:id').get(getListingById);

export default router;
