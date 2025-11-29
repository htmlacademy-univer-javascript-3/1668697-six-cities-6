import React from 'react';
import classNames from 'classnames';

import { IOfferCity } from '../../../shared';
import { useAppDispatch, useAppSelector } from '../../../shared';
import { changeCity } from '../../../store/action';
import { cityMocks } from '../../../mocks';

export const CitiesList: React.FC = () => {
  const currentCity = useAppSelector((state) => state.city);

  const citiesData = Object.values(cityMocks);

  const dispatch = useAppDispatch();

  const handleCityChange = (city: IOfferCity) => {
    dispatch(changeCity(city.title));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {citiesData.map((cityData) => (
            <li
              key={cityData.id}
              className="locations__item"
              onClick={() => handleCityChange(cityData)}
            >
              <a
                className={classNames('locations__item-link tabs__item', {
                  ['tabs__item--active']: cityData.title === currentCity
                })}
                href="#"
              >
                <span>{cityData.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
