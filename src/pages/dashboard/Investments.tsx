import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "../../lib/supabase";

type Investment = {
  id: string;
  principal: number;
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
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login", { replace: true });
        return;
      }

      const { data, error } = await supabase
        .from("investments")
        .select(
          "id, principal, daily_rate, accrued_profit, start_date, maturity_date, status"
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading investments:", error);
        setInvestments([]);
        return;
      }

      setInvestments(data ?? []);
    } catch (error) {
      console.error("Unexpected investment loading error:", error);
      setInvestments([]);
    } finally {
      setLoading(false);
    }
  }

  function money(value: number | null | undefined) {
    return `$${Number(value ?? 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  function formatDate(value: string) {
    if (!value) return "—";

    const parsed = new Date(value);

    if (Number.isNaN(parsed.getTime())) {
      return "—";
    }

    return parsed.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function getStatusLabel(status: string) {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
        return "Active";

      case "COMPLETED":
        return "Completed";

      case "MATURED":
        return "Matured";

      case "CANCELLED":
        return "Cancelled";

      case "PENDING":
        return "Pending";

      default:
        return status || "Unknown";
    }
  }

  function getStatusStyle(status: string) {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
        return {
          background: "rgba(34, 197, 94, 0.12)",
          color: "#4ade80",
          border: "1px solid rgba(34, 197, 94, 0.25)",
        };

      case "COMPLETED":
      case "MATURED":
        return {
          background: "rgba(59, 130, 246, 0.12)",
          color: "#60a5fa",
          border: "1px solid rgba(59, 130, 246, 0.25)",
        };

      case "CANCELLED":
        return {
          background: "rgba(239, 68, 68, 0.12)",
          color: "#f87171",
          border: "1px solid rgba(239, 68, 68, 0.25)",
        };

      case "PENDING":
        return {
          background: "rgba(234, 179, 8, 0.12)",
          color: "#facc15",
          border: "1px solid rgba(234, 179, 8, 0.25)",
        };

      default:
        return {
          background: "rgba(148, 163, 184, 0.12)",
          color: "#94a3b8",
          border: "1px solid rgba(148, 163, 184, 0.2)",
        };
    }
  }

  const activeInvestments = investments.filter(
    (investment) => investment.status?.toUpperCase() === "ACTIVE"
  );

  const otherInvestments = investments.filter(
    (investment) => investment.status?.toUpperCase() !== "ACTIVE"
  );

  const totalInvested = activeInvestments.reduce(
    (total, investment) => total + Number(investment.principal ?? 0),
    0
  );

  const totalProfit = activeInvestments.reduce(
    (total, investment) => total + Number(investment.accrued_profit ?? 0),
    0
  );

  return (
    <div className="pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight">
          My Investments
        </h1>

        <p className="mt-2 text-sm" style={{ color: "#9090a8" }}>
          Monitor your active investment positions and earnings.
        </p>
      </div>

      {loading ? (
        <div
          className="p-10 border text-center"
          style={{
            background: "#111118",
            borderColor: "rgba(212,160,23,0.15)",
          }}
        >
          <div
            className="mx-auto mb-4 h-8 w-8 rounded-full border-2 border-t-transparent animate-spin"
            style={{
              borderColor: "#d4a017",
              borderTopColor: "transparent",
            }}
          />

          <p className="text-sm" style={{ color: "#9090a8" }}>
            Loading your investments...
          </p>
        </div>
      ) : investments.length === 0 ? (
        <div
          className="p-10 border text-center"
          style={{
            background:
              "linear-gradient(145deg, rgba(17,17,24,1), rgba(13,13,19,1))",
            borderColor: "rgba(212,160,23,0.15)",
          }}
        >
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
            style={{
              background: "rgba(212,160,23,0.1)",
              color: "#d4a017",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M3 3v18h18" />
              <path d="m7 16 4-5 3 3 5-7" />
            </svg>
          </div>

          <h2 className="mt-5 text-xl font-bold">
            No investments yet
          </h2>

          <p
            className="mx-auto mt-3 max-w-md text-sm leading-6"
            style={{ color: "#9090a8" }}
          >
            You do not currently have any investment positions. Choose an
            investment plan to get started.
          </p>

          <Link
            to="/dashboard/plans"
            className="inline-flex mt-6 px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90"
            style={{
              background: "#d4a017",
              color: "#09090e",
            }}
          >
            View Investment Plans
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div
              className="p-5 border"
              style={{
                background: "#111118",
                borderColor: "rgba(212,160,23,0.15)",
              }}
            >
              <p
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: "#9090a8" }}
              >
                Active Positions
              </p>

              <p className="mt-2 text-2xl font-black">
                {activeInvestments.length}
              </p>
            </div>

            <div
              className="p-5 border"
              style={{
                background: "#111118",
                borderColor: "rgba(212,160,23,0.15)",
              }}
            >
              <p
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: "#9090a8" }}
              >
                Active Capital
              </p>

              <p className="mt-2 text-2xl font-black">
                {money(totalInvested)}
              </p>
            </div>

            <div
              className="p-5 border"
              style={{
                background: "#111118",
                borderColor: "rgba(212,160,23,0.15)",
              }}
            >
              <p
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: "#9090a8" }}
              >
                Accrued Profit
              </p>

              <p
                className="mt-2 text-2xl font-black"
                style={{ color: "#d4a017" }}
              >
                {money(totalProfit)}
              </p>
            </div>
          </div>

          {activeInvestments.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">
                    Active Investments
                  </h2>

                  <p
                    className="mt-1 text-sm"
                    style={{ color: "#9090a8" }}
                  >
                    Your currently running investment positions.
                  </p>
                </div>

                <span
                  className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-bold"
                  style={{
                    background: "rgba(34, 197, 94, 0.1)",
                    color: "#4ade80",
                    border: "1px solid rgba(34, 197, 94, 0.2)",
                  }}
                >
                  {activeInvestments.length} Active
                </span>
              </div>

              <div className="space-y-4">
                {activeInvestments.map((investment) => {
                  const statusStyle = getStatusStyle(investment.status);

                  return (
                    <div
                      key={investment.id}
                      className="border overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(145deg, #111118, #0e0e14)",
                        borderColor: "rgba(212,160,23,0.18)",
                      }}
                    >
                      <div
                        className="h-1"
                        style={{ background: "#d4a017" }}
                      />

                      <div className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                          <div>
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-bold">
                                Investment Position
                              </h3>

                              <span
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                                style={statusStyle}
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{
                                    background: statusStyle.color,
                                  }}
                                />

                                {getStatusLabel(investment.status)}
                              </span>
                            </div>

                            <p
                              className="mt-1 text-xs"
                              style={{ color: "#68687a" }}
                            >
                              ID: {investment.id}
                            </p>
                          </div>

                          <div className="text-left lg:text-right">
                            <p
                              className="text-xs"
                              style={{ color: "#9090a8" }}
                            >
                              Invested Amount
                            </p>

                            <p className="mt-1 text-2xl font-black">
                              {money(investment.principal)}
                            </p>
                          </div>
                        </div>

                        <div
                          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t"
                          style={{
                            borderColor: "rgba(255,255,255,0.06)",
                          }}
                        >
                          <div>
                            <p
                              className="text-xs"
                              style={{ color: "#9090a8" }}
                            >
                              Daily Rate
                            </p>

                            <p className="mt-1 font-bold">
                              {Number(investment.daily_rate).toFixed(2)}%
                            </p>
                          </div>

                          <div>
                            <p
                              className="text-xs"
                              style={{ color: "#9090a8" }}
                            >
                              Accrued Profit
                            </p>

                            <p
                              className="mt-1 font-bold"
                              style={{ color: "#d4a017" }}
                            >
                              {money(investment.accrued_profit)}
                            </p>
                          </div>

                          <div>
                            <p
                              className="text-xs"
                              style={{ color: "#9090a8" }}
                            >
                              Start Date
                            </p>

                            <p className="mt-1 font-semibold">
                              {formatDate(investment.start_date)}
                            </p>
                          </div>

                          <div>
                            <p
                              className="text-xs"
                              style={{ color: "#9090a8" }}
                            >
                              Maturity Date
                            </p>

                            <p className="mt-1 font-semibold">
                              {formatDate(investment.maturity_date)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {otherInvestments.length > 0 && (
            <section>
              <div className="mb-4">
                <h2 className="text-xl font-bold">
                  Investment History
                </h2>

                <p
                  className="mt-1 text-sm"
                  style={{ color: "#9090a8" }}
                >
                  Completed and previous investment positions.
                </p>
              </div>

              <div className="space-y-3">
                {otherInvestments.map((investment) => (
                  <div
                    key={investment.id}
                    className="p-5 border"
                    style={{
                      background: "#111118",
                      borderColor: "rgba(212,160,23,0.12)",
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-center">
                      <div>
                        <p
                          className="text-xs"
                          style={{ color: "#9090a8" }}
                        >
                          Amount
                        </p>

                        <p className="mt-1 text-lg font-bold">
                          {money(investment.principal)}
                        </p>
                      </div>

                      <div>
                        <p
                          className="text-xs"
                          style={{ color: "#9090a8" }}
                        >
                          Daily Rate
                        </p>

                        <p className="mt-1 font-semibold">
                          {Number(investment.daily_rate).toFixed(2)}%
                        </p>
                      </div>

                      <div>
                        <p
                          className="text-xs"
                          style={{ color: "#9090a8" }}
                        >
                          Profit
                        </p>

                        <p
                          className="mt-1 font-semibold"
                          style={{ color: "#d4a017" }}
                        >
                          {money(investment.accrued_profit)}
                        </p>
                      </div>

                      <div>
                        <p
                          className="text-xs"
                          style={{ color: "#9090a8" }}
                        >
                          Maturity
                        </p>

                        <p className="mt-1 font-semibold">
                          {formatDate(investment.maturity_date)}
                        </p>
                      </div>

                      <div>
                        <p
                          className="text-xs"
                          style={{ color: "#9090a8" }}
                        >
                          Status
                        </p>

                        <span
                          className="inline-flex mt-1 px-3 py-1.5 rounded-full text-xs font-bold"
                          style={getStatusStyle(investment.status)}
                        >
                          {getStatusLabel(investment.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeInvestments.length === 0 &&
            otherInvestments.length > 0 && (
              <div
                className="mt-6 p-5 border"
                style={{
                  background: "rgba(212,160,23,0.04)",
                  borderColor: "rgba(212,160,23,0.12)",
                }}
              >
                <p
                  className="text-sm"
                  style={{ color: "#9090a8" }}
                >
                  You currently have no active investment positions.
                </p>

                <Link
                  to="/dashboard/plans"
                  className="inline-block mt-3 text-sm font-bold"
                  style={{ color: "#d4a017" }}
                >
                  Explore investment plans →
                </Link>
              </div>
            )}
        </>
      )}
    </div>
  );
}