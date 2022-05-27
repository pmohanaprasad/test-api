import React, { useEffect, useState, useSelector, useDispatch } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import InfiniteScroll from "react-infinite-scroll-component";

import { FETCH_DETAILS } from "./action";

import "./dashboard.scss";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setPage] = useState(2);

  // const details = useSelector((state) => state);
  // const dispatch = useDispatch();

  const fetchDetails = async () => {
    const response = await fetch("https://reqres.in/api/users?page=1");
    const json = await response.json();

    setUsers(json.data);
    return json.data;
    // dispatch(FETCH_DETAILS(json.data));
  };

  const initialPage = async () => {
    const response = await fetch("https://reqres.in/api/users?page=" + page);
    const json = await response.json();
    return json.data;
  };

  const nextPage = async () => {
    const details = await initialPage();
    setUsers([...users, ...details]);
    if (details.length === 0 || details.length < 6) {
      sethasMore(false);
    }
    setPage(page + 1);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <h1 className="title text-center mt-5 pt-5">API</h1>
        <Button className="addButton mt-5">ADD</Button>
        <InfiniteScroll
          dataLength={users.length}
          next={nextPage}
          hasMore={hasMore}
        >
          <Row className="mt-5 pt-5 p-3 justify-content-center">
            {users.length &&
              users.map((user) => {
                return (
                  <Col
                    key={user.id}
                    className="details d-flex m-3 p-5 align-items-center"
                  >
                    <img
                      key={user.avatar}
                      src={user.avatar}
                      className="userPic"
                    />
                    <div className="mx-3 px-2">
                      <div>{user.id}</div>
                      <div className="name">{user.first_name}</div>
                      <div>{user.email}</div>
                    </div>
                  </Col>
                );
              })}
          </Row>
        </InfiniteScroll>
      </Row>
    </Container>
  );
};

export default Dashboard;
