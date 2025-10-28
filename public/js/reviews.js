const express = require('express');
const router = express.Router();

// Example in-memory "reviews" store
let reviews = [
  { id: 1, comment: "Great product!", rating: 5 },
  { id: 2, comment: "Not bad", rating: 3 }
];

// ================= Review Routes =================

// GET all reviews
router.get('/', (req, res) => {
  res.json(reviews);
});

// GET a single review by ID
router.get('/:id', (req, res) => {
  const review = reviews.find(r => r.id === parseInt(req.params.id));
  if (!review) return res.status(404).json({ message: "Review not found" });
  res.json(review);
});

// POST a new review
router.post('/', (req, res) => {
  const { comment, rating } = req.body;
  const newReview = {
    id: reviews.length + 1,
    comment,
    rating
  };
  reviews.push(newReview);
  res.status(201).json(newReview);
});

// PUT update a review
router.put('/:id', (req, res) => {
  const review = reviews.find(r => r.id === parseInt(req.params.id));
  if (!review) return res.status(404).json({ message: "Review not found" });

  const { comment, rating } = req.body;
  review.comment = comment ?? review.comment;
  review.rating = rating ?? review.rating;

  res.json(review);
});

// DELETE a review
router.delete('/:id', (req, res) => {
  const reviewIndex = reviews.findIndex(r => r.id === parseInt(req.params.id));
  if (reviewIndex === -1) return res.status(404).json({ message: "Review not found" });

  const deleted = reviews.splice(reviewIndex, 1);
  res.json(deleted[0]);
});

module.exports = router;
