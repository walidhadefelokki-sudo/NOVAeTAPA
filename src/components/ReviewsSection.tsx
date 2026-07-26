import React, { useState } from 'react';
import { REVIEWS_OVERALL, REVIEWS_LIST } from '../data/reviewsData';
import { ReviewItem, Language } from '../types';
import { Star, MessageSquarePlus, ThumbsUp, CheckCircle, MapPin, Search } from 'lucide-react';

interface ReviewsSectionProps {
  currentLang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ currentLang }) => {
  const [selectedTag, setSelectedTag] = useState<string>('All Reviews');
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS_LIST);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);

  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  const filteredReviews = reviewsList.filter((r) => {
    if (selectedTag === 'All Reviews' || selectedTag === 'Todas las opiniones') return true;
    return r.categoryTags?.some((tag) => tag.toLowerCase().includes(selectedTag.toLowerCase().split(' ')[0]));
  });

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const newlyCreated: ReviewItem = {
      id: 'usr-' + Date.now(),
      author: newAuthor,
      authorType: currentLang === 'es' ? 'Cliente Verificado' : 'Verified Guest',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      rating: newRating,
      date: currentLang === 'es' ? 'Ahora mismo' : 'Just now',
      comment: newComment,
      likesCount: 1,
      categoryTags: ['Verified Guest'],
    };

    setReviewsList([newlyCreated, ...reviewsList]);
    setShowAddReviewModal(false);
    setNewAuthor('');
    setNewComment('');
  };

  return (
    <section id="reviews" className="py-16 lg:py-24 bg-paper-textured text-zinc-900 border-b border-zinc-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-xs font-black uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Google Maps (385+ Reseñas)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase text-black">
            {currentLang === 'es' ? 'Opiniones Reales en ' : 'Loved by Guests in '}
            <span className="text-red-600 font-serif italic">Palma Nova</span>
          </h2>
          <p className="text-zinc-700 text-sm sm:text-base font-medium">
            {currentLang === 'es'
              ? 'Más de 385 clientes han valorado nuestra coctelería y tapas con 4.7 sobre 5 estrellas en Google.'
              : 'Over 385 verified diner reviews celebrating our signature tapas, cocktails, and hospitality.'}
          </p>
        </div>

        {/* Rating Breakdown Dashboard Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-zinc-300 shadow-sm mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Big Score Summary */}
            <div className="md:col-span-4 text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-zinc-300 pb-6 md:pb-0 md:pr-8">
              <div className="text-5xl font-black text-black flex items-center justify-center md:justify-start gap-2">
                <span>4.7</span>
                <span className="text-amber-500 text-3xl">★</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-xs text-zinc-600 font-bold">
                {currentLang === 'es' ? 'Basado en 385 opiniones verificadas en Google' : 'Based on 385 verified reviews on Google Maps'}
              </p>
              <div className="inline-block px-3 py-1 rounded-md bg-zinc-100 text-zinc-900 text-xs font-black border border-zinc-300">
                10–20 € {currentLang === 'es' ? 'por persona' : 'per person'}
              </div>
            </div>

            {/* Star Distribution Bars */}
            <div className="md:col-span-8 space-y-2">
              {Object.entries(REVIEWS_OVERALL.starDistribution)
                .reverse()
                .map(([star, count]) => {
                  const percentage = Math.round((count / REVIEWS_OVERALL.totalReviews) * 100);
                  return (
                    <div key={star} className="flex items-center gap-3 text-xs">
                      <span className="w-8 font-extrabold text-zinc-700 flex items-center gap-0.5">
                        {star} <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      </span>
                      <div className="flex-1 h-2.5 rounded-full bg-zinc-200 overflow-hidden border border-zinc-300">
                        <div
                          className="h-full bg-red-600 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-10 text-right font-mono font-bold text-zinc-600">{count}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Filter Chips & Add Review CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {REVIEWS_OVERALL.keywordChips.map((chip) => (
              <button
                key={chip.label}
                onClick={() => setSelectedTag(chip.label)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all active:scale-95 shrink-0 uppercase ${
                  selectedTag === chip.label
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-white text-zinc-800 hover:text-black border-2 border-zinc-300'
                }`}
              >
                {chip.label} ({chip.count})
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddReviewModal(true)}
            className="w-full sm:w-auto min-h-[42px] px-4 py-2.5 rounded-xl bg-black hover:bg-zinc-800 active:scale-95 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 shrink-0 uppercase tracking-wider"
          >
            <MessageSquarePlus className="w-4 h-4 text-red-500" />
            <span>{currentLang === 'es' ? 'Escribir Opinión' : 'Write a Review'}</span>
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((r) => (
            <div
              key={r.id}
              className="p-6 rounded-2xl bg-white border-2 border-zinc-300 hover:border-black transition-all flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-3">
                {/* Author Info Header */}
                <div className="flex items-center gap-3">
                  <img
                    src={r.avatar}
                    alt={r.author}
                    className="w-10 h-10 rounded-full object-cover border-2 border-black"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-black flex items-center gap-1.5">
                      <span>{r.author}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-blue-600" title="Verified Diner" />
                    </h4>
                    <p className="text-[11px] text-zinc-500 font-bold">{r.authorType || 'Google Reviewer'}</p>
                  </div>
                </div>

                {/* Rating Stars & Date */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] text-zinc-500 font-bold">{r.date}</span>
                </div>

                {/* Comment */}
                <p className="text-xs text-zinc-700 leading-relaxed font-medium">"{r.comment}"</p>
              </div>

              {/* Dishes Mentioned Tags */}
              {r.dishesMentioned && (
                <div className="pt-3 border-t border-zinc-200 flex flex-wrap gap-1.5">
                  {r.dishesMentioned.map((dish, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 text-[10px] font-bold border border-zinc-300"
                    >
                      🍽️ {dish}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      {showAddReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black max-w-md w-full rounded-2xl p-6 space-y-4 text-zinc-900 shadow-2xl relative">
            <button
              onClick={() => setShowAddReviewModal(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-black font-bold text-lg"
            >
              ✕
            </button>

            <h3 className="text-lg font-black uppercase text-black">
              {currentLang === 'es' ? 'Escribe tu Opinión' : 'Write a Review'}
            </h3>
            <p className="text-xs text-zinc-600 font-medium">
              {currentLang === 'es' ? 'Comparte tu experiencia con futuros clientes.' : 'Share your experience with future guests.'}
            </p>

            <form onSubmit={handleAddReviewSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase text-zinc-800 block mb-1">
                  {currentLang === 'es' ? 'Tu Nombre' : 'Your Name'}
                </label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="Ej. Carlos M."
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-100 border border-zinc-300 text-xs text-black focus:outline-none focus:border-red-600 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase text-zinc-800 block mb-1">
                  {currentLang === 'es' ? 'Valoración' : 'Star Rating'}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setNewRating(num)}
                      className="p-1 text-amber-500 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${num <= newRating ? 'fill-amber-500' : 'text-zinc-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-black uppercase text-zinc-800 block mb-1">
                  {currentLang === 'es' ? 'Tu Opinión' : 'Your Review'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={currentLang === 'es' ? '¿Cómo estuvo la experiencia?' : 'How was your experience?'}
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-100 border border-zinc-300 text-xs text-black focus:outline-none focus:border-red-600 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider"
              >
                {currentLang === 'es' ? 'Publicar Reseña' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
