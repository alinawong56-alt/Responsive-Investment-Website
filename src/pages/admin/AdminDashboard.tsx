import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../lib/supabase";

type Deposit = {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  provider: string;
  provider_reference: string;
  status: string;
  created_at: string;
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    setLoading(true);
    setError("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error(userError);
        setError("Unable to verify your account.");
        return;
      }

      if (!user) {
        navigate("/login", { replace: true });
        return;
      }

      /*
       * Administrator verification
       *
       * Admin status is stored directly on the user's profile.
       */
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, is_admin")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error("ADMIN CHECK ERROR:", profileError);
        setError("Unable to verify administrator access.");
        return;
      }

      if (!profile || profile.is_admin !== true) {
        setError("You do not have administrator access.");
        return;
      }

      await loadDeposits();
    } catch (err) {
      console.error(err);
      setError("Unable to load administrator dashboard.");
    } finally {
      setLoading(false);
    }
  }

  async function loadDeposits() {
    setError("");

    const { data, error: depositsError } = await supabase
      .from("deposits")
      .select(
        "id,user_id,amount,currency,provider,provider_reference,status,created_at"
      )
      .eq("status", "PENDING")
      .order("created_at", { ascending: false });

    if (depositsError) {
      console.error("LOAD DEPOSITS ERROR:", depositsError);
      setError("Unable to load pending deposits.");
      return;
    }

    setDeposits((data ?? []) as Deposit[]);
  }

  async function approveDeposit(depositId: string) {
    if (processing) {
      return;
    }

    setProcessing(depositId);
    setError("");
    setMessage("");

    try {
      /*
       * The database function performs all of these operations
       * atomically:
       *
       * 1. Verifies the administrator
       * 2. Locks the deposit
       * 3. Confirms the deposit
       * 4. Credits the user's wallet
       * 5. Creates the transaction
       *
       * This prevents accidental double-crediting.
       */
      const { data, error: approveError } = await supabase.rpc(
        "approve_deposit",
        {
          p_deposit_id: depositId,
        }
      );

      if (approveError) {
        console.error("APPROVE DEPOSIT ERROR:", approveError);
        setError(
          `Unable to approve deposit: ${approveError.message || "Unknown database error"
          }`
        );
        return;
      }

      console.log("Deposit approval result:", data);

      setMessage("Deposit approved successfully.");

      await loadDeposits();
    } catch (err) {
      console.error("APPROVE DEPOSIT ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to approve deposit."
      );
    } finally {
      setProcessing(null);
    }
  }

  async function rejectDeposit(depositId: string) {
    if (processing) {
      return;
    }

    setProcessing(depositId);
    setError("");
    setMessage("");

    try {
      const { data, error: rejectError } = await supabase
        .from("deposits")
        .update({
          status: "REJECTED",
        })
        .eq("id", depositId)
        .eq("status", "PENDING")
        .select("id,status")
        .maybeSingle();

      if (rejectError) {
        console.error("REJECT DEPOSIT ERROR:", rejectError);

        setError(
          `Unable to reject deposit: ${rejectError.message || "Unknown database error"
          }`
        );

        return;
      }

      if (!data) {
        setError(
          "This deposit was already processed or could not be found."
        );
        return;
      }

      setMessage("Deposit rejected.");

      await loadDeposits();
    } catch (err) {
      console.error("REJECT DEPOSIT ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to reject deposit."
      );
    } finally {
      setProcessing(null);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  }

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "#09090e",
          color: "#f5f0e8",
        }}
      >
        <p style={{ color: "#9090a8" }}>
          Loading administrator dashboard...
        </p>
      </div>
    );
  }

  if (error && deposits.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{
          background: "#09090e",
          color: "#f5f0e8",
        }}
      >
        <div
          className="w-full max-w-md p-8 border text-center"
          style={{
            background: "#111118",
            borderColor: "rgba(212,160,23,0.2)",
          }}
        >
          <div
            className="w-12 h-12 mx-auto mb-5 flex items-center justify-center"
            style={{
              background: "rgba(212,160,23,0.1)",
              color: "#d4a017",
            }}
          >
            ME
          </div>

          <h1 className="text-2xl font-black mb-4">
            Administrator Access
          </h1>

          <p
            className="text-sm"
            style={{ color: "#e05050" }}
          >
            {error}
          </p>

          <div className="flex gap-3 justify-center mt-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-3 font-bold"
              style={{
                background: "#d4a017",
                color: "#09090e",
              }}
            >
              Back to Dashboard
            </button>

            <button
              onClick={logout}
              className="px-6 py-3 font-bold border"
              style={{
                borderColor: "rgba(212,160,23,0.25)",
                color: "#d4a017",
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-6 py-10"
      style={{
        background: "#09090e",
        color: "#f5f0e8",
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">
          <div>
            <p
              className="text-xs uppercase tracking-widest font-semibold mb-2"
              style={{ color: "#d4a017" }}
            >
              Musk Enterprise
            </p>

            <h1 className="text-3xl font-black">
              Administrator Dashboard
            </h1>

            <p
              className="mt-2 text-sm"
              style={{ color: "#9090a8" }}
            >
              Manage deposits and platform transactions.
            </p>
          </div>

          <button
            onClick={logout}
            className="px-5 py-3 text-sm font-bold border"
            style={{
              borderColor: "rgba(212,160,23,0.25)",
              color: "#d4a017",
            }}
          >
            Sign Out
          </button>
        </div>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div
            className="mb-6 p-4 border text-sm"
            style={{
              color: "#d4a017",
              background: "rgba(212,160,23,0.06)",
              borderColor: "rgba(212,160,23,0.2)",
            }}
          >
            {message}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div
            className="mb-6 p-4 border text-sm"
            style={{
              color: "#ff8b8b",
              background: "rgba(255,80,80,0.06)",
              borderColor: "rgba(255,80,80,0.2)",
            }}
          >
            {error}
          </div>
        )}

        {/* PENDING DEPOSITS */}
        <div
          className="p-6 border"
          style={{
            background: "#111118",
            borderColor: "rgba(212,160,23,0.2)",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold">
                Pending Deposits
              </h2>

              <p
                className="text-sm mt-1"
                style={{ color: "#9090a8" }}
              >
                Bank transfer deposits waiting for approval.
              </p>
            </div>

            <div
              className="px-4 py-2 text-sm font-bold w-fit"
              style={{
                background: "rgba(212,160,23,0.1)",
                color: "#d4a017",
              }}
            >
              {deposits.length} Pending
            </div>
          </div>

          {deposits.length === 0 ? (
            <div
              className="py-12 text-center"
              style={{ color: "#9090a8" }}
            >
              No pending deposits.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    className="text-left border-b"
                    style={{
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <th className="pb-4 pr-4">
                      Amount
                    </th>

                    <th className="pb-4 pr-4">
                      Provider
                    </th>

                    <th className="pb-4 pr-4">
                      Reference
                    </th>

                    <th className="pb-4 pr-4">
                      Date
                    </th>

                    <th className="pb-4 text-right">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {deposits.map((deposit) => {
                    const isProcessing =
                      processing === deposit.id;

                    return (
                      <tr
                        key={deposit.id}
                        className="border-b"
                        style={{
                          borderColor:
                            "rgba(255,255,255,0.06)",
                        }}
                      >
                        <td className="py-5 pr-4 font-bold whitespace-nowrap">
                          {deposit.currency}{" "}
                          {Number(
                            deposit.amount
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>

                        <td
                          className="py-5 pr-4"
                          style={{
                            color: "#c7c2b8",
                          }}
                        >
                          {deposit.provider}
                        </td>

                        <td
                          className="py-5 pr-4 font-mono text-xs"
                          style={{
                            color: "#c7c2b8",
                          }}
                        >
                          {deposit.provider_reference}
                        </td>

                        <td
                          className="py-5 pr-4 whitespace-nowrap"
                          style={{
                            color: "#9090a8",
                          }}
                        >
                          {new Date(
                            deposit.created_at
                          ).toLocaleString()}
                        </td>

                        <td className="py-5 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() =>
                                approveDeposit(
                                  deposit.id
                                )
                              }
                              disabled={!!processing}
                              className="px-4 py-2 text-xs font-bold"
                              style={{
                                background:
                                  isProcessing
                                    ? "#6d5a1f"
                                    : "#d4a017",
                                color: "#09090e",
                                opacity:
                                  processing &&
                                    !isProcessing
                                    ? 0.5
                                    : 1,
                                cursor:
                                  processing
                                    ? "not-allowed"
                                    : "pointer",
                              }}
                            >
                              {isProcessing
                                ? "Processing..."
                                : "Approve"}
                            </button>

                            <button
                              onClick={() =>
                                rejectDeposit(
                                  deposit.id
                                )
                              }
                              disabled={!!processing}
                              className="px-4 py-2 text-xs font-bold border"
                              style={{
                                borderColor:
                                  "rgba(220,80,80,0.3)",
                                color: "#e05050",
                                opacity:
                                  processing &&
                                    !isProcessing
                                    ? 0.5
                                    : 1,
                                cursor:
                                  processing
                                    ? "not-allowed"
                                    : "pointer",
                              }}
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}