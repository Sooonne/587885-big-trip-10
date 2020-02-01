import AbstractSmartComponent from './abstract-smart-component.js';
import {getShortMonthAndDate} from '../utils/common.js';


// не забыть поправить константы и функцию сортед дейс, она повторяется и здесь нахер не нужна
const createCitiesTemplate = (points) => {
  const sortedPoints = points.sort((a, b) => a.startDate > b.startDate);
  if (sortedPoints.length <= 2) {
    return sortedPoints.map(({destination}) => destination.name).join(` — `);
  } else {
    return `${sortedPoints[0].destination.name} — ... —  ${sortedPoints[sortedPoints.length - 1].destination.name}`;
  }
};

const getTripDates = (points) => {
  const sortedPoints = points.sort((a, b) => a.startDate > b.startDate);
  return `${getShortMonthAndDate(sortedPoints[0].startDate)} — ${getShortMonthAndDate(sortedPoints[sortedPoints.length - 1].startDate)}`;
};


const createCostTemplate = (points) => {
  let fullPricePoints = 0;
  let choosedOffersPrice = 0;
  if (points.length !== 0) {
    const choosedOffersPriceArray = points.map((point) => point.offers.reduce((price, offer) => price + offer.price, 0));
    choosedOffersPrice = choosedOffersPriceArray.reduce((price, offerPrice) => price + offerPrice, 0);
    fullPricePoints = points.reduce((price, point) => price + point.price, 0);
  }
  return fullPricePoints + choosedOffersPrice;
};


const createTripInfoTemplate = (points) => {
  if (points.length === 0) {
    return `<section class="trip-main__trip-info  trip-info"></section>`;
  } else {
    return (
      `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${createCitiesTemplate(points)}</h1>

              <p class="trip-info__dates">${getTripDates(points)}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${createCostTemplate(points)}</span>
            </p>
          </section>`
    );
  }
};

export default class TripInfo extends AbstractSmartComponent {
  constructor(pointsModel) {
    super();
    this._pointsModel = pointsModel;
  }

  getTemplate() {
    return createTripInfoTemplate(this._pointsModel.getPoints());
  }

  recoveryListeners() {
  }

  rerender() {
    super.rerender();
  }
}

