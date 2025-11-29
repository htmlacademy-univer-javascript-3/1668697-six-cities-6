import React, { useState } from 'react';
import classNames from 'classnames';

import { SortType } from '../../../shared';

import styles from './OffersSort.module.css';

export const OffersSort: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpenChange = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const sortTypes = Object.values(SortType);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className={classNames('places__sorting-caption', styles['caption'])}>Sort by</span>

      <span className="places__sorting-type" tabIndex={0} onClick={handleIsOpenChange}>
        <span>Popular</span>
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul className={classNames('places__options places__options--custom', {
        ['places__options--opened']: isOpen
      })}
      >
        {sortTypes.map((sortType) => (
          <li key={sortType} className="places__option" tabIndex={0}>{sortType}</li>
        ))}
      </ul>
    </form>
  );
};
