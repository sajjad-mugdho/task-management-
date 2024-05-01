import React from "react";
import Dashboard from "../../../../components/ui/Dashboard/Dashboard";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params }: Props) => {
  const { id } = params;
  return <div><Dashboard/></div>;
};

export default page;
