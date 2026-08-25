import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "../../lib/supabase";

type Investment = {
  id: string;
  amount: number;
  daily_rate: number;
  accrued_profit: number;
  start_date: string;
  maturity_date: string;
  status: string;
};

export default function Investments() {
  const navigate = useNavigate();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvestments();
  }, []);

  async function loadInvestments() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    const { data, error } = await supabase
      .from("investments")
      .select(
        "id, amount, daily_rate, accrued_profit, start_date, maturity_date, status"
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setInvestments(data ?? []);
    }

    setLoading(false);
  }

  function money(value: number) {
    return `$${Number(value ?? 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  function date(value: string) {
    return new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black">My Investments</h1>
        <p className="mt-2 text-sm" style={{ color: "#9090a8" }}>
          View and manage your investment positions.
        </p>
      </div>

      {loading ? (
        <p style={{ color: "#9090a8" }}>Loading investments...</p>
      ) : investments.length === 0 ? (
        <div
          className="p-8 border"
          style={{
            background: "#111118",
            borderColor: "rgba(212,160,23,0.15)",
          }}
        >
          <h2 className="text-xl font-bold">No investments yet</h2>
          <p className="mt-3 text-sm" style={{ color: "#9090a8" }}>
            You do not currently have any investments.
          </p>

          <Link
            to="/dashboard/plans"
            className="inline-block mt-6 px-6 py-3 text-sm font-bold"
            style={{
              background: "#d4a017",
              color: "#09090e",
            }}
          >
            View Investment Plans
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {investments.map((investment) => (
            <div
              key={investment.id}
              className="p-6 border"
              style={{
                background: "#111118",
                borderColor: "rgba(212,160,23,0.15)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
                <div>
                  <p className="text-xs" style={{ color: "#9090a8" }}>
                    Amount
                  </p>
                  <p className="text-xl font-bold mt-1">
                    {money(investment.amount)}
                  </p>
                </div>

                <div>
                  <p className="text-xs" style={{ color: "#9090a8" }}>
                    Daily Rate
                  </p>
                  <p className="font-semibold mt-1">
                    {investment.daily_rate}%
                  </p>
                </div>

                <div>
                  <p className="text-xs" style={{ color: "#9090a8" }}>
                    Profit
                  </p>
                  <p className="font-semibold mt-1" style={{ color: "#d4a017" }}>
                    {money(investment.accrued_profit)}
                  </p>
                </div>

                <div>
                  <p className="text-xs" style={{ color: "#9090a8" }}>
                    Maturity
                  </p>
                  <p className="font-semibold mt-1">
                    {date(investment.maturity_date)}
                  </p>
                </div>

                <div>
                  <p className="text-xs" style={{ color: "#9090a8" }}>
                    Status
                  </p>
                  <p className="font-semibold mt-1">
                    {investment.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
