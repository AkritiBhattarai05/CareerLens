import { ArrowRight, ChevronRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";

import { useAppData } from "../context/AppContext";

function Hero(){
    const {isAuth} = useAppData()
    return (  <section className="relative pt-36 pb-28 px-6 flex flex-col items-center text-center overflow-hidden">
  <div
        className="orb w-150 h-150 bg-indigo-600 -top-40 left-1/2 -translate-x-1/2"
        style={{ opacity: 0.12 }}
      />
 <div
        className="orb w-80 h-80 bg-emerald-500 bottom-0 right-10"
        style={{ opacity: 0.1 }}
      />
  <div className="inline-flex items-center gap-2 feature-pill  bg-[#eab044] border-[#0F2A3A]/40 mb-6 animate-fade-in">
  <Zap size={11} className="text-white" />
  <span className="  text-white">AI-Powered Career Platform</span>
</div>
 
 <h1
  className="text-4xl md:text-6xl lg:text-7xl font-extrabold
  leading-[1.08] tracking-tight max-w-4xl mb-6 animate-slide-up"
  style={{ fontFamily: "'Syne', sans-serif" }}
>
  <span className=" text-[#13100e]">Land Your Dream Job</span>
  <br />
  <span className="text-[ #0F2A3A]">Faster with AI</span>
</h1>

 <p
  className="text-[#5A4030] text-base md:text-lg max-w-xl leading-relaxed mb-10 animate-slide-up"
  style={{ animationDelay: "0.1s" }}
>
  Analyse your resume, get an ATS score, discover the right jobs, build a
  stunning resume, and ace every interview - all in one place.
</p>
    

<div
        className="flex flex-col sm:flex-row items-center gap-3 animate-slide-up"
        style={{ animationDelay: "0.2s" }}
      >
        <Link
          to={isAuth ? "/jobmatcher" : "/login"}
          className="btn-primary px-7 py-3.5 rounded-xl text-base font-semibold"
        >
          {isAuth ? (
            <p className="flex items-center gap-2">
              Find Best Job <ArrowRight size={16} />
            </p>
          ) : (
            <p className="flex items-center gap-2">
              Start for free <ArrowRight size={16} />
            </p>
          )}
        </Link>
        <a
          href="#features"
          className="text-sm text-blue-950 hover:text-red-900 transition-colors flex items-center gap-1.5"
        >
          See how it works <ChevronRight size={14} />
        </a>
      </div>


 <p className="text-black/35 text-xs mt-6">
        First 3 analyses free • No credit card required
      </p>

      <div
  className="mt-16 glass-card px-8 py-6 flex items-center gap-8 animate-slide-up relative"
  style={{ animationDelay: "0.3s" }}
>
  {/* Circular ATS Score */}
  <div className="relative flex items-center justify-center ">
    {(() => {
      const score = 87;
      const radius = 60;
      const stroke = 8;
      const normalizedRadius = radius - stroke * 2;
      const circumference = normalizedRadius * 2 * Math.PI;
      const strokeDashoffset =
        circumference - (score / 100) * circumference;

      return (
        <>
          <svg height={radius * 2} width={radius * 2}>
            {/* background ring */}
            <circle
              stroke="rgba(255,255,255,0.1)"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />

            {/* progress ring */}
            <circle
             stroke="#f2bd5b"
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${circumference} ${circumference}`}
              style={{ strokeDashoffset }}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>

          {/* center text */}
          <div className="absolute flex flex-col items-center justify-center">
            <span
              className="text-3xl font-black text-[#f9a60d]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {score}
            </span>
            <span className="text-[10px] text-[#f9a60d] tracking-widest uppercase">
              ATS Score
            </span>
          </div>
        </>
      );
    })()}
  </div>

  {/* Divider */}
  <div className="h-16 w-px bg-red-950" />

  {/* Insights */}
  <div className="flex flex-col gap-2 text-left">
    <span className="text-xs font-medium text-[#5A4030]">
      ✔ Strong keywords detected
    </span>
    <span className="text-xs font-medium text-[#5A4030]">
      📈 Interview prep
    </span>
    <span className="text-xs font-medium text-[#5A4030]">
      3 job matches found
    </span>
  </div>
</div>
</section>
    );
}


export default Hero