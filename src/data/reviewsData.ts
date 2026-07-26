import { ReviewItem } from '../types';

export const REVIEWS_OVERALL = {
  rating: 4.7,
  totalReviews: 385,
  priceRange: '10–20 € per person',
  location: 'Passeig Mar, 32, Loc 2, 07181 Palma Nova, Balearic Islands, Spain',
  starDistribution: {
    5: 320,
    4: 48,
    3: 12,
    2: 3,
    1: 2,
  },
  keywordChips: [
    { label: 'All Reviews', count: 385 },
    { label: 'Tapas', count: 132 },
    { label: 'Sangria', count: 17 },
    { label: 'Beach / Plage', count: 11 },
    { label: 'Spanish / Local', count: 10 },
    { label: 'Cocktails & Beer', count: 28 },
  ],
};

export const REVIEWS_LIST: ReviewItem[] = [
  {
    id: 'r1',
    author: 'Byanka Lagarde',
    authorType: '5 reviews · 6 photos',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '1 month ago',
    comment:
      'Absolutely fantastic tapas restaurant! The food at Nova eTapas was simply superb – every dish was fresh, authentic, and full of flavor. The staff were incredibly friendly, welcoming, and attentive, making the whole experience unforgettable!',
    dishesMentioned: ['Combo Tapas', 'Gambas al Ajillo', 'Sangria'],
    likesCount: 14,
    categoryTags: ['Tapas', 'Spanish / Local', 'Beach / Plage'],
  },
  {
    id: 'r2',
    author: 'Konrad Gawor',
    authorType: 'Local Guide · 18 reviews · 17 photos',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '2 months ago',
    comment:
      'Very tasty food. We had gambas al ajillo 🍤, mussels, chicken wings, carbonara, and delicious Estrella beer on tap. Good dessert. Good prices (10-20 € per person). I recommend it 100%!',
    dishesMentioned: ['Gambas al Ajillo', 'Mussels', 'Estrella Beer on Tap'],
    likesCount: 22,
    categoryTags: ['Tapas', 'Cocktails & Beer'],
  },
  {
    id: 'r3',
    author: 'Hahaha Tsang',
    authorType: 'Local Guide · 39 reviews · 135 photos',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '2 months ago',
    comment:
      'The tapas is so good! Very local and the options are insane. I love their fried small squid (puntillitas), patatas bravas, and their chorizo a lot! Amazing atmosphere in Palma Nova.',
    dishesMentioned: ['Fried Small Squid', 'Patatas Bravas', 'Chorizo a la Sidra'],
    likesCount: 9,
    categoryTags: ['Tapas', 'Spanish / Local'],
  },
  {
    id: 'r4',
    author: 'Marco Rossi',
    authorType: 'Tourist from Milan · 12 reviews',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '3 weeks ago',
    comment:
      'Best cocktail lounge and tapas spot on the Passeig Mar strip! The Palma Crimson Smoked Sour cocktail was mindblowing and the Cava Sangria pitcher was super generous.',
    dishesMentioned: ['Palma Crimson Smoked Sour', 'Cava Sangria', 'Croquetas'],
    likesCount: 18,
    categoryTags: ['Cocktails & Beer', 'Sangria'],
  },
  {
    id: 'r5',
    author: 'Elena Gomez',
    authorType: 'Palma Resident · 45 reviews',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '3 months ago',
    comment:
      'Increíble lugar en Palma Nova. Las albóndigas caseras y el pulpo son insuperables. El servicio es super amable y la terraza por la noche es preciosa.',
    dishesMentioned: ['Albóndigas', 'Combo Tapas'],
    likesCount: 11,
    categoryTags: ['Spanish / Local', 'Tapas'],
  },
];
