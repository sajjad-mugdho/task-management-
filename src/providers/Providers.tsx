"use client";

import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";

type Props = {};

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <AntdRegistry>{children}</AntdRegistry>;
};

export default Providers;
