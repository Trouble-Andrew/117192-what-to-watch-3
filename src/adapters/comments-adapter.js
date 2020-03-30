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
}

export default CommentsAdapter;
