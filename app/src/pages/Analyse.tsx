import { useRef, useState } from "react";
import type { Analysis } from "../types";
import { downloadReport, toBase64 } from "../utils";
import axios from "axios";
import { server } from "../main";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Download,
  Loader2,
  Upload,
} from "lucide-react";
import { ScoreRing } from "../ring";

// Readable score colors on a light background
const scoreText = (score: number) =>
  score >= 75
    ? "text-emerald-700"
    : score >= 50
    ? "text-amber-700"
    : "text-red-700";

const scoreBarColor = (score: number) =>
  score >= 75 ? "bg-emerald-600" : score >= 50 ? "bg-amber-500" : "bg-red-600";

// Suggestion card colors by priority (falls back to the "low" style)
const prioCard: Record<string, string> = {
  high: "bg-red-50 border-red-200",
  medium: "bg-amber-50 border-amber-200",
  low: "bg-sky-50 border-sky-200",
};

const prioLabel: Record<string, string> = {
  high: "text-red-700",
  medium: "text-amber-700",
  low: "text-sky-700",
};

const AnalysePage = () => {
  const [result, setResult] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);

  //pdf chaahi matra lincha and size under 5mb
  async function handleFile(file: File) {
    if (file.type !== "application/pdf")
      return setError("Please upload a pdf file.");
    if (file.size > 5 * 1024 * 1024)
      return setError("File size should be less than 5MB.");

    setError("");
    setLoading(true);
    setResult(null);
    try {
      const pdfBase64 = await toBase64(file);//json api cant directly transmit binary file so converted to base64
      const { data } = await axios.post(
        `${server}/api/ai/analyse`,
        { pdfBase64 },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setResult(data);
    } catch (error: any) {
      setError(
        error?.response?.data?.message || "Analysis Failed. Please try again"
      );
    } finally {
      setLoading(false);
    }
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };
  return (
    <div className="bg-page min-h-screen pt-20 px-4 md:px-8 pb-12">
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {/* Upload box */}
        <div
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
          className="glass-card border-dashed border-[#16587B]/40 flex flex-col items-center justify-center gap-3 py-10 cursor-pointer hover:border-[#16587B] hover:bg-white transition-all duration-300 group"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#84B3CE]/40 border border-dashed border-[#16587B]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Upload size={32} className="text-[#0F2A3A]" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-[#0F2A3A]">
              {result ? "Analyse another resume" : "Drop your resume here"}
            </p>
            <p className="text-[#3F5B6B] text-sm mt-0.5">
              or click to browse • PDF only • max 5MB
            </p>
          </div>
          {error && (
            <p className="text-red-700 text-sm flex items-center gap-1.5">
              <AlertCircle size={14} /> {error}
            </p>
          )}
        </div>

        <input
          type="file"
          ref={fileRef}
          accept=".pdf"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }}
        />

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 size={36} className="text-[#16587B] animate-spin" />
            <p className="text-[#3F5B6B] text-sm">Analysing your resume...</p>
          </div>
        )}

        {result && !loading && (
          <>
            {/* Overall score */}
            <div className="glass-card p-6 flex items-center gap-6 flex-wrap">
              <div className="relative flex items-center justify-center">
                <ScoreRing score={result.atsScore} />
                <div className="absolute flex flex-col items-center">
                  <span
                    className={`text-2xl font-black ${scoreText(
                      result.atsScore
                    )}`}
                  >
                    {result.atsScore}
                  </span>
                  <span className="text-[10px] text-[#3F5B6B]">ATS</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold mb-1 text-[#0F2A3A]">
                  Overall Score
                </p>
                <p className="text-[#3F5B6B] text-sm leading-relaxed">
                  {result.summary}
                </p>
              </div>
            </div>

            {/* Score breakdown */}
            <div className="glass-card p-6 flex flex-col gap-4">
              <p className="text-xs text-[#3F5B6B] uppercase tracking-widest font-semibold">
                Score Breakdown
              </p>
              {Object.entries(result.scoreBreakdown).map(([key, val]) => (
                <div className="flex flex-col gap-1.5" key={key}>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#0F2A3A] capitalize">{key}</span>
                    <span className={`font-semibold ${scoreText(val.score)}`}>
                      {val.score}
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#E3D9BF] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${scoreBarColor(
                        val.score
                      )} rounded-full transition-all duration-700`}
                      style={{ width: `${val.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-[#3F5B6B]">{val.feedback}</p>
                </div>
              ))}
            </div>

            {/* Strengths */}
            <div className="glass-card p-6 flex flex-col gap-3">
              <p className="text-xs text-[#3F5B6B] uppercase tracking-widest font-semibold">
                Strengths
              </p>
              {result.strengths.map((s, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-sm text-[#0F2A3A]"
                >
                  <CheckCircle2
                    size={14}
                    className="text-[#16587B] shrink-0 mt-0.5"
                  />{" "}
                  {s}
                </div>
              ))}
            </div>

            {/* Suggestions */}
            <div className="glass-card p-6 flex flex-col gap-4">
              <p className="text-xs text-[#3F5B6B] uppercase tracking-widest font-semibold">
                Suggestions
              </p>
              {result.suggestions.map((s, i) => {
                const p = String(s.priority).toLowerCase();
                return (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border flex flex-col gap-2 ${
                      prioCard[p] || prioCard.low
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-[#0F2A3A]">
                        {s.category}
                      </span>
                      <span
                        className={`text-[11px] font-bold uppercase tracking-widest ${
                          prioLabel[p] || prioLabel.low
                        }`}
                      >
                        {s.priority}
                      </span>
                    </div>
                    <p className="text-sm text-[#3F5B6B]">{s.issue}</p>
                    <div className="flex items-start gap-2 text-sm text-[#0F2A3A]">
                      <ChevronRight
                        size={14}
                        className="shrink-0 mt-0.5 text-[#16587B]"
                      />
                      {s.recommendation}
                    </div>
                  </div>
                );
              })}

              <button
                onClick={() => downloadReport(result)}
                className="btn-primary flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold"
              >
                <Download size={16} /> Download Report
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnalysePage;