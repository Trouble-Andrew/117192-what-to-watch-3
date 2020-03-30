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
}

export default UserInfoAdapter;
