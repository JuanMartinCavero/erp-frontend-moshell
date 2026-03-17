import axiosClient from "./axiosClient";

export const loginRequest = async (email, password) => {
  try {
    const response = await axiosClient.post("/login", { email, password });
    return response.data;
  } catch (error) {
    console.log("Error en loginRequest:", error);
    throw error;
  }
};

export const logoutRequest = async () => {
  try {
    const response = await axiosClient.post("/logout");
    return response.data;
  } catch (error) {
    console.log("Error en logoutRequest:", error);
    throw error;
  }
};

export const meRequest = async () => {
  try {
    const response = await axiosClient.get("/me");
    return response.data;
  } catch (error) {
    console.log("Error en meRequest:", error);
    throw error;
  }
};
