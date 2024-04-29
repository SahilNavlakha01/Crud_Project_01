import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Create from "./Create";
import { Button, message, Popconfirm } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import { DeleteTwoTone } from "@ant-design/icons";
import { Spin } from "antd";

import { SmileFilled, SmileOutlined } from "@ant-design/icons";
import { Typography } from "antd";
const { Paragraph, Text } = Typography;

export default function Read() {
  const [spinning, setSpinning] = React.useState(false);
  const showLoader = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 1000);
  };
  const [data, setData] = useState([]);
  const [mode, setMode] = useState("");

  function getdata() {
    axios
      .get("https://662618a0052332d5532199ae.mockapi.io/practice_01")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function storeData(id, name, email) {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  }

  const confirm = (id) => {
    axios
      .delete(`https://662618a0052332d5532199ae.mockapi.io/practice_01/${id}`)
      .then(() => {
        getdata();
        message.success("Data Was Deleted Successfully");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        message.error("Failed to delete data.");
      });
  };

  const cancel = () => {
    message.error("Data Was Not Deleted.");
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <Link to="/">
        <button className="btn btn-primary" style={{ float: "right" }}>
          Create
        </button>
      </Link>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          onClick={() => {
            setMode((prevMode) =>
              prevMode === "table-dark" ? "" : "table-dark"
            );
          }}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          Dark & Light Mode
        </label>
      </div>
      <h2 style={{ marginTop: "50px" }}>Read Operation:</h2>
      <table className={`table table-striped ${mode}`}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <Paragraph copyable style={{ fontSize: "1rem" }}>
                  {item.email}
                </Paragraph>
              </td>
              <td>
                <Link to="/update">
                  <EditTwoTone
                    style={{ fontSize: "1.5rem" }}
                    className="btn"
                    onClick={() => storeData(item.id, item.name, item.email)}
                  />
                </Link>
              </td>
              <td>
                <Popconfirm
                  title="Delete the Data"
                  description="Are You Sure You Want To Delete This Data?"
                  onConfirm={() => {
                    confirm(item.id);
                    showLoader();
                  }}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteTwoTone
                    style={{ marginRight: "15px", fontSize: "1.5rem" }}
                    className="btn"
                  />
                </Popconfirm>
                <Spin spinning={spinning} fullscreen />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
