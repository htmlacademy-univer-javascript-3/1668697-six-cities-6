export const validateValues = (rating: number, comment: string) => rating > 0 && comment.length >= 50;
