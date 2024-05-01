import React from "react";
import Dashboard from "../../../../components/ui/Dashboard/Dashboard";
import PrivateRoute from "@/providers/PrivateRoute";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params }: Props) => {
  const { id } = params;
  return (
    <div>
      <PrivateRoute>
        <Dashboard params={params} />
      </PrivateRoute>
    </div>
  );
};

export default page;
