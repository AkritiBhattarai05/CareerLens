import { useNavigate } from "react-router-dom";
import { useAppData } from "../context/AppContext";
import { plans } from "../utils";
import { useState } from "react";
import { CheckCircle, Shield } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../main";

// plans order: [0] Free, [1] 1 month, [2] 6 months
const getPlanDuration = (plan: (typeof plans)[0]) =>
  plans.indexOf(plan) === 1 ? 1 : 6;

// Shows the user's current subscription status
function StatusBadge() {
  const { isAuth, user } = useAppData();

  if (!isAuth) return null;

  const isPro =
    user?.subscription &&
    new Date() < new Date(user.subscription);

  const planLabel =
    user?.subscriptionDuration === 6
      ? "Pro 6-Month"
      : user?.subscriptionDuration === 1
      ? "Pro Monthly"
      : "Pro";

    return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border mb-8 ${
        isPro
          ? "bg-[#16587B] border-[#033c5b] text-white"
          : "bg-[#84B3CE]/30 border-[#16587B]/30 text-[#0F2A3A]"
      }`}
    >
      <span className="w-2 h-2 rounded-full bg-[#eab044]" />

      {isPro
        ? `${planLabel} active • expires ${new Date(
            user!.subscription!
          ).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}`
        : "You're on the Free Plan • 3 requests included"}
    </div>
  );
}


// Handles the subscription button and eSewa checkout
function PlanCTA({
  plan,
  highlight,
}: {
  plan: (typeof plans)[0];
  highlight: boolean;
}) {
  const { isAuth, user } = useAppData();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const isPro =
    isAuth &&
    user?.subscription &&
    new Date() < new Date(user.subscription);

  // status text color depends on the card background
  const statusText = highlight ? "text-white/80" : "text-[#4A4A63]";

  // All hooks are declared before conditional returns
  if (isAuth) {
    if (plan.name === "Free") {
      return (
        <p className={`mt-auto text-center text-xs py-3 ${statusText}`}>
          {isPro ? "Your previous plan" : "✔️ Currently active"}
        </p>
      );
    }

    if (isPro) {
      // Only the plan the user actually bought gets "Already subscribed"
      const isCurrentPlan =
        user?.subscriptionDuration === getPlanDuration(plan);

      return (
        <p className={`mt-auto text-center text-xs font-medium py-3 ${statusText}`}>
          {isCurrentPlan
            ? "✔️ Already subscribed"
            : "Included in your Pro plan"}
        </p>
      );
    }
  }

  // eSewa payment initialization
  const handleSubscribe = async () => {
    // Redirect unauthenticated users to login
    if (!isAuth) {
      navigate("/login");
      return;
    }

    const token = localStorage.getItem("token");

    const duration = getPlanDuration(plan);

    try {
      setLoading(true);

      // Send checkout request to backend
      const { data } = await axios.post(
        `${server}/api/payment/checkout`,
        { duration },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Create a hidden form to redirect the user to eSewa
      const form = document.createElement("form");

      form.method = "POST";
      form.action = data.formUrl;

      // Add all eSewa payment fields
      Object.entries(data.fields).forEach(([key, value]) => {
        const input = document.createElement("input");

        input.type = "hidden";
        input.name = key;
        input.value = String(value);

        form.appendChild(input);
      });

      // Submit the form and redirect to eSewa
      document.body.appendChild(form);

      form.submit();
    } catch (error: any) {
      setLoading(false);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
  <button
  className={`mt-auto text-center text-sm font-semibold py-3 rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
    highlight
      ? "bg-[#eab044] text-[#0F2A3A] hover:bg-[#f2bd5b]"
      : "border border-[#16587B] text-[#16587B] hover:bg-[#16587B] hover:text-white"
  }`}
  onClick={handleSubscribe}
  disabled={loading}
>
  {loading ? "Redirecting to eSewa..." : plan.cta}
</button>
  );
}

// Main Pricing Component
const Pricing = () => {
  return (
    <section
      id="pricing"
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16">
        <span className="feature-pill inline-flex mb-4  text-white bg-[#f9a60d]">
          <Shield
            size={11}
            className="text-white"
          />{" "}
          Simple pricing
        </span>

        <h2
          className="text-3xl md:text-5xl font-extrabold tracking-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Start free. Upgrade{" "}
          <span className="text-gradient">
            when ready.
          </span>
        </h2>

        <p className="text-[#5A4030] mt-4 max-w-md mx-auto">
          Your first 3 requests are completely free - no card needed.
        </p>

        <div className="flex justify-center mt-6">
          <StatusBadge />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-center">
        {plans.map((plan) => (
          <div
            key={plan.name}
        className={`p-8 flex flex-col gap-6 relative rounded-2xl border transition-all duration-300 ${
  plan.highlight
    ? "bg-[#16587B] border-[#16587B] text-white shadow-xl scale-[1.02]"
    : "bg-white border-[#DAD6CC] text-[#0B0B1E] hover:border-[#14198F]"
}`}
          >
            {plan.badge && (
              <span
                className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                  plan.highlight
                    ? "bg-[#f9a60d] text-[#0B0B1E]"
                    : "bg-[#16587B] text-white"
                }`}
              >
                {plan.badge}
              </span>
            )}

            <div>
              <p
                className={`text-xs uppercase tracking-widest mb-1 ${
                  plan.highlight ? "text-white/70" : "text-[#4A4A63]"
                }`}
              >
                {plan.name}
              </p>

              <div className="flex items-end gap-1">
                <span
  className={`text-4xl font-black ${
    plan.highlight ? "text-white" : "text-[#16587B]"
  }`}
  style={{ fontFamily: "'Syne', sans-serif" }}
>
  {plan.price}
</span>
                {plan.period && (
                  <span
                    className={`text-sm mb-1 ${
                      plan.highlight ? "text-white/70" : "text-[#4A4A63]"
                    }`}
                  >
                    {plan.period}
                  </span>
                )}
              </div>

              <p
                className={`text-sm mt-1 ${
                  plan.highlight ? "text-white/80" : "text-[#4A4A63]"
                }`}
              >
                {plan.desc}
              </p>
            </div>

            <div
              className={`w-full border-t ${
                plan.highlight ? "border-white/20" : "border-[#DAD6CC]"
              }`}
            ></div>

            <ul className="flex flex-col gap-3">
              {plan.features.map((item) => (
                <li
                  key={item}
                  className={`flex items-start gap-2 text-sm ${
                    plan.highlight ? "text-white" : "text-[#0B0B1E]"
                  }`}
                >
                  <CheckCircle
                    size={14}
                    className={`shrink-0 mt-0.5 ${
                      plan.highlight ? "text-[#f6aa07]" : "text-[#16587B]"
                    }`}
                  />
                  {item}
                </li>
              ))}
            </ul>

            <PlanCTA
              plan={plan}
              highlight={plan.highlight}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;