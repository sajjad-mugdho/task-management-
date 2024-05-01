"use client";
import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { BsInbox } from "react-icons/bs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {};

const SignIn = (props: Props) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState<boolean>(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    const { email, password } = values;

    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      form.resetFields();
      toast.success(data.message);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push(`/dashboard/${data.user.id}`);
    } else {
      console.log("Error");
      toast.error(data.message);
    }
  };
  return (
    <div className="w-[30%] flex flex-col justify-center ">
      <h1 className="text-blue-500 text-center">Sign In</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<BsInbox className="site-form-item-icon" />}
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
        <Form.Item className="flex justify-between">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>
              <span className="text-black dark:text-white">Remember me</span>
            </Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item className="flex justify-center">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="/sign-up">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
