"use client";
import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {};

const SignUp = (props: Props) => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState<boolean>(false);
  const [loading, setisLoading] = useState<boolean>(false);

  const router = useRouter();

  // To disable submit button at the beginning.

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    const { username, email, password } = values;

    console.log(username, email, password);

    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      toast.success(data.message);

      form.resetFields();

      localStorage.setItem("user", JSON.stringify(data.user));

      router.push(`/dashboard/${data.user.id}`);
    } else {
      console.log("Error");
    }
  };

  return (
    <div className="w-[30%] flex flex-col justify-center ">
      <h1 className="text-blue-500 text-center">Sign Up</h1>
      <div className="">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<InboxOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>
                <span className="text-black dark:text-white">Remember me</span>
              </Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item className="flex justify-center">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Sign Up
            </Button>
          </Form.Item>

          <div className="flex justify-center">
            <p className="text-black dark:text-white">
              Already have an account?{" "}
              <span className="text-blue-500 underline">
                <Link href={"/"}>Sign In</Link>
              </span>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
