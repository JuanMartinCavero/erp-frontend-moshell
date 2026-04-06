// src/pages/Login.jsx
import {
  Lock,
  User,
  Eye,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Cpu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import logo from "../../src/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await login(email, password);
    if (userData) {
      navigate("/dashboard");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4 font-['Inter',sans-serif]">
      <div className="relative w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-slate-900/50 rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
        {/* Left Panel - Branding */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-primary/10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-primary mb-12">
              {/* Logo container sin fondo */}
              <div className="p-2 rounded-lg flex items-center justify-center">
                <img
                  src={logo}
                  alt="Moshell Logo"
                  className="w-20 h-20 object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold tracking-tight dark:text-white">
                Moshell Manufacturing
              </h2>
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-tight mb-6 dark:text-white">
              Optimiza tu producción <br />
              <span className="text-primary">textil con precisión</span>
            </h1>
          </div>

          <div className="relative z-10 flex items-center gap-4">
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-sm">
              Gestione inventarios, órdenes de producción y logística en una
              sola plataforma integrada.
            </p>
          </div>

          {/* Background Pattern */}
          <div
            className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1701964621103-96fc0dd08d5c?w=800&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="flex flex-col justify-center p-8 md:p-16">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2 dark:text-white">
              Bienvenido
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Inicie sesión en su cuenta de Moshell
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                Correo electrónico
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-slate-800 border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl transition-all outline-none text-slate-900 dark:text-white"
                  placeholder="ejemplo@textil.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Contraseña
                </label>
                <a
                  href="#"
                  className="text-xs text-primary hover:underline font-semibold"
                >
                  ¿Olvidó su contraseña?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-slate-100 dark:bg-slate-800 border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl transition-all outline-none text-slate-900 dark:text-white"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                >
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 px-1">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 dark:border-slate-700 bg-transparent text-primary focus:ring-primary"
              />
              <label
                htmlFor="remember"
                className="text-sm text-slate-500 dark:text-slate-400"
              >
                Recordar mi sesión
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Ingresar
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              ¿No tiene una cuenta?
              <a
                href="#"
                className="text-primary font-bold hover:underline ml-1"
              >
                Contacte a soporte
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;