const reviewUrl = process.env.REVIEW_SERVICE_URL || "http://localhost:3003";
export const getReview = async (reviewId) => {
  const res = await fetch(`${reviewUrl}/reviews/review/${reviewId}`);
  if (!res.ok) throw new Error("Erro fetching review");
  return res.json();
};
