import films from "./mocks/films.js";

const initialState = {
  genre: `All genres`,
  activeMovie: {},
  filteredList: [...films],
  films,
};

export default initialState;
