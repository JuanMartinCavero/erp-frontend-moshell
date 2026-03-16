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
