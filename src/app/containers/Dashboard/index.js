import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { useNavigate } from "react-router-dom";

import { fetchData, getAllApi } from "../../redux/Api/ApiSlice";

import client from "../../api/index";
import AddData from "../../components/AddData";
import DeleteData from "../../components/DeleteData";
import UpdateData from "../../components/UpdateData";

import "./dashboard.scss";

const Dashboard = () => {
  const pagenotfound = useNavigate();

  const [page, setPage] = useState(2);

  const data = useSelector(getAllApi);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line
  }, []);

  //GET
  const fetchDetails = async () => {
    try {
      const response = await client.get("?page=1");
      dispatch(fetchData(response.data.data));
    } catch (error) {
      pagenotfound("/pagenotfound");
    }
  };

  const initialPage = async () => {
    try {
      let response = await client.get("?page=" + page);
      return response.data.data;
    } catch (error) {
      pagenotfound("/pagenotfound");
    }
  };

  const nextPage = async () => {
    const details = await initialPage();
    dispatch(fetchData([...data, ...details]));
    setPage(page + 1);
  };

  return (
    <Container fluid className="gradient">
      <Row className="justify-content-center">
        <h1 className="title text-center pt-3 pb-2">API</h1>
        <Row className="details m-2 p-4 w-50">
          <AddData />
        </Row>
        <InfiniteScroll
          dataLength={data.length}
          next={nextPage}
          hasMore={true}
          style={{ overflow: "none" }}
        >
          <Row
            xs="2"
            sm="3"
            lg="4"
            className="mt-2 pt-2 p-3 justify-content-center"
          >
            {data.length &&
              data.map((user) => {
                return (
                  <Col
                    key={user.id}
                    className="details d-flex m-3 p-5 align-items-center justify-content-center"
                  >
                    <div>
                      <div className="name">{user.first_name}</div>
                      <div>{user.email}</div>
                      <UpdateData text={user.id} />
                      <DeleteData text={user.id} />
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
