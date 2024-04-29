import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useMemo } from "react";
import { notification } from "antd";
import { Spin } from "antd";
import { Checkbox } from 'antd';
const Context = React.createContext({
  name: "Default",
});

export default function Create() {
  const [spinning, setSpinning] = React.useState(false);
  const showLoader = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 3000);
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [api] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Notification ${placement}`,
      description: (
        <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>
      ),
      placement,
    });
  };
  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoader(true); // Set loader to true to indicate that the operation is in progress
      await axios.post(
        "https://662618a0052332d5532199ae.mockapi.io/practice_01",
        {
          name: name,
          email: email,
        }
      );
      notification.success({ message: "Data Created Successfully" });
      navigate("/read");
    } catch (error) {
      console.error("Error creating data:", error);
      notification.error({ message: "Failed to create data" });
    } finally {
      setLoader(false); // Reset loader to false after the operation completes
    }
  };

  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  
const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);

};
 

  return (
    <>
      <Link to="/read">
        <button className="btn-primary " style={{ margin: "20px" }}>
          ShowData
        </button>
      </Link>
      <form
        style={{ marginLeft: "30px", marginTop: "50px" }}
        method="post"
        required
      >
        <div className="mb-3 w-50">
          <label htmlFor="exampleInputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3 w-50">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            required
            className="form-control"
            aria-describedby="emailHelp"
            id="exampleInputEmail1"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.!
          </div>
        </div>

        {/* <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button> */}
        {/* <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loadings[1]}
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit!
        </Button> */}
        <Checkbox onChange={onChange}>Agree ?</Checkbox>
        <br />
        <br />
        <Button
          onClick={() => {
            handleSubmit();
            showLoader();
           
          }}
          className="btn btn-primary"
        >
          Submit
        </Button>
        <Spin spinning={spinning} fullscreen />
      </form>
    </>
  );
}
