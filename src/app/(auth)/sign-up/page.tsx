import SignUp from "@/components/ui/sign-up/SignUp";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <SignUp />
    </div>
  );
};

export default page;
