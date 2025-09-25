type Rating = { user: string; score: number; _id: string };

export const getAverageRating = (ratings: Rating[]): number => {
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, r) => acc + r.score, 0);
  return parseFloat((sum / ratings.length).toFixed(1));
};
