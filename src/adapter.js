import {convertMinsToHrsMins} from "./utils.js";

class Adapter {
  constructor(data) {
    this.id = data[`id`];
    this.isFavorite = data[`is_favorite`];
    this.title = data[`name`];
    this.date = data[`released`].toString();
    this.genre = data[`genre`].split();
    this.previewPoster = data[`preview_image`];
    this.poster = data[`poster_image`];
    this.posterBig = data[`background_image`];
    this.backgroundColor = data[`background_color`];
    this.video = data[`video_link`];
    this.previewVideo = data[`preview_video_link`];
    this.rating = data[`rating`];
    this.time = convertMinsToHrsMins(data[`run_time`]);
    this.ratingCount = data[`scores_count`];
    this.director = data[`director`].split();
    this.stars = data[`starring`];
    this.preview = data[`description`];
  }

  static parseElement(pointData) {
    return new Adapter(pointData);
  }

  static parseElements(pointsData) {
    return pointsData.map(Adapter.parseElement);
  }

  toRAW() {
    return {
      'id': this.id,
      'type': this.type.value,
      'destination': this.destination,
      'date_from': this.eventTime.from,
      'date_to': this.eventTime.to,
      'base_price': this.cost,
      'is_favorite': this.isFavorite,
      'offers': this.offers
    };
  }
}

export default Adapter;
