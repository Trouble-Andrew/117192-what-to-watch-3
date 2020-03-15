class UserInfoAdapter {
  constructor(data) {
    this.id = data[`id`];
    this.email = data[`email`];
    this.name = data[`name`];
    this.avatar = `https://htmlacademy-react-3.appspot.com/${data[`avatar_url`]}`;
  }

  static parseElement(pointData) {
    return new UserInfoAdapter(pointData);
  }

  static parseElements(pointsData) {
    return pointsData.map(UserInfoAdapter.parseElement);
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

export default UserInfoAdapter;
