import { CheckCircle2, Star } from "lucide-react";
import { Features as features } from "../utils";

function Features() {
  return (
    <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="feature-pill inline-flex mb-4  text-white bg-[#f9a60d]">
          <Star size={11} className="text-white" /> Everything you need
        </span>
        <h2
          className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0F2A3A]"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Four tools. One <span className="text-gradient">career leap.</span>
        </h2>
        <p className="text-[#5A4030] mt-4 max-w-xl mx-auto">
          From your resume to the offer letter, we've got every step covered.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map(({ icon: Icon, title, desc, bullets }) => (
          <div
            key={title}
            className="glass-card p-8 flex flex-col gap-5 group hover:border-[#16587B] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0F2A3A] flex items-center justify-center">
              <Icon size={20} className="text-white" />
            </div>
            <div>
              <h3
                className="text-xl font-bold mb-2 text-[#011238]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {title}
              </h3>
              <p className="text-[#5A4030] text-sm leading-relaxed">{desc}</p>
            </div>
            <ul className="flex flex-col gap-2">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2 text-sm text-[#2B1710]"
                >
                  <CheckCircle2
                    size={14}
                    className="text-[#0F2A3A] shrink-0"
                  />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features