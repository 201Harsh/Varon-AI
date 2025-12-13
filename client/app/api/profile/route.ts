import AxiosInstance from "@/config/AxiosInstance";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const token = (await cookies()).get("token_id_user")?.value;

    if (!token) {
      return Response.json(
        { error: "Unauthorized Access. Please Login First !" },
        { status: 401 }
      );
    }

    const response = await AxiosInstance.get("/users/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const NextRes = NextResponse.json(response.data, {
      status: response.status,
    });

    return NextRes;
  } catch (error: any) {
    if (error.response) {
      return Response.json(
        { error: error.response.data.error },
        { status: error.response.status }
      );
    }
    return Response.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
