import { Link } from "react-router";

const risks = [
  {
    title: "Capital Risk",
    body: "All capital invested through this platform is at risk. You may lose some or all of your invested capital. The platform does not guarantee the return of principal.",
  },
  {
    title: "Return Risk",
    body: "The stated daily rate (currently 2.0%) is a calculation rate applied by the platform's accounting system. It is not a guaranteed financial return. Actual returns may be lower, and no return is assured.",
  },
  {
    title: "Liquidity Risk",
    body: "Invested capital is committed for the duration of the selected plan. Funds are not available for withdrawal while a plan is active. Withdrawal requests are subject to processing times and administrator review.",
  },
  {
    title: "Operational Risk",
    body: "The platform's operations may be affected by technical failures, cyberattacks, regulatory changes, or other operational disruptions. These events could impact your ability to access your account or receive returns.",
  },
  {
    title: "Regulatory Risk",
    body: "Investment platforms are subject to evolving regulatory requirements. Changes in law or regulation could affect the platform's ability to operate, which could impact your investment.",
  },
  {
    title: "Counterparty Risk",
    body: "Your investment is subject to the continued solvency and operational integrity of Musk Enterprise. The platform is not a bank and deposits are not covered by government deposit insurance schemes such as the FDIC.",
  },
  {
    title: "No FDIC or Equivalent Insurance",
    body: "Funds held in your Musk Enterprise wallet are not deposits at a bank and are not insured by the FDIC, FSCS, or any equivalent government-backed insurance scheme. You could lose all funds held on the platform.",
  },
  {
    title: "Past Performance",
    body: "The stated rate structure and any historical accrual performance do not constitute a representation of future results. Past performance of the platform's rate structure does not indicate future performance.",
  },
];

export default function RiskDisclosure() {
  return (
    <div className="fade-up pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#d4a017" }}>Legal</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ letterSpacing: "-0.04em" }}>
            Risk Disclosure
          </h1>
          <p className="text-sm" style={{ color: "#9090a8" }}>Last updated: January 2025</p>
        </div>

        {/* Warning banner */}
        <div
          className="p-6 mb-10 border text-sm"
          style={{ background: "rgba(212,160,23,0.06)", borderColor: "rgba(212,160,23,0.35)", color: "#f5f0e8" }}
        >
          <p className="font-bold text-base mb-2" style={{ color: "#d4a017" }}>Important: Please read carefully</p>
          <p style={{ color: "#9090a8" }}>
            Investment in the Musk Enterprise platform involves significant risk, including the risk of total loss of capital. You should only invest funds you can afford to lose entirely. Do not invest funds required for essential living expenses, emergency reserves, or obligations. This disclosure does not constitute financial, legal, or tax advice.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px mb-12" style={{ background: "rgba(212,160,23,0.1)" }}>
          {risks.map((r, i) => (
            <div key={i} className="p-8" style={{ background: i % 2 === 0 ? "#111118" : "#0f0f18" }}>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 mt-1.5 flex-shrink-0" style={{ background: "#d4a017" }} />
                <div>
                  <h3 className="text-sm font-bold mb-2">{r.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#9090a8" }}>{r.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Acknowledgement */}
        <div className="p-8 border" style={{ background: "#111118", borderColor: "rgba(212,160,23,0.2)" }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#d4a017" }}>Acknowledgement</p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#9090a8" }}>
            By creating an account and investing through the Musk Enterprise platform, you acknowledge that:
          </p>
          <ul className="space-y-2">
            {[
              "You have read and understood this Risk Disclosure in full.",
              "You understand that investment returns are not guaranteed.",
              "You may lose some or all of the capital you invest.",
              "You are investing funds you can afford to lose.",
              "You have considered seeking independent financial advice before investing.",
              "The stated 2.0% daily rate is a platform calculation rate, not a guaranteed financial return.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#9090a8" }}>
                <span style={{ color: "#d4a017", marginTop: "2px" }}>◆</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 p-5 text-xs leading-relaxed" style={{ color: "#9090a8", background: "#111118", border: "1px solid rgba(212,160,23,0.08)" }}>
          This disclosure is provided for informational purposes. It does not constitute financial, legal, tax, or investment advice. Consult a qualified financial advisor before making investment decisions. Nothing on this platform constitutes a representation of guaranteed returns or financial outcomes.
        </div>

        <div className="mt-10 pt-8 border-t flex flex-wrap gap-4" style={{ borderColor: "rgba(212,160,23,0.15)" }}>
          <Link to="/terms" className="text-sm" style={{ color: "#d4a017" }}>Terms of Service →</Link>
          <Link to="/privacy" className="text-sm" style={{ color: "#d4a017" }}>Privacy Policy →</Link>
          <Link to="/register" className="text-sm" style={{ color: "#d4a017" }}>Create Account →</Link>
        </div>
      </div>
    </div>
  );
}
