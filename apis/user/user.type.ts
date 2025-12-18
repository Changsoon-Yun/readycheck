export type Role = "ADMIN" | "MEMBER";
export type UserStatus = "SHIFTIN" | "SHIFTOUT" | "LATE" | "OVERTIME" | "";

export interface Company {
  gov_id: number;
  gov_name: string;
  role: Role;
  rank: string;
}

export interface UserProfile {
  user_id: number;
  user_email: string;
  username: string;
  rank: string;
  manager: boolean;
  gov_id: number;
  role: Role;
  phone_number: string;
  house: string | null;
  status: UserStatus;
  joined_at: string;
  vacation_days: number;
  is_activate: boolean;
}

export interface UpdateUserRequest {
  username: string;
  phone_number: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    access_token: string;
    token_type: string;
  };
}

export interface Profile {
  data: {
    user_id: number;
    user_email: string;
    username: string;
    phone_number: string | null;
    rank: string;
    manager: true;
    gov_id: number;
    role: Role;
    house: string | null;
    status: UserStatus;
    joined_at: string;
    is_activate: boolean;
    vacation_days: number;
  };
}

export interface AuthUser {
  id: string;
  accessToken: string;
  tokenType: string;
  userData: Profile["data"];
}

export interface UpdatePasswordRequest {
  current_password: string;
  new_password: string;
}

export interface CreateMemberInfoRequest {
  user_email: string;
  passwords: string;
  username: string;
  phone_number: string;
}
