export const getRatingPercent = (ratingNumber: number) => {
  const roundedRatingNumber = Math.round(ratingNumber);

  const ratingPercentValue = roundedRatingNumber / 5 * 100;

  return `${ratingPercentValue}%`;
};
