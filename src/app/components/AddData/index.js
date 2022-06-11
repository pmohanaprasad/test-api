import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { useNavigate } from "react-router-dom";
import client from "../../api";
import { fetchData, getAllApi } from "../../redux/Api/ApiSlice";
import InputField from "../InputField";

import { toast } from "wc-toast";

const AddData = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const pagenotfound = useNavigate();

  const data = useSelector(getAllApi);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const hideModal = () => {
    setOpen(false);
  };

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
      toast.success("User Added");
    } catch (error) {
      pagenotfound("/pagenotfound");
    }
  };

  const postSubmit = () => {
    addData(name, email);
    setOpen(false);
  };

  return (
    <div>
      <wc-toast position="top-right" />
      <Form onSubmit={(e) => e.preventDefault()}>
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
          onClick={() => setOpen(true)}
          className="addButton mt-2 w-auto"
        >
          Add
        </Button>
        <Modal
          returnFocusAfterClose
          isOpen={open}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <ModalHeader className="text-black justify-content-center">
            CONFIRM ADD
          </ModalHeader>
          <ModalBody className="text-black">
            <Form onSubmit={(e) => e.preventDefault()}>
              <Row className="formContents">
                <Col className="text-center">Want to Add the User?</Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              type="submit"
              className="addButton mt-2 w-auto"
              onClick={postSubmit}
            >
              Yes
            </Button>
            <Button
              color="danger"
              type="submit"
              className="addButton mt-2 w-auto"
              onClick={hideModal}
            >
              No
            </Button>
          </ModalFooter>
        </Modal>
      </Form>
    </div>
  );
};

export default AddData;
