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
import ProjectsForm from "../Forms/ProjectsForm";
import { BsPlus } from "react-icons/bs";
import ProjectCard from "../Card/ProjectCard";
import Columns from "@/components/Columns";
import { useTaskStore } from "@/lib/store";

const { Search } = Input;

const { Header, Sider, Content } = Layout;

type Props = {
  params: {
    id: string;
  };
};

const TaskDashboard = (props: Props) => {
  const addTask = useTaskStore((state) => state.addTask);

  const [collapsed, setCollapsed] = useState(false);

  const [modal2Open, setModal2Open] = useState(false);

  const [projectsData, setProjectsData] = useState([]);

  console.log(projectsData);

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
    const fetchProjects = async () => {
      const response = await fetch("/api/projects/create", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Fetched data:", data); // Add this line to see what data you're receiving
      setProjectsData(data.projects);
    };

    fetchProjects();
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
    {
      key: "3",
      icon: <UploadOutlined />,
      label: "",
    },
  ];
  const url =
    "https://images.unsplash.com/photo-1636622433525-127afdf3662d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const { title, description } = Object.fromEntries(formData);

    if (typeof title !== "string" || typeof description !== "string") return;

    addTask(title, description);
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

            <div className="text-white text-center">User Name</div>
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

            <Menu.Item key="4" icon={<LogoutOutlined />}>
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
                <div>
                  <form
                    id="todo-form"
                    className="flex flex-col gap-3"
                    onSubmit={handleSubmit}
                  >
                    <input
                      id="title"
                      name="title"
                      placeholder="Todo title..."
                    />
                    <input
                      id="description"
                      name="description"
                      placeholder="Description..."
                    />

                    <button type="submit" form="todo-form">
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
