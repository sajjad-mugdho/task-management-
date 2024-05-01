"use client";

import React from "react";

import { Button, Layout, Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Header } = Layout;

type MenuItem = {
  key: string;
  label: string;
  path: string;
};

export const items: MenuItem[] = [
  { key: "1", label: "Home", path: "/" },
  { key: "2", label: "About", path: "/about-us" },
  { key: "3", label: "Contact", path: "/contact-us" },
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="mt-5  ">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={140} height={50} />
          </Link>
        </div>
        <Menu
          disabledOverflow
          theme="dark"
          mode="horizontal"
          selectedKeys={[
            items.find((item) => item.path === pathname)?.key || "1",
          ]}
        >
          {items.map((item: any) => (
            <Menu.Item key={item.key}>
              <Link href={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;
