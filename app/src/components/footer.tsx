import LogoMark from "../components/Logo";

function Footer() {
  return (
    <footer className="navbar border-b-0 border-t border-white/10 mt-20 px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/80 text-xs">
      <span
        style={{ fontFamily: "'Syne', sans-serif" }}
        className="flex items-center gap-1 font-bold text-white text-sm"
      >
        <LogoMark size={28} />
        <span>
          Career<span className="text-[#A9CDE3]">Lens</span>
        </span>
      </span>
      <span>©️ {new Date().getFullYear()} CareerLens. All rights reserved.</span>
      <div className="flex gap-5">
        {["Privacy", "Terms", "Contact"].map((i) => (
          <a key={i} href="#" className="hover:text-[#A9CDE3] transition-colors">
            {i}
          </a>
        ))}
      </div>
    </footer>
  );
}

export default Footer;