import axiosInstance from "../api/axios";

export const login = async (username: string, password: string) => {
  return axiosInstance.post(`/auth/login`, {
    username,
    password,
  });
};


export const logout = async () => {

    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {

        await axiosInstance.post("/auth/logout", {
            refreshToken
        });

    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

export const register = async (
  username: string,
  email: string,
  password: string,
) => {
  return axiosInstance.post(`/auth/register`, {
    username,
    email,
    password,
  });
};
