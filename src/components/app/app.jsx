import React from "react";
import Main from "../main/main.jsx";


const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {movieData} = props;

  return (
    <Main movieData={movieData} />
  );
};


export default App;
