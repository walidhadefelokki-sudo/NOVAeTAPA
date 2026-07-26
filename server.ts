import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory database for demo storage
const reservationsDatabase: Array<{
  id: string;
  guestName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guestsCount: number;
  seatingArea: string;
  specialRequests?: string;
  createdAt: string;
  status: 'confirmed';
}> = [];

const customReviewsDatabase: Array<any> = [];

// ---------------- API ROUTES ----------------

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'NOVAeTAPA Palma Nova',
    time: new Date().toISOString(),
  });
});

// Table Reservation Endpoint
app.post('/api/reservations', (req, res) => {
  try {
    const { guestName, email, phone, date, time, guestsCount, seatingArea, specialRequests } = req.body;

    if (!guestName || !phone || !date || !time) {
      return res.status(400).json({ error: 'Missing required reservation fields' });
    }

    const refCode = 'NV-' + Math.floor(100000 + Math.random() * 900000);
    const newBooking = {
      id: refCode,
      guestName,
      email: email || 'guest@palmanova.es',
      phone,
      date,
      time,
      guestsCount: Number(guestsCount) || 2,
      seatingArea: seatingArea || 'terrace',
      specialRequests: specialRequests || '',
      createdAt: new Date().toISOString(),
      status: 'confirmed' as const,
    };

    reservationsDatabase.push(newBooking);

    return res.status(201).json({
      success: true,
      message: 'Table reservation confirmed successfully at NOVAeTAPA',
      reservation: newBooking,
    });
  } catch (error) {
    console.error('Reservation Error:', error);
    return res.status(500).json({ error: 'Failed to process reservation' });
  }
});

// Get User Reservations
app.get('/api/reservations', (req, res) => {
  res.json({
    count: reservationsDatabase.length,
    reservations: reservationsDatabase,
  });
});

// Submit Guest Review
app.post('/api/reviews', (req, res) => {
  const { author, rating, comment, dishes } = req.body;
  if (!author || !rating || !comment) {
    return res.status(400).json({ error: 'Missing review details' });
  }

  const newReview = {
    id: 'usr-' + Date.now(),
    author,
    authorType: 'Verified Diner',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    rating: Number(rating),
    date: 'Just now',
    comment,
    dishesMentioned: dishes || ['Signature Cocktail', 'Tapas'],
    likesCount: 1,
    categoryTags: ['Verified Diner'],
  };

  customReviewsDatabase.unshift(newReview);
  return res.status(201).json({ success: true, review: newReview });
});

// ---------------- VITE MIDDLEWARE / PRODUCTION STATIC ----------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NOVAeTAPA Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
