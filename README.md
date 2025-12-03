<<<<<<< HEAD
# REEDU - Second-Hand Competitive Exam Books Marketplace

REEDU is a full-stack web platform for buying, selling, exchanging, and renting second-hand competitive exam books (NEET, JEE, UPSC, CAT, etc.). Built with React, TypeScript, Vite, Tailwind CSS, and Supabase.

## Features

### Current Implementation (MVP)

- **User Authentication**: Email/password authentication powered by Supabase
- **Book Listings**: Users can create, view, edit, and delete book listings
- **Advanced Search & Filters**: Search by exam, subject, condition, location, and keywords
- **Book Details**: Comprehensive book detail pages with images and seller information
- **Save/Favorite Books**: Users can save books for later viewing
- **User Dashboard**: Manage your listings and view statistics
- **Responsive Design**: Mobile-first design that works on all devices
- **Image Upload**: Support for multiple book images via Supabase Storage

### Target Users

- Students preparing for competitive exams
- Coaching centers
- Book resellers

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons

### Backend & Database
- **Supabase** (PostgreSQL database)
- **Supabase Auth** for authentication
- **Supabase Storage** for image storage
- **Row Level Security (RLS)** for data protection

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mittalshivam226/REEDU.git
cd REEDU
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` and add your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup

The database schema has been created with migrations. The following tables are available:

- `profiles` - Extended user profile information
- `exam_categories` - Master list of exams (NEET, JEE, UPSC, etc.)
- `subjects` - Subjects for each exam
- `book_conditions` - Standardized condition ratings
- `books` - Main book listings
- `book_images` - Book image URLs
- `saved_books` - User's saved/favorited books
- `search_history` - Search query tracking

Seed data for exam categories, subjects, and book conditions has been automatically populated.

### Storage Setup

A storage bucket named `book-images` has been created for storing book photos with public read access.

### Running the Application

Development mode:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
REEDU/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Layout/        # Layout components (Header, Footer)
│   │   └── Books/         # Book-related components
│   ├── contexts/          # React contexts (Auth)
│   ├── lib/               # Utility functions and API clients
│   │   ├── api/           # API functions for data operations
│   │   └── supabase.ts    # Supabase client configuration
│   ├── pages/             # Page components
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Main app component with routes
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── supabase/
│   └── migrations/        # Database migrations
├── .env                   # Environment variables (not in git)
├── .env.example           # Example environment variables
└── package.json           # Project dependencies
```

## Key Features Explained

### Authentication
- Users can sign up with email and password
- Automatic profile creation on signup
- Protected routes for authenticated users only

### Book Listings
- Sell, rent, or exchange books
- Multiple image upload support
- Categorization by exam and subject
- Condition rating system
- Location-based filtering
- Negotiable pricing option

### Search & Discovery
- Browse all books
- Filter by exam, subject, condition, and location
- Keyword search in titles
- View count and save count tracking

### User Dashboard
- View all your listings
- Edit or delete listings
- Track views and saves
- Quick access to saved books

## Security

- Row Level Security (RLS) enabled on all tables
- Users can only modify their own data
- Public read access for book browsing
- Secure authentication with Supabase Auth
- Sensitive operations require authentication

## Future Enhancements (Planned)

### Phase 2
- Real-time chat between buyers and sellers
- ISBN-based autofill using external APIs
- Email notifications for interested buyers
- Advanced search with Elasticsearch
- Mobile app (React Native)

### Phase 3
- Payment integration (Razoray/Stripe)
- Escrow-based secure transactions
- Recommendation engine based on user behavior
- Admin dashboard for platform management
- Verified coaching center badges
- OCR for extracting book details from photos

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or contributions, please open an issue on GitHub or contact the maintainers.

---

Built with ❤️ for students by students
=======
# REEDU---Fullstack-Project
>>>>>>> 375524bf997f47b972dfd533aebbf411df08d90a
