import AxiosInstance from "@/config/AxiosInstance";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const token = (await cookies()).get("token_id_user")?.value;

    const response = await AxiosInstance.post(
      "/users/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const res = NextResponse.json(response.data, {
      status: response.status,
    });

    const backendCookie: any = response.headers["set-cookie"];
    if (backendCookie) {
      res.headers.set("set-cookie", backendCookie);
    }

    res.cookies.delete("token_id_user");
    return res;

  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data?.message },
      { status: error.response?.status }
    );
  }
}
