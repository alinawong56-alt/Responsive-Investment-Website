import { Link } from "react-router";

export default function Support() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Support</h1>
        <p className="mt-2 text-sm" style={{ color: "#9090a8" }}>
          Get help with your account.
        </p>
      </div>

      <div
        className="max-w-2xl p-8 border"
        style={{
          background: "#111118",
          borderColor: "rgba(212,160,23,0.15)",
        }}
      >
        <h2 className="text-xl font-bold">Need assistance?</h2>

        <p className="mt-3 text-sm" style={{ color: "#9090a8" }}>
          If you need help with your account, contact our support team.
        </p>

        <Link
          to="/contact"
          className="inline-block mt-6 px-6 py-3 text-sm font-bold"
          style={{
            background: "#d4a017",
            color: "#09090e",
          }}
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
