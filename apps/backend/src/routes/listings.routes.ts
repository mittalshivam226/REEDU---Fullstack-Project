import express from 'express';
import { createListing, getListings, getListingById, getUserListings } from '../controllers/listings.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.route('/').get(getListings).post(protect, createListing);
router.route('/user').get(protect, getUserListings);
router.route('/:id').get(getListingById);

export default router;
