import React, { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import axios from "axios";

const Dashboard = () => {
  const fetchDetails = async () => {
    const response = await axios
      .get("https://reqres.in/api/users/")
      .catch((err) => {
        console.log("Err", err);
      });
    console.log(response);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  // const [users, setUsers] = React.useState([]);
  // const f = async () => {
  //   const res = await fetch("https://reqres.in/api/users/");
  //   const json = await res.json();
  //   setUsers(json.data);
  //   console.log(json);
  // };

  // useEffect(() => {
  //   f();
  // }, []);

  return (
    <Container>
      <Row>
        {/* <h1>Hello ReqRes users!</h1>
        <Row>
          {users.length &&
            users.map((user) => {
              return (
                <div key={user.id}>
                  <p>
                    <strong>{user.first_name}</strong>
                  </p>
                  <p>{user.email}</p>
                  <img key={user.avatar} src={user.avatar} />
                </div>
              );
            })}
        </Row> */}
      </Row>
    </Container>
  );
};

export default Dashboard;
