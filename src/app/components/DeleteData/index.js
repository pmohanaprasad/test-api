import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import client from "../../api";
import { useNavigate } from "react-router-dom";
import { fetchData, getAllApi } from "../../redux/Api/ApiSlice";

import { toast } from "wc-toast";

const DeleteData = (props) => {
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
        onClick={() => deleteData(props.text)}
      >
        Delete
      </Button>
    </>
  );
};

export default DeleteData;
