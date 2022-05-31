import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import InputField from "../../components/InputField";
import "./dashboard.scss";

//FETCH
const client = axios.create({
  baseURL: "https://reqres.in/api/users",
});

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [updateUsers, setUpdateUsers] = useState([]);
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [hasMore, sethasMore] = useState(true);
  const [page, setPage] = useState(2);

  const [open, setOpen] = useState(false);

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  //GET
  const fetchDetails = async () => {
    try {
      const response = await client.get("?page=1");
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const initialPage = async () => {
    try {
      let response = await client.get("?page=" + page);
      return response.data.data;
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

  //DELETE
  const deleteData = async (id) => {
    console.log(id);
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

  //UPDATE
  const updateData = async (id) => {
    let item = { id, first_name: updateName, email: updateEmail };
    try {
      let response = await client.put("" + id, item);
      setUsers(
        users.map((user) =>
          user.id === updateUsers ? { ...response.data } : user
        )
      );
      setOpen(false);
      setUpdateName("");
      setUpdateEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  const selectData = async (id) => {
    setOpen(true);
    let item = users[id - 1];
    setUpdateName(item.first_name);
    setUpdateEmail(item.email);
    try {
      let response = await client.get(`${id}`);
      setUpdateUsers(response.data.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  //ADD
  const addData = async (name, email) => {
    try {
      let response = await client.post("", {
        first_name: name,
        email: email,
      });
      setUsers([response.data, ...users]);
      setName("");
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  const postSubmit = (e) => {
    e.preventDefault();
    addData(name, email);
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <h1 className="title text-center pt-3 pb-2">API</h1>
        <Row className="details m-2 p-4 w-50">
          <Form onSubmit={postSubmit}>
            <p className="text-center fw-bolder">ADD DATA</p>
            <hr />
            <Row className="formContents">
              <Col sm={3}>
                <p className="formNames">Name</p>
              </Col>
              <Col sm={8}>
                <InputField
                  name="first_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="formFirst"
                  type="text"
                />
              </Col>
            </Row>
            <Row className="formContents">
              <Col sm={3}>
                <p className="formNames">Email</p>
              </Col>
              <Col sm={8}>
                <InputField
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="formFirst"
                  type="text"
                />
              </Col>
            </Row>
            <Button
              color="success"
              type="submit"
              className="addButton mt-2 w-auto"
            >
              Add
            </Button>
          </Form>
        </Row>
        <InfiniteScroll
          dataLength={users.length}
          next={nextPage}
          hasMore={hasMore}
          style={{ overflow: "none" }}
        >
          <Row className="mt-2 pt-2 p-3 justify-content-center">
            {users.length &&
              users.map((user) => {
                return (
                  <Col
                    key={user.id}
                    className="details d-flex m-3 p-5 align-items-center"
                  >
                    <div className="mx-3 px-2">
                      <div className="name">{user.first_name}</div>
                      <div>{user.email}</div>
                      <Button
                        color="primary"
                        className="mt-3 mx-2 w-auto"
                        onClick={() => selectData(user.id)}
                      >
                        Edit
                      </Button>
                      <Modal
                        returnFocusAfterClose
                        isOpen={open}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <ModalHeader className="text-black justify-content-center">
                          UPDATE DATA
                        </ModalHeader>
                        <ModalBody className="text-black">
                          <Form onSubmit={(e) => e.preventDefault()}>
                            <Row className="formContents">
                              <Col sm={3}>
                                <p className="formNames">Name</p>
                              </Col>
                              <Col sm={8}>
                                <InputField
                                  name="first_name"
                                  value={updateName}
                                  onChange={(e) => {
                                    setUpdateName(e.target.value);
                                  }}
                                  placeholder="Name"
                                  className="formFirst"
                                  type="text"
                                />
                              </Col>
                            </Row>
                            <Row className="formContents">
                              <Col sm={3}>
                                <p className="formNames">Email</p>
                              </Col>
                              <Col sm={8}>
                                <InputField
                                  name="email"
                                  value={updateEmail}
                                  onChange={(e) => {
                                    setUpdateEmail(e.target.value);
                                  }}
                                  placeholder="Email"
                                  className="formFirst"
                                  type="text"
                                />
                              </Col>
                            </Row>
                            <Button
                              color="success"
                              type="submit"
                              className="addButton mt-2 w-auto"
                              onClick={() => updateData(updateUsers)}
                            >
                              Update
                            </Button>
                          </Form>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={hideModal}>
                            Close
                          </Button>
                        </ModalFooter>
                      </Modal>

                      <Button
                        color="danger"
                        className="mt-3 mx-2 w-auto"
                        onClick={() => deleteData(user.id)}
                      >
                        Delete
                      </Button>
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
