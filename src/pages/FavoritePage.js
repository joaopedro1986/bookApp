import React, { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import Button from '@material-ui/core/Button';


function FavoritePage() {
  let data = useLocation();

  return (
    <div>
      <div>
        <h1>Favorite List</h1>
        {data.state &&
          data.state.map((el) => {
            return <p>{el.title}</p>;
          })}
        <Link to={{ pathname: "/", state: [...data.state] }}>
          <Button className="d-flex justify-content-center">Go Back</Button>
        </Link>
      </div>
    </div>
  );
}

export default FavoritePage;
