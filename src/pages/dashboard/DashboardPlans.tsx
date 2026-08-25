import { useState } from "react";
import { useNavigate } from "react-router";

const plans = [
  {
    id: "foundation",
    name: "Foundation",
    min: 1000,
    max: 9999,
    rate: 2,
    duration: 30,
  },
  {
    id: "growth",
    name: "Growth",
    min: 10000,
    max: 49999,
    rate: 2,
    duration: 60,
  },
  {
    id: "apex",
    name: "Apex",
    min: 50000,
    max: 249999,
    rate: 2,
    duration: 90,
  },
  {
    id: "sovereign",
    name: "Sovereign",
    min: 250000,
    max: null,
    rate: 2,
    duration: 120,
  },
];

function money(value: number) {
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function DashboardPlans() {
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [amount, setAmount] = useState("");

  function selectPlan(planId: string) {
    setSelectedPlan(planId);

    const plan = plans.find((p) => p.id === planId);

    if (plan) {
      setAmount(String(plan.min));
    }
  }

  function continueInvestment() {
    if (!selectedPlan) {
      return;
    }

    const plan = plans.find((p) => p.id === selectedPlan);

    if (!plan) {
      return;
    }

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount < plan.min) {
      alert(
        `Minimum investment for ${plan.name} is ${money(plan.min)}.`
      );
      return;
    }

    if (plan.max !== null && numericAmount > plan.max) {
      alert(
        `Maximum investment for ${plan.name} is ${money(plan.max)}.`
      );
      return;
    }

    /*
     * Keep the user inside the authenticated dashboard.
     * The actual investment creation will be handled
     * separately using the user's real wallet balance.
     */
    navigate("/dashboard/investments", {
      state: {
        plan,
        amount: numericAmount,
      },
    });
  }

  return (
    <div>
      <div className="mb-10">
        <p
          className="text-xs uppercase tracking-widest font-semibold mb-3"
          style={{ color: "#d4a017" }}
        >
          Available Plans
        </p>

        <h1 className="text-3xl lg:text-4xl font-black">
          Investment Plans
        </h1>

        <p
          className="mt-3 max-w-2xl text-sm"
          style={{ color: "#9090a8" }}
        >
          Choose an available investment plan and select the amount
          you want to invest from your wallet balance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {plans.map((plan) => {
          const selected = selectedPlan === plan.id;

          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => selectPlan(plan.id)}
              className="text-left p-6 border transition-all"
              style={{
                background: selected
                  ? "rgba(212,160,23,0.08)"
                  : "#111118",
                borderColor: selected
                  ? "#d4a017"
                  : "rgba(212,160,23,0.15)",
              }}
            >
              <p
                className="text-xs uppercase tracking-widest"
                style={{ color: "#9090a8" }}
              >
                Investment Plan
              </p>

              <h2
                className="text-2xl font-black mt-2"
                style={{ color: "#d4a017" }}
              >
                {plan.name}
              </h2>

              <div className="mt-6 space-y-4 text-sm">

                <div className="flex justify-between gap-4">
                  <span style={{ color: "#9090a8" }}>
                    Minimum
                  </span>

                  <span className="font-semibold">
                    {money(plan.min)}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span style={{ color: "#9090a8" }}>
                    Maximum
                  </span>

                  <span className="font-semibold">
                    {plan.max === null
                      ? "No limit"
                      : money(plan.max)}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span style={{ color: "#9090a8" }}>
                    Daily rate
                  </span>

                  <span
                    className="font-semibold"
                    style={{ color: "#d4a017" }}
                  >
                    {plan.rate.toFixed(2)}%
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span style={{ color: "#9090a8" }}>
                    Duration
                  </span>

                  <span className="font-semibold">
                    {plan.duration} days
                  </span>
                </div>

              </div>

              <div
                className="mt-7 text-xs font-semibold"
                style={{
                  color: selected ? "#d4a017" : "#777789",
                }}
              >
                {selected
                  ? "Selected ✓"
                  : "Select this plan →"}
              </div>
            </button>
          );
        })}
      </div>

      {selectedPlan && (
        <div
          className="mt-8 p-6 border"
          style={{
            background: "#111118",
            borderColor: "rgba(212,160,23,0.2)",
          }}
        >
          <p
            className="text-xs uppercase tracking-widest"
            style={{ color: "#d4a017" }}
          >
            Selected Plan
          </p>

          <h2 className="text-xl font-bold mt-2">
            {plans.find((p) => p.id === selectedPlan)?.name}
          </h2>

          <label
            className="block text-sm mt-6 mb-2"
            style={{ color: "#9090a8" }}
          >
            Investment amount
          </label>

          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-4 bg-transparent border outline-none"
            style={{
              color: "#f5f0e8",
              borderColor: "rgba(212,160,23,0.3)",
            }}
          />

          <button
            type="button"
            onClick={continueInvestment}
            className="mt-5 px-6 py-4 font-bold"
            style={{
              background: "#d4a017",
              color: "#09090e",
            }}
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}
