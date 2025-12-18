import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    throw new Error("인증 토큰이 없습니다");
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `${session.tokenType} ${session.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({
      message: "알 수 없는 오류가 발생했습니다",
    }));

    throw new Error(JSON.stringify(error.detail) || `API Error: ${res.status}`);
  }

  const { data } = await res.json();

  return data;
}

export async function fetchWithoutAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({
      message: "알 수 없는 오류가 발생했습니다",
    }));

    throw new Error(JSON.stringify(error.detail) || `API Error: ${res.status}`);
  }

  const { data } = await res.json();

  return data;
}
