import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import client from "../../api";
import { fetchData, getAllApi } from "../../redux/Api/ApiSlice";
import InputField from "../InputField";

import { toast } from "wc-toast";

const UpdateData = (props) => {
  const data = useSelector(getAllApi);

  const dispatch = useDispatch();

  const [updateUsers, setUpdateUsers] = useState([]);
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [open, setOpen] = useState(false);

  const hideModal = () => {
    setOpen(false);
  };

  const updateData = async (id) => {
    let item = { id, first_name: updateName, email: updateEmail };
    try {
      let response = await client.put("" + id, item);
      dispatch(
        fetchData(
          data.map((user) =>
            user.id === updateUsers ? { ...response.data } : user
          )
        )
      );
      setOpen(false);
      setUpdateName("");
      setUpdateEmail("");
      // toast.info("User Updated");
      toast("User Updated", {
        icon: { type: "custom", content: "⬆️" },
        theme: {
          type: "custom",
          style: { background: "white", color: "black" },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const selectData = async (id) => {
    setOpen(true);
    try {
      let response = await client.get(`${id}`);
      setUpdateUsers(response.data.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <wc-toast position="top-right" />
      <Button
        color="primary"
        className="mt-3 mx-2 w-auto"
        onClick={() => selectData(props.text)}
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
    </>
  );
};

export default UpdateData;
