import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../lib/supabase";

type Plan = {
  id: string;
  name: string;
  description: string | null;
  minimum_amount: number;
  maximum_amount: number | null;
  daily_rate: number;
  duration_days: number;
};

export default function DashboardPlans() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState<number>(0);

  const [loading, setLoading] = useState(true);
  const [investing, setInvesting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadPage();
  }, []);

  async function loadPage() {
    setLoading(true);
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login", { replace: true });
        return;
      }

      const [{ data: planData, error: planError }, { data: walletData, error: walletError }] =
        await Promise.all([
          supabase
            .from("investment_plans")
            .select(
              "id, name, description, minimum_amount, maximum_amount, daily_rate, duration_days"
            )
            .eq("status", "ACTIVE")
            .order("minimum_amount", { ascending: true }),

          supabase
            .from("wallets")
            .select("available_balance")
            .eq("user_id", user.id)
            .single(),
        ]);

      if (planError) throw planError;
      if (walletError) throw walletError;

      setPlans(planData ?? []);
      setBalance(Number(walletData?.available_balance ?? 0));
    } catch (err) {
      console.error(err);
      setError("Unable to load investment plans.");
    } finally {
      setLoading(false);
    }
  }

  function money(value: number) {
    return `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  function selectPlan(plan: Plan) {
    setSelectedPlan(plan);
    setAmount(String(plan.minimum_amount));
    setError("");
    setSuccess("");
  }

  async function invest() {
    if (!selectedPlan) return;

    setError("");
    setSuccess("");

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      setError("Please enter a valid investment amount.");
      return;
    }

    if (numericAmount < selectedPlan.minimum_amount) {
      setError(
        `Minimum investment is ${money(selectedPlan.minimum_amount)}.`
      );
      return;
    }

    if (
      selectedPlan.maximum_amount !== null &&
      numericAmount > selectedPlan.maximum_amount
    ) {
      setError(
        `Maximum investment is ${money(selectedPlan.maximum_amount)}.`
      );
      return;
    }

    if (numericAmount > balance) {
      setError(
        `Insufficient balance. Your available balance is ${money(balance)}.`
      );
      return;
    }

    setInvesting(true);

    try {
      const { data, error } = await supabase.rpc(
        "create_investment",
        {
          p_plan_id: selectedPlan.id,
          p_amount: numericAmount,
        }
      );

      if (error) {
        console.error(error);
        setError("Unable to create investment. Please try again.");
        return;
      }

      if (!data?.success) {
        setError(data?.message ?? "Investment could not be created.");
        return;
      }

      setSuccess("Investment created successfully.");

      setTimeout(() => {
        navigate("/dashboard/investments");
      }, 700);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while creating your investment.");
    } finally {
      setInvesting(false);
    }
  }

  if (loading) {
    return (
      <div>
        <p style={{ color: "#9090a8" }}>
          Loading investment plans...
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10">
        <p
          className="text-xs uppercase tracking-widest font-semibold mb-3"
          style={{ color: "#d4a017" }}
        >
          Investment Plans
        </p>

        <h1 className="text-3xl lg:text-4xl font-black">
          Choose an investment plan
        </h1>

        <p
          className="mt-3 max-w-2xl text-sm"
          style={{ color: "#9090a8" }}
        >
          Select a plan and invest directly from your available wallet
          balance.
        </p>
      </div>

      {/* BALANCE */}

      <div
        className="mb-8 p-5 border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{
          background: "#111118",
          borderColor: "rgba(212,160,23,0.2)",
        }}
      >
        <div>
          <p className="text-xs" style={{ color: "#9090a8" }}>
            Available Wallet Balance
          </p>

          <p className="text-2xl font-black mt-1">
            {money(balance)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/dashboard/deposit")}
          className="px-5 py-3 text-sm font-bold"
          style={{
            background: "#d4a017",
            color: "#09090e",
          }}
        >
          Fund Wallet
        </button>
      </div>

      {error && (
        <div
          className="mb-6 p-4 border"
          style={{
            background: "rgba(180,40,40,0.08)",
            borderColor: "rgba(220,80,80,0.3)",
            color: "#ff8a8a",
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className="mb-6 p-4 border"
          style={{
            background: "rgba(40,160,90,0.08)",
            borderColor: "rgba(40,160,90,0.3)",
            color: "#7ee2a8",
          }}
        >
          {success}
        </div>
      )}

      {/* PLANS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {plans.map((plan) => {
          const selected = selectedPlan?.id === plan.id;

          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => selectPlan(plan)}
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
                Plan
              </p>

              <h2
                className="text-2xl font-black mt-2"
                style={{ color: "#d4a017" }}
              >
                {plan.name}
              </h2>

              {plan.description && (
                <p
                  className="text-sm mt-3"
                  style={{ color: "#9090a8" }}
                >
                  {plan.description}
                </p>
              )}

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: "#9090a8" }}>
                    Minimum
                  </span>
                  <span>{money(plan.minimum_amount)}</span>
                </div>

                <div className="flex justify-between">
                  <span style={{ color: "#9090a8" }}>
                    Maximum
                  </span>
                  <span>
                    {plan.maximum_amount === null
                      ? "No limit"
                      : money(plan.maximum_amount)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span style={{ color: "#9090a8" }}>
                    Daily rate
                  </span>
                  <span style={{ color: "#d4a017" }}>
                    {Number(plan.daily_rate).toFixed(2)}%
                  </span>
                </div>

                <div className="flex justify-between">
                  <span style={{ color: "#9090a8" }}>
                    Duration
                  </span>
                  <span>{plan.duration_days} days</span>
                </div>
              </div>

              <div
                className="mt-6 text-xs font-semibold"
                style={{
                  color: selected ? "#d4a017" : "#777789",
                }}
              >
                {selected ? "Selected ✓" : "Select plan →"}
              </div>
            </button>
          );
        })}
      </div>

      {/* INVESTMENT FORM */}

      {selectedPlan && (
        <div
          className="mt-8 p-6 border"
          style={{
            background: "#111118",
            borderColor: "rgba(212,160,23,0.2)",
          }}
        >
          <h2 className="text-xl font-bold">
            Invest in {selectedPlan.name}
          </h2>

          <p
            className="mt-2 text-sm"
            style={{ color: "#9090a8" }}
          >
            Available balance: {money(balance)}
          </p>

          <div className="mt-5">
            <label
              className="text-sm font-semibold"
              htmlFor="investment-amount"
            >
              Investment amount
            </label>

            <input
              id="investment-amount"
              type="number"
              min={selectedPlan.minimum_amount}
              max={selectedPlan.maximum_amount ?? undefined}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-2 px-4 py-4 bg-transparent border outline-none"
              style={{
                color: "#f5f0e8",
                borderColor: "rgba(212,160,23,0.3)",
              }}
            />
          </div>

          <button
            type="button"
            onClick={invest}
            disabled={investing}
            className="mt-5 px-6 py-4 font-bold disabled:opacity-50"
            style={{
              background: "#d4a017",
              color: "#09090e",
            }}
          >
            {investing
              ? "Creating Investment..."
              : "Invest Now →"}
          </button>
        </div>
      )}
    </div>
  );
}