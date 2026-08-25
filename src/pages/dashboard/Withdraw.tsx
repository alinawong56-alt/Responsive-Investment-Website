import { Link } from "react-router";

export default function Withdraw() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Withdraw</h1>
        <p className="mt-2 text-sm" style={{ color: "#9090a8" }}>
          Request a withdrawal from your available balance.
        </p>
      </div>

      <div
        className="max-w-2xl p-8 border"
        style={{
          background: "#111118",
          borderColor: "rgba(212,160,23,0.15)",
        }}
      >
        <h2 className="text-xl font-bold">Withdrawal Request</h2>

        <p className="mt-3 text-sm" style={{ color: "#9090a8" }}>
          Withdrawal functionality will appear here.
        </p>

        <Link
          to="/dashboard/wallet"
          className="inline-block mt-6 px-6 py-3 text-sm font-bold"
          style={{ background: "#d4a017", color: "#09090e" }}
        >
          Back to Wallet
        </Link>
      </div>
    </div>
  );
}
