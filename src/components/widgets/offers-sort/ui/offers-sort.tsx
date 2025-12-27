import classNames from 'classnames';
import React, { useState, useCallback, memo } from 'react';

import { OffersSortType } from '../../../../shared';
import { useAppDispatch, useAppSelector } from '../../../../shared';

import { getOffersSortType, offersData } from '../../../../store/slices';

import './offers-sort.css';

export const OffersSortComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();

  const currentOffersSortType = useAppSelector(getOffersSortType);

  const handleIsOpenChange = useCallback(
    () => {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    },
    []
  );

  const handleSortItemClick = useCallback(
    (newSOffersSortType: OffersSortType) => {
      dispatch(offersData.actions.setOffersSortType(newSOffersSortType));

      setIsOpen(false);
    },
    [dispatch]
  );

  const sortTypes = Object.values(OffersSortType);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className={classNames('places__sorting-caption', 'caption')}>Sort by</span>

      <span className="places__sorting-type" tabIndex={0} onClick={handleIsOpenChange}>
        <span>{currentOffersSortType}</span>
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul className={classNames('places__options places__options--custom', {
        ['places__options--opened']: isOpen
      })}
      >
        {sortTypes.map((sortType) => (
          <li
            key={sortType}
            className={classNames('places__option', 'option', {
              ['option_active']: sortType === currentOffersSortType
            })}
            tabIndex={0}
            onClick={() => handleSortItemClick(sortType)}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
};

export const OffersSort = memo(OffersSortComponent);
