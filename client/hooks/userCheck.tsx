"use client";
import { useEffect, useState } from "react";
import AxiosProxyInstance from "@/config/AxiosProxyInstance";
import VaronPreLoader from "@/utils/VaronAIPreLoader";
import { useRouter } from "next/navigation";

const UserCheckAuth = ({ children }: any) => {
  const [isLoading, setisLoading] = useState(true);
  const router = useRouter();
  const FetchUserInfo = async () => {
    setisLoading(true);
    try {
      const res = await AxiosProxyInstance.get("/api/profile");

      if (res.status === 200) {
        console.log(res.data);
      }
    } catch (error) {
        console.log(error)
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    FetchUserInfo();
  }, [router]);

  if (isLoading) {
    return (
      <>
        <VaronPreLoader onLoadingComplete={FetchUserInfo} />
      </>
    );
  }

  return <>{children}</>;
};

export default UserCheckAuth;
