import api from "../../../api/axios";
import { API_ENDPOINTS } from "../../../constants/api";

import type {
  LoginFormData,
  RegisterFormData,
} from "../validation/auth.schema";

import type { AuthResponse } from "../types/auth.types";

export const register = async (
  data: RegisterFormData
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    API_ENDPOINTS.AUTH.REGISTER,
    data
  );

  return response.data;
};

export const login = async (
  data: LoginFormData
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    API_ENDPOINTS.AUTH.LOGIN,
    data
  );

  return response.data;
};