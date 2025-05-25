// components/ReviewList.tsx
import React from "react";

interface Review {
  name: string;
  rating: number;
  comment: string;
}

const reviews: Review[] = [
  {
    rating: 4,
    name: "Karan",
    comment: "This is a sample comment, the product is really great!",
  },
  {
    rating: 5,
    name: "Priya",
    comment: "Loved it! Will definitely recommend this to others.",
  },
  {
    rating: 3,
    name: "John",
    comment: "It's okay, could be better in some aspects.",
  },
];

const emojis: string[] = ["😞", "🙁", "😐", "😊", "😁"];

const ReviewList: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Customer Reviews
      </h2>
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={index}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              {/* Review Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-lg font-semibold text-gray-900">{review.name}</div>
                  <div className="text-xl text-yellow-500">
                    {emojis[review.rating - 1]}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <span key={i} className="text-yellow-500">
                      ⭐
                    </span>
                  ))}
                </div>
              </div>

              {/* Review Comment */}
              <p className="text-gray-700 text-sm mb-4">{review.comment}</p>

              {/* Review Footer (date, etc.) */}
              <div className="mt-4 text-sm text-gray-400">Posted just now</div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 text-lg">
            No reviews yet. Be the first to review!
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
