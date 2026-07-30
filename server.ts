import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory database for demo storage
const ordersDatabase: Array<{
  id: string;
  phone: string;
  customerName?: string;
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  totalAmount: number;
  notes?: string;
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

// Online Order Endpoint
app.post('/api/orders', (req, res) => {
  try {
    const { phone, customerName, items, totalAmount, notes } = req.body;

    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required to place an order' });
    }

    const orderRef = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      id: orderRef,
      phone,
      customerName: customerName || 'Cliente NOVAeTAPA',
      items: Array.isArray(items) ? items : [],
      totalAmount: Number(totalAmount) || 0,
      notes: notes || '',
      createdAt: new Date().toISOString(),
      status: 'confirmed' as const,
    };

    ordersDatabase.push(newOrder);

    return res.status(201).json({
      success: true,
      message: 'Order confirmed successfully at NOVAeTAPA',
      order: newOrder,
    });
  } catch (error) {
    console.error('Order Processing Error:', error);
    return res.status(500).json({ error: 'Failed to process order' });
  }
});

// Get User Orders
app.get('/api/orders', (req, res) => {
  res.json({
    count: ordersDatabase.length,
    orders: ordersDatabase,
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
