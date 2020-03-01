import films from "./mocks/films.js";

const initialState = {
  genre: `All genres`,
  filteredList: [...films],
  films,
};

export default initialState;
