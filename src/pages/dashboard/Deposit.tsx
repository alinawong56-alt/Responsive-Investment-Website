import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "../../lib/supabase";

export default function Deposit() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login", { replace: true });
    }
  }

  async function submitDeposit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setMessage("");

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      setError("Please enter a valid deposit amount.");
      return;
    }

    if (numericAmount < 10) {
      setError("Minimum deposit amount is $10.");
      return;
    }

    if (!reference.trim()) {
      setError("Please enter your bank transfer reference.");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login", { replace: true });
        return;
      }

      const { error: depositError } = await supabase
        .from("deposits")
        .insert({
          user_id: user.id,
          amount: numericAmount,
          currency: "USD",
          provider: "bank_transfer",
          provider_reference: reference.trim(),
          status: "PENDING",
        });

      if (depositError) {
        console.error("DEPOSIT INSERT ERROR:", depositError);
        setError(
          `Unable to submit deposit: ${depositError.message || "Unknown database error"}`
        );
        return;
      }

      setAmount("");
      setReference("");

      setMessage(
        "Deposit submitted successfully. Your transfer will be reviewed before your wallet is credited."
      );
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <p
          className="text-xs uppercase tracking-widest font-semibold mb-3"
          style={{ color: "#d4a017" }}
        >
          Wallet
        </p>

        <h1 className="text-3xl font-black">Deposit Funds</h1>

        <p className="mt-2 text-sm" style={{ color: "#9090a8" }}>
          Fund your wallet using a bank transfer.
        </p>
      </div>

      <div className="max-w-3xl space-y-6">

        {/* Bank details */}
        <div
          className="p-6 border"
          style={{
            background: "#111118",
            borderColor: "rgba(212,160,23,0.2)",
          }}
        >
          <h2 className="text-xl font-bold mb-5">
            Bank Transfer Details
          </h2>

          <div className="space-y-4 text-sm">
            <div>
              <p style={{ color: "#777789" }}>Bank</p>
              <p className="font-semibold mt-1">
                Opay
              </p>
            </div>

            <div>
              <p style={{ color: "#777789" }}>Account Name</p>
              <p className="font-semibold mt-1">
                Tohbi Gnf
              </p>
            </div>

            <div>
              <p style={{ color: "#777789" }}>Account Number</p>
              <p className="font-semibold mt-1">
                7084227994
              </p>
            </div>

            <div>
              <p style={{ color: "#777789" }}>Currency</p>
              <p className="font-semibold mt-1">
                USD
              </p>
            </div>
          </div>

          <div
            className="mt-6 p-4 border text-sm"
            style={{
              background: "rgba(212,160,23,0.06)",
              borderColor: "rgba(212,160,23,0.15)",
              color: "#c7c2b8",
            }}
          >
            After making the transfer, enter the exact amount and
            your bank transfer reference below. Your wallet will
            only be credited after the transfer has been verified.
          </div>
        </div>

        {/* Deposit form */}
        <form
          onSubmit={submitDeposit}
          className="p-6 border"
          style={{
            background: "#111118",
            borderColor: "rgba(212,160,23,0.2)",
          }}
        >
          <h2 className="text-xl font-bold mb-5">
            Submit Transfer
          </h2>

          <div className="space-y-5">

            <div>
              <label
                className="block text-sm mb-2"
                style={{ color: "#9090a8" }}
              >
                Amount
              </label>

              <input
                type="number"
                min="10"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1000"
                className="w-full px-4 py-4 bg-transparent border outline-none"
                style={{
                  color: "#f5f0e8",
                  borderColor: "rgba(212,160,23,0.25)",
                }}
              />
            </div>

            <div>
              <label
                className="block text-sm mb-2"
                style={{ color: "#9090a8" }}
              >
                Bank Transfer Reference
              </label>

              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Enter your transfer reference"
                className="w-full px-4 py-4 bg-transparent border outline-none"
                style={{
                  color: "#f5f0e8",
                  borderColor: "rgba(212,160,23,0.25)",
                }}
              />
            </div>

            {error && (
              <div
                className="p-4 border text-sm"
                style={{
                  color: "#ff8b8b",
                  background: "rgba(255,80,80,0.06)",
                  borderColor: "rgba(255,80,80,0.15)",
                }}
              >
                {error}
              </div>
            )}

            {message && (
              <div
                className="p-4 border text-sm"
                style={{
                  color: "#d4a017",
                  background: "rgba(212,160,23,0.06)",
                  borderColor: "rgba(212,160,23,0.15)",
                }}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 font-bold"
              style={{
                background: loading ? "#6d5a1f" : "#d4a017",
                color: "#09090e",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Submitting..." : "Submit Deposit"}
            </button>
          </div>
        </form>

        <Link
          to="/dashboard/wallet"
          className="inline-block text-sm"
          style={{ color: "#d4a017" }}
        >
          ← Back to Wallet
        </Link>
      </div>
    </div>
  );
}