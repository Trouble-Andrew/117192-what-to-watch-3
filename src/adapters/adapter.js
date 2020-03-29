import {convertMinsToHrsMins} from "../utils.js";

class Adapter {
  constructor(data) {
    this.id = data[`id`];
    this.isFavorite = data[`is_favorite`];
    this.title = data[`name`];
    this.date = data[`released`].toString();
    this.genres = data[`genre`].split();
    this.previewPoster = data[`preview_image`];
    this.poster = data[`poster_image`];
    this.posterBig = data[`background_image`];
    this.backgroundColor = data[`background_color`];
    this.video = data[`video_link`];
    this.previewVideo = data[`preview_video_link`];
    this.rating = data[`rating`];
    this.time = convertMinsToHrsMins(data[`run_time`]);
    this.ratingCount = data[`scores_count`];
    this.directors = data[`director`].split();
    this.stars = data[`starring`];
    this.preview = data[`description`];
  }

  static parseElement(pointData) {
    return new Adapter(pointData);
  }

  static parseElements(pointsData) {
    return pointsData.map(Adapter.parseElement);
  }
}

export default Adapter;
