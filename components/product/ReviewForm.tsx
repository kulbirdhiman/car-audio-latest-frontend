"use client";
import { useState } from "react";
import ReviewList from "./ReviewList";

interface ReviewFormData {
  name: string;
  email: string;
  rating: number;
  comment: string;
}

const emojis = ["⭐", "⭐", "⭐", "⭐", "⭐"];

const ReviewForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reviewData: ReviewFormData = { name, email, rating, comment };
    console.log(reviewData);
    setSubmitted(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Submit Your Review</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700">Rating:</label>
            <div className="flex justify-center overflow-auto hide-scrollbar mx-6 space-x-3 mt-2">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setRating(index + 1)}
                  className={`text-3xl sm:text-4xl transition duration-300 transform ${rating === index + 1 ? "scale-125 text-yellow-500" : "text-gray-500"} hover:scale-110 hover:text-yellow-500`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your Comment"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />

          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Submit Review
          </button>
        </form>
      </div>
      <div className="w-full max-w-2xl mx-auto">
        {/* <ReviewList /> */}
      </div>
    </div>
  );
};

export default ReviewForm;