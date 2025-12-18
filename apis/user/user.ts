import {
  UserProfile,
  UpdateUserRequest,
  LoginRequest,
  LoginResponse,
  AuthUser,
  Profile,
  UpdatePasswordRequest,
  CreateMemberInfoRequest,
} from "@/apis/user/user.type";
import { API_URL, fetchWithAuth, fetchWithoutAuth } from "@/apis/fetch";

export const login = async (credentials: LoginRequest): Promise<AuthUser> => {
  const loginResponse = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!loginResponse.ok) {
    const error = await loginResponse.json();
    throw new Error(error.detail || "로그인에 실패했습니다");
  }

  const { data: loginData }: LoginResponse = await loginResponse.json();

  const userResponse = await fetch(`${API_URL}/auth/user/me`, {
    method: "GET",
    headers: {
      Authorization: `${loginData.token_type} ${loginData.access_token}`,
    },
  });

  if (!userResponse.ok) {
    throw new Error("사용자 정보를 가져오는데 실패했습니다");
  }

  const { data: userData }: Profile = await userResponse.json();

  return {
    id: userData.user_id.toString(),
    accessToken: loginData.access_token,
    tokenType: loginData.token_type,
    userData: userData,
  };
};

export const getMyProfile = async (): Promise<UserProfile> => {
  return fetchWithAuth<UserProfile>(`/auth/user/me`);
};

export const updateMyProfile = async (
  data: UpdateUserRequest
): Promise<UserProfile> => {
  return fetchWithAuth<UserProfile>(`/users/me`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const updatePassword = async (data: UpdatePasswordRequest) => {
  return fetchWithAuth(`/auth/password`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const getUserList = async () => {
  return fetchWithAuth<UserProfile[]>(`/users`);
};

export const createMemberInfo = async (
  data: CreateMemberInfoRequest
): Promise<UserProfile> => {
  return fetchWithoutAuth<UserProfile>(`/users`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
