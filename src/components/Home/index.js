import React from "react";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const Home = () => {
  const history = useHistory();
  const addWeight = () => {
    history.push(ROUTES.LUCY_GROWTH_WEIGHT_ADD);
  };

  const addPicture = () => {
    history.push(ROUTES.LUCY_GROWTH_PICTURES_ADD);
  };

  return (
    <div>
      <h1>Home</h1>
      <section>
        <h2> Lucy Growth </h2>
        <button onClick={addWeight}>Add weight</button>
        <button onClick={addPicture}>Add picture</button>
      </section>
      <section>
        <h2>Training</h2>
        <button>Add training session</button>
      </section>
    </div>
  );
};

export default Home;
