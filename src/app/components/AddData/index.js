import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button } from "reactstrap";

import { useNavigate } from "react-router-dom";
import client from "../../api";
import { fetchData, getAllApi } from "../../redux/Api/ApiSlice";
import InputField from "../InputField";

const AddData = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const pagenotfound = useNavigate();

  const data = useSelector(getAllApi);

  const dispatch = useDispatch();

  //ADD
  const addData = async (name, email) => {
    try {
      let response = await client.post("", {
        first_name: name,
        email: email,
      });
      dispatch(fetchData([response.data, ...data]));
      setName("");
      setEmail("");
    } catch (error) {
      pagenotfound("/pagenotfound");
    }
  };

  const postSubmit = (e) => {
    e.preventDefault();
    addData(name, email);
  };

  return (
    <div>
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
        <Button color="success" type="submit" className="addButton mt-2 w-auto">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddData;
