import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import "./dashboard.scss";

const client = axios.create({
  baseURL: "https://reqres.in/api/users",
});

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setPage] = useState(2);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await client.get("?page=1");
      console.log(response.data.data);
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const initialPage = async () => {
    try {
      let response = await client.get("?page=" + page);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const nextPage = async () => {
    const details = await initialPage();
    setUsers([...users, ...details]);
    if (details.length === 0 || details.length < 6) {
      sethasMore(false);
    }
    setPage(page + 1);
  };

  const deleteData = async (id) => {
    try {
      await client.delete(`${id}`);
      setUsers(
        users.filter((user) => {
          return user.id !== id;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

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
                      alt="user"
                    />
                    <div className="mx-3 px-2">
                      <div>{user.id}</div>
                      <div className="name">{user.first_name}</div>
                      <div>{user.email}</div>
                      <div className="button">
                        <div
                          className="delete-btn"
                          onClick={() => deleteData(user.id)}
                        >
                          Delete
                        </div>
                      </div>
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
