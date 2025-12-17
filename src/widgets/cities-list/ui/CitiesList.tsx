import React, { useCallback, memo } from 'react';
import classNames from 'classnames';

import { IOfferCity } from '../../../shared';
import { useAppDispatch, useAppSelector } from '../../../shared';
import { getCity, getOffers } from '../../../store/slices';

import { getCitiesData } from '../model/helpers';

export const CitiesListComponent: React.FC = () => {
  const currentCity = useAppSelector(getCity);

  const offersData = useAppSelector(getOffers);
  const citiesData = getCitiesData(offersData);

  const dispatch = useAppDispatch();

  const handleCityChange = useCallback(
    (city: IOfferCity) => {
      dispatch(setCity(city)); // TODO:
    },
    [dispatch]
  );

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {citiesData.map((citiesItemData) => (
            <li
              key={citiesItemData.name}
              className="locations__item"
              onClick={() => handleCityChange(citiesItemData)}
            >
              <a
                className={classNames('locations__item-link tabs__item', {
                  ['tabs__item--active']: citiesItemData.name === currentCity.name
                })}
                href="#"
              >
                <span>{citiesItemData.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export const CitiesList = memo(CitiesListComponent);
