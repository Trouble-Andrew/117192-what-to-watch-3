
class CommentsAdapter {
  constructor(data) {
    this.author = data[`user`].name;
    this.id = data[`user`].id;
    this.text = data[`comment`];
    this.date = data[`date`];
    this.rating = data[`rating`];
  }

  static parseElement(pointData) {
    return new CommentsAdapter(pointData);
  }

  static parseElements(pointsData) {
    return pointsData.map(CommentsAdapter.parseElement);
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

export default CommentsAdapter;
