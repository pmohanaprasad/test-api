import React from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import img from "../../image/pagenotfound.jpg";

const PageNotFound = () => {
  const dashboard = useNavigate();

  const redirect = () => {
    dashboard("/");
  };

  return (
    <div className="d-flex flex-column justify-content-center">
      <img
        src={img}
        alt="Img"
        className="align-self-center"
        height={600}
        width={900}
      />
      <div className="d-flex justify-content-center">
        <Button color="primary" onClick={redirect}>
          Reload
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
