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
import { useNavigate } from "react-router-dom";
import { fetchData, getAllApi } from "../../redux/Api/ApiSlice";

import { toast } from "wc-toast";

const DeleteData = (props) => {
  const [open, setOpen] = useState(false);

  const hideModal = () => {
    setOpen(false);
  };

  const pagenotfound = useNavigate();

  const data = useSelector(getAllApi);

  const dispatch = useDispatch();

  const deleteData = async (id) => {
    try {
      await client.delete(`${id}`);
      dispatch(
        fetchData(
          data.filter((user) => {
            return user.id !== id;
          })
        )
      );
      toast.error("User Deleted");
    } catch (error) {
      pagenotfound("/pagenotfound");
    }
  };

  return (
    <>
      <wc-toast position="top-right" />
      <Button
        color="danger"
        className="mt-3 mx-2 w-auto"
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>
      <Modal
        returnFocusAfterClose
        isOpen={open}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader className="text-black justify-content-center">
          CONFIRM DELETE
        </ModalHeader>
        <ModalBody className="text-black">
          <Form onSubmit={(e) => e.preventDefault()}>
            <Row className="formContents">
              <Col className="text-center">Want to Delete the User?</Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            type="submit"
            className="addButton mt-2 w-auto"
            onClick={() => deleteData(props.text)}
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
    </>
  );
};

export default DeleteData;
