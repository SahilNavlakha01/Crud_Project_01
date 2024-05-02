import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, message, Popconfirm } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import { DeleteTwoTone } from "@ant-design/icons";
import { Spin } from "antd";
import { Typography } from "antd";
import { useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useSelector, useDispatch } from "react-redux";

const { Paragraph, Text } = Typography;

const UserList = ["U", "Lucy", "Tom", "Edward"];
const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
const GapList = [4, 3, 2, 1];

export default function Read() {

  const dispatch = useDispatch();
  const { id, name, email } = useSelector((state) => state.update);


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
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function storeData(id, name, email, gender, age, selectedDate) {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("gender", gender);
    localStorage.setItem("age", age);
    localStorage.setItem("selectedDate", selectedDate);
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

  // User Icon

  const [user, setUser] = useState(UserList[0]);
  const [color, setColor] = useState(ColorList[0]);
  const [gap, setGap] = useState(GapList[0]);
  const changeUser = () => {
    const index = UserList.indexOf(user);
    setUser(index < UserList.length - 1 ? UserList[index + 1] : UserList[0]);
    setColor(
      index < ColorList.length - 1 ? ColorList[index + 1] : ColorList[0]
    );
  };
  const changeGap = () => {
    const index = GapList.indexOf(gap);
    setGap(index < GapList.length - 1 ? GapList[index + 1] : GapList[0]);
  };

  // Filter Table
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      width: "1%",
      ...getColumnSearchProps("id"),
      sorter: (a, b) => a.id.length - b.id.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "3%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "3%",
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ["descend", "ascend"],
      render: (_, item) => <Paragraph copyable>{item.email}</Paragraph>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: "3%",
      ...getColumnSearchProps("gender"),
      sorter: (a, b) => a.gender.length - b.gender.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "3%",
      ...getColumnSearchProps("age"),
      sorter: (a, b) => a.age.length - b.age.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Date",
      dataIndex: "selectedDate",
      key: "selectedDate",
      width: "3%",
      ...getColumnSearchProps("selectedDate"),
      sorter: (a, b) => a.selectedDate.length - b.selectedDate.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Edit",
      width: "1%",
      render: (_, item) => (
        <Link to="/update">
          <EditTwoTone
            style={{ fontSize: "1.5rem" }}
            className="btn"
            onClick={() =>
              storeData(
                item.id,
                item.name,
                item.email,
                item.gender,
                item.selectedDate,
                item.age
              )
            }
          />
        </Link>
      ),
    },

    {
      title: "Delete",
      width: "1%",
      render: (_, item) => (
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
          <Spin spinning={spinning} fullscreen />
        </Popconfirm>
      ),
    },
  ];

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
      <Table columns={columns} dataSource={data}></Table>
    </>
  );
}
