import { COMMENT_OPTIONS } from './constants';

export const validateValues = (rating: number, comment: string) => rating > 0 && comment.length >= COMMENT_OPTIONS.minLength;
