import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is CareerLens?",
    answer:
      "CareerLens is an AI-powered career assistant that helps you optimize your resume, analyze ATS compatibility, compare your resume with job descriptions, and receive personalized suggestions to improve your chances of landing interviews.",
  },
  {
    question: "What is an ATS?",
    answer:
      "ATS stands for Applicant Tracking System. It is software used by many employers to scan, filter, and rank resumes before they reach recruiters. Using ATS-friendly formatting and relevant keywords can significantly improve your chances of being shortlisted.",
  },

  {
    question: "How is the ATS score calculated?",
    answer:
      "CareerLens analyzes your resume based on factors such as formatting, keyword relevance, section organization, readability, and other ATS best practices. The score is an estimate designed to help you identify areas for improvement.",
  },
  {
    question: "How does Resume Analysis work?",
    answer:
      "Simply upload your resume, and CareerLens uses AI to evaluate its strengths and weaknesses. You'll receive an ATS score along with detailed recommendations to improve formatting, content, and keyword optimization.",
  },
  {
    question: "How does Job Match work?",
    answer:
      "Paste a job description and upload your resume. CareerLens compares your resume against the job requirements, identifies matching skills, highlights missing keywords, and provides suggestions to improve your match score.",
  },
  {
    question: "Which file formats are supported?",
    answer:
      "Currently, CareerLens supports PDF files for upload and analysis.",
  },
  {
    question: "Can I analyze multiple resumes?",
    answer:
      "Yes. You can upload and analyze multiple resumes to compare versions and improve each one individually.",
  },
  {
    question: "Why is my ATS score low?",
    answer:
      "A low score may result from missing keywords, poor formatting, incomplete sections, lack of measurable achievements, or using designs that are difficult for ATS software to read.",
  },
  {
    question: "How can I improve my resume?",
    answer:
      "Follow the AI recommendations by adding relevant skills, tailoring your resume to the job description, improving formatting, quantifying achievements, and keeping your resume concise and ATS-friendly.",
  },
  {
    question: "Is my resume stored or shared?",
    answer:
      "Your resume is processed securely for analysis. CareerLens does not share your resume with third parties without your permission.",
  },
  {
    question: "Is CareerLens free?",
    answer:
      "CareerLens offers a free plan with essential AI features. Premium plans unlock additional analyses, higher usage limits, advanced resume insights, and enhanced job matching.",
  },
  {
    question: "How do I upgrade my plan?",
    answer:
      "To upgrade your plan, sign in to your CareerLens account and navigate to your Profile page. Click the 'Upgrade Plan' button, select the subscription that best fits your needs, and complete the payment process. Once your payment is successful, your account will be upgraded automatically, giving you immediate access to premium features.",
  },

  {
    question: "Who should use CareerLens?",
    answer:
      "CareerLens is designed for students, fresh graduates, job seekers, professionals looking to switch careers, and anyone who wants to create stronger, ATS-friendly resumes.",
  },
  {
    question: "What types of resume templates are available on CareerLens",
    answer:
      " Mero CV offers 25 professionally designed resume templates across five categories to suit various career needs, Entry-Level: Perfect for students and recent graduates starting their careers. ",
  },
];

const FAQ = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-20 text-[#0F2A3A]">
      <div className="text-center mb-12">
        <span className="feature-pill inline-flex mb-4">
          <HelpCircle size={11} className="text-[#16587B]" /> Help center
        </span>
        <h1
          className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0F2A3A]"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Frequently Asked <span className="text-gradient">Questions</span>
        </h1>
        <p className="mt-4 text-[#3F5B6B] max-w-md mx-auto">
          Find answers to the most common questions about CareerLens.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group rounded-2xl border border-[#E3D9BF] bg-[#FBF8EF] overflow-hidden transition-colors hover:border-[#16587B] open:border-[#16587B] open:bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-base md:text-lg text-[#0F2A3A] [&::-webkit-details-marker]:hidden">
              {faq.question}

              <span className="shrink-0 w-8 h-8 rounded-full bg-[#84B3CE]/40 text-[#0F2A3A] flex items-center justify-center text-xl leading-none transition-transform duration-300 group-open:rotate-45 group-open:bg-[#16587B] group-open:text-white">
                +
              </span>
            </summary>

            <div className="border-t border-[#E3D9BF] px-5 py-4">
              <p className="text-[#3F5B6B] leading-7 text-sm md:text-base">
                {faq.answer.trim()}
              </p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

export default FAQ;