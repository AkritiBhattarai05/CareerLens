import { useRef, useState } from "react";
import type { Job } from "../types";
import { toBase64 } from "../utils";
import axios from "axios";
import { server } from "../main";
import {
  AlertCircle,
  Briefcase,
  ChevronRight,
  FileText,
  Loader2,
  Plus,
  Upload,
  X,
} from "lucide-react";

interface Result {
  jobs: Job[];
  summary: string;
}

// Readable match colors on a light background
const matchText = (score: number) =>
  score >= 75
    ? "text-emerald-700"
    : score >= 50
    ? "text-amber-700"
    : "text-red-700";

const matchBorder = (score: number) =>
  score >= 75
    ? "border-emerald-300"
    : score >= 50
    ? "border-amber-300"
    : "border-red-300";

const JobMatcherPage = () => {
  const [mode, setMode] = useState<"manual" | "resume">("manual");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setskill] = useState("");
  const [experience, setExp] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function addSkill() {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) setSkills((p) => [...p, s]);
    setskill("");
  }

  function handleFileChange(f: File) {
    if (f.type !== "application/pdf")
      return setError("Please upload a pdf file.");
    if (f.size > 5 * 1024 * 1024)
      return setError("File size should be less than 5MB.");

    setError("");
    setFile(f);
  }

  async function handleSubmit() {
    setError("");
    setResult(null);

    if (mode === "manual" && (!skills.length || !experience.trim())) {
      return setError("Please add at least one skill and your experience.");
    }
    if (mode === "resume" && !file) {
      return setError("Please upload your resume pdf.");
    }

    setLoading(true);
    try {
      let payload: any = { mode };
      if (mode === "manual") {
        payload = { ...payload, skills, experience };
      } else {
        payload = { ...payload, pdfBase64: await toBase64(file!) };
      }

      const { data } = await axios.post(
        `${server}/api/ai/job-matcher`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setResult(data);
    } catch (error: any) {
      setError(
        error?.response?.data?.message || "Failed to fetch job matches."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-page min-h-screen pt-20 px-4 md:px-8 pb-12">
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {/* Mode switch */}
        <div className="glass-card p-1.5 flex gap-1.5">
          {(["manual", "resume"] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setResult(null);
                setError("");
              }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 capitalize ${
                mode === m
                  ? "btn-primary"
                  : "text-[#3F5B6B] hover:text-[#0F2A3A]"
              }`}
            >
              {m === "manual" ? "Enter Skills Manually" : "Upload Resume"}
            </button>
          ))}
        </div>

        {/* Manual mode */}
        {mode === "manual" && (
          <div className="glass-card p-6 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#3F5B6B] uppercase tracking-widest font-semibold">
                Your Skills
              </label>
              <div className="flex gap-2">
                <input
                  value={skillInput}
                  onChange={(e) => setskill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  placeholder="e.g. React, Python, SQL..."
                  className="flex-1 bg-white border border-[#E3D9BF] rounded-xl px-4 py-2.5 text-sm text-[#0F2A3A] placeholder:text-[#3F5B6B]/60 outline-none focus:border-[#16587B] transition-colors"
                />
                <button
                  onClick={addSkill}
                  className="btn-primary px-4 py-2.5 rounded-xl text-sm flex items-center gap-1.5"
                >
                  <Plus size={14} /> Add
                </button>
              </div>
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {skills.map((s) => (
                    <span className="feature-pill gap-2" key={s}>
                      {s}{" "}
                      <button
                        aria-label={`Remove ${s}`}
                        onClick={() => {
                          setSkills((p) => p.filter((x) => x !== s));
                        }}
                      >
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#3F5B6B] uppercase tracking-widest font-semibold">
                Experience & Background
              </label>
              <textarea
                value={experience}
                onChange={(e) => setExp(e.target.value)}
                rows={4}
                placeholder="e.g. 2 years of frontend development, worked on e-commerce projects, familiar with agile teams..."
                className="w-full bg-white border border-[#E3D9BF] rounded-xl px-4 py-2.5 text-sm text-[#0F2A3A] placeholder:text-[#3F5B6B]/60 outline-none focus:border-[#16587B] transition-colors"
              />
            </div>
          </div>
        )}

        {/* Resume upload mode */}
        {mode === "resume" && (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files[0];
              if (f) handleFileChange(f);
            }}
            onClick={() => fileRef.current?.click()}
            className="glass-card border-dashed border-[#16587B]/40 flex flex-col items-center justify-center gap-3 py-10 cursor-pointer hover:border-[#16587B] hover:bg-white transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#84B3CE]/40 border border-dashed border-[#16587B]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
              {file ? (
                <FileText size={22} className="text-[#0F2A3A]" />
              ) : (
                <Upload size={32} className="text-[#0F2A3A]" />
              )}
            </div>
            <div className="text-center">
              <p className="font-semibold text-[#0F2A3A]">
                {file ? file.name : "Drop your resume here"}
              </p>
              <p className="text-[#3F5B6B] text-sm mt-0.5">
                or click to browse • PDF only • max 5MB
              </p>
            </div>
            <input
              type="file"
              ref={fileRef}
              accept=".pdf"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFileChange(f);
                e.target.value = "";
              }}
            />
          </div>
        )}

        {error && (
          <p className="text-red-700 text-sm flex items-center gap-1.5">
            <AlertCircle size={14} /> {error}
          </p>
        )}

        {!loading && (
          <button
            onClick={handleSubmit}
            className="btn-primary py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Briefcase size={16} /> Find Matching Jobs
          </button>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 size={36} className="text-[#16587B] animate-spin" />
            <p className="text-[#3F5B6B] text-sm">
              Finding your best job matches...
            </p>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="flex flex-col gap-4">
            <div className="glass-card p-5">
              <p className="text-xs text-[#3F5B6B] uppercase tracking-widest font-semibold mb-2">
                Summary
              </p>
              <p className="text-sm text-[#0F2A3A] leading-relaxed">
                {result.summary}
              </p>
            </div>

            {result.jobs.map((job, i) => (
              <div
                key={i}
                className={`glass-card p-6 flex flex-col gap-4 border ${matchBorder(
                  job.matchScore
                )}`}
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h3 className="font-bold text-[#0F2A3A]">{job.title}</h3>
                    <p className="text-[#3F5B6B] text-sm mt-0.5">
                      {job.company} • {job.location} • {job.type}
                    </p>
                  </div>

                  <span
                    className={`text-2xl font-black shrink-0 ${matchText(
                      job.matchScore
                    )}`}
                  >
                    {job.matchScore}%
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {job.skills.map((s) => (
                    <span key={s} className="feature-pill">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="divider-subtle" />

                <div className="flex flex-col gap-2">
                  <p className="text-xs text-[#3F5B6B] uppercase tracking-widest font-semibold">
                    Why you match
                  </p>
                  <p className="text-sm text-[#0F2A3A] leading-relaxed">
                    {job.whyMatch}
                  </p>
                </div>

                <div className="flex items-start gap-2 text-sm text-[#0F2A3A] bg-[#84B3CE]/25 rounded-xl p-3">
                  <ChevronRight
                    size={14}
                    className="text-[#16587B] shrink-0 mt-0.5"
                  />
                  {job.applyTip}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMatcherPage;