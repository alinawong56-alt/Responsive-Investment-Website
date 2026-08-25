import { Link } from "react-router";

const phases = [
  {
    n: "01",
    title: "Registration & Verification",
    body: "Create a secure account with your email address and set a strong password. Depending on applicable regulations and your selected plan tier, identity verification may be required before your account is fully activated.",
    items: [
      "Email address and secure password required",
      "Identity verification may apply",
      "Account activation via email confirmation",
      "Profile information stored securely",
    ],
  },
  {
    n: "02",
    title: "Funding Your Wallet",
    body: "Deposit funds through our integrated payment processing system. Deposits are processed by our payment provider, confirmed via a server-side webhook, and credited to your wallet exactly once upon verified confirmation.",
    items: [
      "Select your deposit amount",
      "Redirected to payment provider checkout",
      "Payment confirmed server-side via webhook",
      "Wallet credited only upon verified confirmation",
      "Deposit transaction created and visible in history",
    ],
  },
  {
    n: "03",
    title: "Selecting a Plan",
    body: "Choose an active investment plan from your dashboard. Your selection determines the minimum and maximum capital thresholds, duration, and the daily rate applied to your principal. Plans are created and managed by platform administrators.",
    items: [
      "Review available active plans",
      "Confirm plan terms and duration",
      "Enter investment amount within plan thresholds",
      "Amount deducted from available wallet balance",
      "Investment record created with start and maturity dates",
    ],
  },
  {
    n: "04",
    title: "Daily Accrual",
    body: "The platform's server-side accrual mechanism runs periodically. For each eligible investment, it calculates the number of days elapsed since the last accrual, computes the applicable daily profit, and credits it to your wallet. Each day can only be credited once — the process is idempotent.",
    items: [
      "Accrual runs server-side — no browser tab required",
      "Profit calculated from principal × daily rate × eligible days",
      "Each calendar day credited exactly once",
      "Profit transaction created per accrual event",
      "Wallet total_profit updated accordingly",
    ],
  },
  {
    n: "05",
    title: "Maturity",
    body: "When an investment reaches its maturity date, the accrual process stops and the investment is marked MATURED. No further daily profit is generated after maturity. The platform's maturity rules determine how the principal is handled at that point.",
    items: [
      "Accrual stops at maturity date",
      "Investment status updated to MATURED",
      "Principal handled per platform maturity rules",
      "Maturity transaction recorded",
      "Wallet balances updated atomically",
    ],
  },
  {
    n: "06",
    title: "Withdrawals",
    body: "Submit a withdrawal request from your dashboard when your available balance is sufficient. The platform reserves the withdrawal amount immediately and creates a PENDING withdrawal record. Administrators review and process withdrawal requests.",
    items: [
      "Enter amount and destination details",
      "Available balance checked server-side",
      "Amount reserved atomically — no negative balance risk",
      "Withdrawal record created as PENDING",
      "Administrator reviews and processes the request",
      "Completion confirmed only upon verified payout",
    ],
  },
];

export default function HowItWorks() {
  return (
    <div className="fade-up pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#d4a017" }}>Process</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6" style={{ letterSpacing: "-0.04em" }}>
            How Musk Enterprise<br />works.
          </h1>
          <p className="text-base leading-relaxed max-w-xl" style={{ color: "#9090a8" }}>
            A complete walkthrough of the platform's mechanics — from account creation to withdrawal. Every step is governed by server-side logic and secure accounting.
          </p>
        </div>

        {/* Phase timeline */}
        <div className="space-y-px" style={{ border: "1px solid rgba(212,160,23,0.1)" }}>
          {phases.map((p, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10"
              style={{ background: i % 2 === 0 ? "#111118" : "#09090e", borderBottom: "1px solid rgba(212,160,23,0.08)" }}
            >
              <div>
                <p className="text-xs font-mono mb-2" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(212,160,23,0.5)" }}>{p.n}</p>
                <h2 className="text-xl font-black mb-4" style={{ letterSpacing: "-0.02em" }}>{p.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: "#9090a8" }}>{p.body}</p>
              </div>
              <div className="md:col-span-2">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {p.items.map((item, ii) => (
                    <li key={ii} className="flex items-start gap-3 text-sm">
                      <span className="mt-1 flex-shrink-0" style={{ color: "#d4a017" }}>◆</span>
                      <span style={{ color: "#9090a8" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Security note */}
        <div className="mt-12 p-8 border-l-2" style={{ borderColor: "#d4a017", background: "#111118" }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#d4a017" }}>Security Architecture</p>
          <p className="text-sm leading-relaxed" style={{ color: "#9090a8" }}>
            All balance-changing operations — deposits, investments, profit accrual, and withdrawals — are executed server-side using database-level transactions. Client-side JavaScript cannot initiate balance changes. Row-level security ensures users can only access their own data. Secret keys (payment provider, webhook signatures) are never exposed to the browser.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold"
            style={{ background: "#d4a017", color: "#09090e" }}
          >
            Open an Account →
          </Link>
          <Link
            to="/plans"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium border"
            style={{ color: "#f5f0e8", borderColor: "rgba(212,160,23,0.3)" }}
          >
            View Investment Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
