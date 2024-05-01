"use client";

import React, { use, useEffect, useState } from "react";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  LogoutOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import { Avatar, Input, Space } from "antd";
import { Button, Layout, Menu, theme, Modal } from "antd";

import { AudioOutlined } from "@ant-design/icons";

import type { SearchProps } from "antd/es/input/Search";

import { BsPlus } from "react-icons/bs";

import Columns from "@/components/Columns";
import { useTaskStore } from "@/lib/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const { Search } = Input;

const { Header, Sider, Content } = Layout;

type Props = {
  params: {
    id: string;
  };
};

const TaskDashboard = ({ params }: Props) => {
  const { id } = params;
  const router = useRouter();

  const addTask = useTaskStore((state) => state.addTask);

  const [collapsed, setCollapsed] = useState(false);

  const [modal2Open, setModal2Open] = useState(false);

  const [tasksData, setTasksData] = useState([]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1677ff",
      }}
    />
  );

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`/api/task/create/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.status === 200) {
          setTasksData(data.tasks);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, []);

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Projects",
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "Teams",
    },
  ];
  const url =
    "https://images.unsplash.com/photo-1636622433525-127afdf3662d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const { title, description } = Object.fromEntries(formData);

    if (typeof title !== "string" || typeof description !== "string") return;

    addTask(title, description);

    const data = {
      title,
      description,
      id: params.id,
    };

    try {
      const response = await fetch("/api/task/create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      if (response.status === 200) {
        console.log("Task Created successfully");

        toast.success("Task Created successfully");

        form.reset();
        setModal2Open(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong");
    }
  };

  const user = localStorage.getItem("user");

  const userObj = JSON.parse(user as string);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("user");

      // Redirect to login page

      router.push("/");
    } catch (error) {}
  };
  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="flex flex-col items-center justify-center my-5">
            <Space align="center" direction="vertical" size={16}>
              <Space wrap size={16}>
                <Avatar size={60} icon={<UserOutlined />} src={url} />
              </Space>
            </Space>

            <div className="text-white text-base my-2 text-center">
              {userObj?.username}
            </div>
          </div>
          <Menu
            style={{
              marginTop: "20px",
            }}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
          >
            {items.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            ))}

            <Menu.Item onClick={handleLogout} key="4" icon={<LogoutOutlined />}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "100vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className="flex flex-col md:flex-row lg:flex-row gap-3 items-center justify-between ">
              <h3 className="text-2xl text-blue-500 font-bold">Tasks</h3>

              <Space direction="vertical">
                <Search
                  placeholder="input search text"
                  onSearch={onSearch}
                  style={{ width: 200 }}
                />
              </Space>

              <Button
                style={{
                  backgroundColor: "#5cdbd3",
                  color: "#254000",
                  borderColor: "#5cdbd3",
                  display: "flex",
                  alignItems: "center",
                }}
                type="default"
                onClick={() => setModal2Open(true)}
              >
                <BsPlus className="mx-1" /> Add Task
              </Button>
            </div>

            <>
              <Modal
                title="Add New Project"
                centered
                open={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
              >
                <div className="flex flex-col justify-center items-center my-5">
                  <form
                    id="todo-form"
                    className="flex flex-col gap-3 w-[70%]"
                    onSubmit={handleSubmit}
                  >
                    <label className="text-lg " htmlFor="title">
                      <span className="text-red-500">*</span> Title
                    </label>
                    <input
                      id="title"
                      name="title"
                      placeholder="Todo title..."
                      className="border border-gray-200 bg-slate-200 p-4 rounded-lg"
                      required
                    />
                    <label className="text-lg " htmlFor="title">
                      <span className="text-red-500">*</span> Description
                    </label>
                    <input
                      id="description"
                      name="description"
                      placeholder="Description..."
                      className="border border-gray-200 bg-slate-200 p-4 rounded-lg"
                      required
                    />

                    <button
                      className="p-3 m-5 border-none bg-blue-500 text-white rounded-xl"
                      type="submit"
                      form="todo-form"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </Modal>
            </>

            <div className=" overflow-auto">
              <Columns />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default TaskDashboard;
