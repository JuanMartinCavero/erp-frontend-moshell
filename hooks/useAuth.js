import { loginRequest, logoutRequest, meRequest} from "../services/authApi";

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

  const logout = async () => {
    try {
      await logoutRequest();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      console.log("Error en logout:", error);
    }
  };

  const me = async () => {
    try {
      const data = await meRequest();
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log("Error obteniendo usuario:", error);
      return null;
    }
  };
  return { login, logout, me };
};
