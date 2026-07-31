export type Language = 'en' | 'es';

export type MenuCategory = 
  | 'desayunos'
  | 'sandwiches_baguettes'
  | 'tapas'
  | 'combos'
  | 'burgers'
  | 'huevos'
  | 'platos_combinados'
  | 'pa_amb_oli'
  | 'ensaladas'
  | 'wraps'
  | 'pastas'
  | 'bebidas_sangrias'
  | 'postres';

export interface MenuItem {
  id: string;
  name: string;
  spanishName?: string;
  category: MenuCategory;
  price: number;
  description: string;
  longDescription?: string;
  tags: string[]; // e.g. ['Signature', 'Spicy', 'Popular', 'Gluten-Free', 'Vegan', 'Chef Special']
  image: string;
  alcoholByVolume?: string; // e.g. '14%'
  ingredients?: string[];
  pairingId?: string; // ID of recommended item to pair with
  popularScore?: number; // 1-100
}

export interface ReviewItem {
  id: string;
  author: string;
  authorType?: string; // e.g. 'Local Guide · 18 avis'
  avatar?: string;
  rating: number; // 1-5
  date: string;
  comment: string;
  dishesMentioned?: string[];
  photos?: string[];
  likesCount?: number;
  categoryTags?: string[];
}

export interface ReservationRequest {
  id?: string;
  guestName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guestsCount: number;
  seatingArea: 'terrace' | 'lounge' | 'bar';
  specialRequests?: string;
  createdAt?: string;
  status?: 'confirmed' | 'pending';
}

export interface PairingRecommendation {
  cocktailName: string;
  tapaName: string;
  whyItPairs: string;
  flavorNotes: string[];
  estimatedPrice: number;
  sommelierTip: string;
}

export interface SelectedOrderItem {
  item: MenuItem;
  quantity: number;
}
