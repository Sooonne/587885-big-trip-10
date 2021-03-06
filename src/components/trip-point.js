import {formatTimeDuration, formatTime, capitalizeString} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';

const createOffersTemplate = (offers) => {
  if (offers.length) {
    return offers.map((it) => (
      `<li class="event__offer">
             <span class="event__offer-title">${it.title}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
            </li>`
    )).join(``);
  } else {
    return ``;
  }
};

const createTripPointTemplate = (tripPoint) => {
  const {type, destination, price, offers, startDate, endDate, duration} = tripPoint;
  let preposition = `to`;
  if ((type === `check`) || (type === `sightseeing`) || (type === `restaurant`)) {
    preposition = `in`;
  }
  return `<li class="trip-events__item">
  <div class="event">
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${capitalizeString(type)} ${preposition} ${destination.name}</h3>

    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${formatTime(startDate)}">${formatTime(startDate)}</time>
        &mdash;
        <time class="event__end-time" datetime="${formatTime(endDate)}">${formatTime(endDate)}</time>
      </p>
      <p class="event__duration">${formatTimeDuration(duration)}</p>
    </div>

    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>

    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${createOffersTemplate(offers.slice(0, 3))}
    </ul>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

export default class TripPoint extends AbstractComponent {
  constructor(tripPoint) {
    super();
    this._tripPoint = tripPoint;
  }

  getTemplate() {
    return createTripPointTemplate(this._tripPoint);
  }

  setEditButtonHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, handler);
  }
}
