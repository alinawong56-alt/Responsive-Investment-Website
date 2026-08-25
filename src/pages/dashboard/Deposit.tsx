import { Link } from "react-router";

export default function Deposit() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Deposit</h1>
        <p className="mt-2 text-sm" style={{ color: "#9090a8" }}>
          Fund your wallet.
        </p>
      </div>

      <div
        className="max-w-2xl p-8 border"
        style={{
          background: "#111118",
          borderColor: "rgba(212,160,23,0.15)",
        }}
      >
        <h2 className="text-xl font-bold">Deposit Funds</h2>

        <p className="mt-3 text-sm" style={{ color: "#9090a8" }}>
          Deposit instructions and payment options will appear here.
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
