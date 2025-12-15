import React from 'react';
import classNames from 'classnames';

import { IOfferCity } from '../../../shared';
import { useAppDispatch, useAppSelector } from '../../../shared';
import { setCity } from '../../../store/action';

import { getCitiesData } from '../model/helpers';

export const CitiesList: React.FC = () => {
  const currentCity = useAppSelector((state) => state.city);

  const offersData = useAppSelector((state) => state.offers);
  const citiesData = getCitiesData(offersData);

  const dispatch = useAppDispatch();

  const handleCityChange = (city: IOfferCity) => {
    dispatch(setCity(city));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {citiesData.map((cityData) => (
            <li
              key={cityData.name}
              className="locations__item"
              onClick={() => handleCityChange(cityData)}
            >
              <a
                className={classNames('locations__item-link tabs__item', {
                  ['tabs__item--active']: cityData.name === currentCity.name
                })}
                href="#"
              >
                <span>{cityData.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
