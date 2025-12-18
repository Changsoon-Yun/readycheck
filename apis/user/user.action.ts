"use server";

import {
  createMemberInfo,
  updateMyProfile,
  updatePassword,
} from "@/apis/user/user";
import {
  CreateMemberInfoRequest,
  UpdatePasswordRequest,
  UpdateUserRequest,
} from "@/apis/user/user.type";

export const updateMyProfileAction = async (data: UpdateUserRequest) => {
  try {
    const result = await updateMyProfile(data);

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "프로필 수정 중 오류가 발생했습니다",
    };
  }
};

export const updatePasswordAction = async (data: UpdatePasswordRequest) => {
  try {
    const result = await updatePassword(data);

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "비밀번호 수정 중 오류가 발생했습니다",
    };
  }
};

export const createMemberInfoAction = async (data: CreateMemberInfoRequest) => {
  try {
    const result = await createMemberInfo(data);

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "등록 중 오류가 발생했습니다",
    };
  }
};
