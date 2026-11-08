import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAppData } from "../context/AppContext";
import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { features } from "../utils";
import LogoMark from "../components/Logo";


const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setIsAuth } = useAppData();

  const handleGoogleLogin = async (authResult: any) => {
    setLoading(true);
    try {
      const result = await axios.post(`${server}/api/user/login`, {
        code: authResult["code"],
      });

      localStorage.setItem("token", result.data.token);
      toast.success(result.data.message);
      setLoading(false);
      setUser(result.data.user);
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Problem while login");
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: handleGoogleLogin,
    flow: "auth-code",
  });
  return (
    <div className="bg-page flex items-center justify-center p-4">
      {/* Background circles (colors come from .orb in index.css) */}
      <div className="orb w-72 h-72 md:w-96 md:h-96 -top-24 -left-24" />
      <div className="orb w-56 h-56 md:w-72 md:h-72 -bottom-20 -right-20" />

      <div
        className="glass-card relative z-10 w-full max-w-md p-10 flex flex-col items-center gap-8
        transition-all duration-300 hover:-translate-y-1"
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <LogoMark size={56} variant="light" />
          <h1
            className="text-2xl font-bold tracking-tight text-[#0F2A3A]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Career<span className="text-[#16587B]">Lens</span>
          </h1>
          <p className="text-[#3F5B6B] text-sm leading-relaxed">
            Your AI-powered career co-pilot - build, analyse, and land your next
            role.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {features.map(({ icon: Icon, label }) => (
            <span key={label} className="feature-pill">
              <Icon size={11} className="text-[#16587B]" />
              {label}
            </span>
          ))}
        </div>

        <div className="divider-subtle"></div>

        <div className="w-full flex flex-col gap-2">
          <p className="text-center text-xs text-[#3F5B6B] uppercase tracking-widest font-semibold">
            Continue with
          </p>

          <button
            className="btn-google"
            onClick={googleLogin}
            disabled={loading}
          >
            {loading ? (
              <p className="text-[#3F5B6B] animate-pulse">Please Wait...</p>
            ) : (
              <>
                <img src="/google.svg" alt="" className="w-4 h-4" /> Sign in
                with Google
              </>
            )}
          </button>
        </div>

        <div className="text-[11px] text-[#3F5B6B] text-center leading-relaxed">
          By signing in you agree to our{" "}
          <a
            href="#"
            className="underline underline-offset-2 text-[#16587B] hover:text-[#0F4260] transition-colors"
          >
            Terms
          </a>{" "}
          {"&"}{" "}
          <a
            href="#"
            className="underline underline-offset-2 text-[#16587B] hover:text-[#0F4260] transition-colors"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login