import { useState } from "react"
import { useAppData } from "../context/AppContext"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuth, user } = useAppData();

  return (
    <nav className="navbar fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-4">
      <Link to={'/'} className="flex place-items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#F5EEDD] flex justify-center items-center shadow-lg text-2xl">
          📚
        </div>
        <span
          className="font-bold text-lg tracking-tight text-white"
          style={{ fontFamily: " 'Syne', sans-serif" }}
        >
          Career
          <span className="text-[#A9CDE3]">Lens</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm text-white/85">
        <Link to={"/analyse"} className="hover:text-[#A9CDE3] transition-colors">
          Analyse
        </Link>

        <Link to={"/jobmatcher"} className="hover:text-[#A9CDE3] transition-colors">
          JobMatcher
        </Link>

        <Link to={"/resumebuilder"} className="hover:text-[#A9CDE3] transition-colors">
          ResumeBuilder
        </Link>

        <Link to={"/interviewprep"} className="hover:text-[#A9CDE3] transition-colors">
          InterviewPrep
        </Link>

        <Link to={"/faq"} className="hover:text-[#A9CDE3] transition-colors">
          FAQ
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-3">
        {isAuth ? (
          <Link to={'/account'} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/main.png" alt="" className="w-9 h-9 rounded-full object-cover ring-2 ring-[#F5EEDD]" />
            <span className="text-sm text-white">{user?.name?.split(' ')[0]}</span>
          </Link>
        ) : (
          <>
            <Link to={'/login'} className="text-sm text-white/85 hover:text-white transition-colors px-4 py-2">
              Sign in
            </Link>

            <Link
              to={"/login"}
              className="text-sm font-semibold px-5 py-2 rounded-lg bg-[#F5EEDD] text-[#16587B] hover:bg-white transition-colors"
            >
              Get Started Free
            </Link>
          </>
        )}
      </div>

      {/* mobile view */}
      <button
        className="md:hidden text-white/85 hover:text-white"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="absolute top-full inset-x-0 bg-[#0F4260] border-b border-white/10 flex flex-col gap-4 px-6 py-6 md:hidden text-white">
          <Link to={"/analyse"} className="hover:text-[#A9CDE3] transition-colors">
            Analyse
          </Link>
          <Link to={"/jobmatcher"} className="hover:text-[#A9CDE3] transition-colors">
            JobMatcher
          </Link>
          <Link to={"/resumebuilder"} className="hover:text-[#A9CDE3] transition-colors">
            ResumeBuilder
          </Link>
          <Link to={"/interviewprep"} className="hover:text-[#A9CDE3] transition-colors">
            InterviewPrep
          </Link>
          <Link to={"/faq"} className="hover:text-[#A9CDE3] transition-colors">
            FAQ
          </Link>

          {isAuth ? (
            <Link
              to={"/account"}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img
                src="/user.png"
                alt=""
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#F5EEDD]"
              />
              <span className="text-sm text-white">
                {user?.name?.split(" ")[0]}
              </span>
            </Link>
          ) : (
            <>
              <Link
                to={"/login"}
                className="text-sm text-white/85 hover:text-white transition-colors px-4 py-2"
              >
                Sign in
              </Link>
              <Link
                to={"/login"}
                className="text-sm font-semibold px-5 py-2 rounded-lg bg-[#F5EEDD] text-[#16587B] text-center"
              >
                Get Started Free
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar