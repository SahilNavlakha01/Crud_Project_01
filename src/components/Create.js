import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Button, notification, Spin, Checkbox } from "antd";
import { Radio } from "antd";
import { DatePicker, Space } from "antd";
import { useDispatch } from "react-redux";

import { InputNumber } from "antd";

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

export default function Create() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [gender, setGender] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [age, setAge] = useState("");

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !isChecked) {
      notification.error({
        message: "Please fill out all fields and check the checkbox.",
      });
      return;
    }

    try {
      setLoader(true);
      await axios.post(
        "https://662618a0052332d5532199ae.mockapi.io/practice_01",
        {
          name: name,
          email: email,
          gender: gender,
          age: age,
          selectedDate: selectedDate,
        }
      );

      notification.success({ message: "Data Created Successfully" });
      navigate("/read");

      
    } catch (error) {
      console.error("Error creating data:", error);
      notification.error({ message: "Failed to create data" });
    } finally {
      setLoader(false);
    }
  };

  const showLoader = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 3000);
  };

  // Get Gender
  const handleRadioChange = (e) => {
    setGender(e.target.value);
  };

  // Get Date
  const handleDateChange = (date, dateString) => {
    if (dateString) {
      const [year, month, day] = dateString.split("-");
      const formattedDate = `${day}-${month}-${year}`; // Reformat the date string to dd-mm-yyyy
      setSelectedDate(formattedDate); // Update the state with the selected date
    } else {
      setSelectedDate(null); // Handle case when dateString is null
    }
  };

  // Checkbox change handler
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  // Get Age
  const handleAgeChange = (value) => {
    console.log("changed", value);
    setAge(value);
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
        <Radio.Group onChange={handleRadioChange} value={gender}>
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
          <Radio value="Other">Other</Radio>
        </Radio.Group>
        <br />
        <br />
        <Space direction="vertical">
          <label htmlFor="">Select Date : </label>
          <DatePicker format="DD-MM-YYYY" onChange={handleDateChange} />
        </Space>
        <br />
        <br />
        <InputNumber
          min={18}
          max={50}
          defaultValue={18}
          onChange={handleAgeChange}
          value={age}
        />
        <br />
        <br />
        <Checkbox required onChange={handleCheckboxChange}>
          Agree?
        </Checkbox>
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
