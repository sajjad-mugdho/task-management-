import Image from "next/image";
import { Button } from "antd";
import SignIn from "@/components/ui/sign-in/SignIn";

export default function Home() {
  return (
    <div className="flex flex-col  justify-center items-center">
      <h1 className="text-blue-500">Home Page</h1>
      <SignIn />
    </div>
  );
}
