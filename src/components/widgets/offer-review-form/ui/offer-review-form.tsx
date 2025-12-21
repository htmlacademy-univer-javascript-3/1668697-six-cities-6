import React, { useEffect, useState } from 'react';

import { useAppDispatch } from '../../../../shared';

import { postReview } from '../../../../store/async-action';

import { RATING_VALUES, COMMENT_OPTIONS } from '../model/constants';
import { validateValues } from '../model/helpers';
import { OfferReviewFormProps } from '../model/types';

export const OfferReviewForm: React.FC<OfferReviewFormProps> = ({ offerId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const [canFormPost, setCanFormPost] = useState(false);
  const [isFormPosting, setIsFormPosting] = useState(false);

  useEffect(() => {
    const areValuesValid = validateValues(rating, comment);

    setCanFormPost(areValuesValid);
  }, [rating, comment]);

  const handleCommentValueChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const handleRatingValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(evt.target.value);

    setRating(value);
  };

  const dispatch = useAppDispatch();

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (offerId) {
      setIsFormPosting(true);

      dispatch(postReview({
        offerId,
        comment,
        rating,
      }));

      setRating(0);
      setComment('');
      setIsFormPosting(false);
    }
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit} aria-disabled={isFormPosting}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        {RATING_VALUES.map(({ value, title }) => (
          <React.Fragment key={title}>
            <input
              className="form__rating-input visually-hidden"
              id={`${value}-stars`}
              name="rating"
              value={value}
              onChange={handleRatingValueChange}
              type="radio"
              checked={rating === Number(value)}
              disabled={isFormPosting}
            />

            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={comment}
        onChange={handleCommentValueChange}
        placeholder="Tell how was your stay, what you like and what can be improved"
        minLength={COMMENT_OPTIONS.minLength}
        maxLength={COMMENT_OPTIONS.maxLength}
        disabled={isFormPosting}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>

        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!canFormPost || isFormPosting}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
