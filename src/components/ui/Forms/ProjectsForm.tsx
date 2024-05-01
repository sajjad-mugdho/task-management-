"use client";

import React from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
} from "antd";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

type Props = { params: { id: string } };

const ProjectsForm = ({ params }: Props) => {
  const router = useRouter();

  const { id } = params;
  const onFinish = async (values: any) => {
    const { title, description, team, deadline } = values;
    const data = {
      title,
      description,
      team,
      deadline,
      id,
    };

    try {
      const response = await fetch("/api/projects/create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      if (response.status === 200) {
        toast.success("Project Created successfully");

        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="mx-auto my-10">
      <Form
        {...formItemLayout}
        variant="filled"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input! Title" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Descriotion"
          name="description"
          rules={[{ required: true, message: "Please input! Description" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Select Team" name="team">
          <Select />
        </Form.Item>

        <Form.Item
          label="Project Deadline"
          name="deadline"
          rules={[{ required: true, message: "Please input! Deadline" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProjectsForm;
