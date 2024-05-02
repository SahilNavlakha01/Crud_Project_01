import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { Spin } from "antd";
import { notification } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { setName, setEmail } from "./app/Reducers/Slice";

const Context = React.createContext({
  name: "Default",
});

export default function Update() {
  const dispatch = useDispatch();
  const { name: storedName, email: storedEmail } = useSelector(
    (state) => state.update
  );
  const [name, setName] = useState(storedName);
  const [email, setEmail] = useState(storedEmail);

  const [spinning, setSpinning] = React.useState(false);
  const showLoader = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 2000);
  };

  const [id, setId] = useState("");
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");

  const history = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
  }, []);

  useEffect(() => {
    console.log("Fetching data for id:", id); // Debug statement

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://662618a0052332d5532199ae.mockapi.io/practice_01/${id}`
        );
        const data = response.data;
        console.log("Fetched data:", data); // Debug statement
        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    showLoader();

    try {
      await axios.put(
        `https://662618a0052332d5532199ae.mockapi.io/practice_01/${id}`,
        { name: name, email: email }
      );

      // dispatch(setName(name));
      // dispatch(setEmail(email));

      notification.success({ message: "Update Successful" });
      history("/read");
    } catch (error) {
      console.error("Error updating data:", error);
      notification.error({ message: "Update Failed" });
    }
  };

  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  return (
    <Context.Provider value={contextValue}>
      <Link to="/">
        <button
          className="btn-primary"
          style={{ marginLeft: "20px", marginTop: "20px" }}
        >
          Create
        </button>
      </Link>

      <form style={{ marginLeft: "30px", marginTop: "50px" }}>
        <div className="mb-3 w-50">
          <label htmlFor="exampleInputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3 w-50">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleUpdate}>
          Update
        </button>
        <Spin spinning={spinning} fullscreen />

        <Link to="/read">
          <button className="btn btn-primary" style={{ marginLeft: "20px" }}>
            Back
          </button>
        </Link>
      </form>
    </Context.Provider>
  );
}
