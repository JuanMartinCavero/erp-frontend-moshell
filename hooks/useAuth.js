import { loginRequest } from "../services/AuthApi";

export const useAuth = () => {
  const login = async (email, password) => {
    try {
      const data = await loginRequest(email, password);

      // guardar token
      localStorage.setItem("token", data.token);

      // guardar usuario
      localStorage.setItem("user", JSON.stringify(data.user));

      return data;
    } catch (error) {
      console.log("Error en login:", error);
      return null;
    }
  };

  return { login };
};
