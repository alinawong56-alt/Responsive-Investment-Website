import { Link } from "react-router";
import { useState } from "react";

const plans = [
  {
    name: "Foundation",
    tier: "01",
    min: 1000,
    max: 9999,
    rate: 2.0,
    duration: 30,
    features: [
      "Secure online dashboard",
      "Daily accrual tracking",
      "Transaction history",
      "Email notifications",
      "Standard withdrawal processing",
    ],
    color: "#9090a8",
    active: true,
  },
  {
    name: "Growth",
    tier: "02",
    min: 10000,
    max: 49999,
    rate: 2.0,
    duration: 60,
    features: [
      "All Foundation features",
      "Priority support queue",
      "Detailed return statements",
      "Multiple concurrent investments",
      "Expedited withdrawal review",
    ],
    color: "#d4a017",
    active: true,
    featured: true,
  },
  {
    name: "Apex",
    tier: "03",
    min: 50000,
    max: 249999,
    rate: 2.0,
    duration: 90,
    features: [
      "All Growth features",
      "Dedicated account manager",
      "Monthly portfolio report",
      "Custom maturity scheduling",
      "Priority withdrawal processing",
    ],
    color: "#e8b830",
    active: true,
  },
  {
    name: "Sovereign",
    tier: "04",
    min: 250000,
    max: null,
    rate: 2.0,
    duration: 120,
    features: [
      "All Apex features",
      "Direct executive contact",
      "Bespoke portfolio structuring",
      "Quarterly review calls",
      "Same-day withdrawal review",
    ],
    color: "#f5f0e8",
    active: true,
  },
];

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function Plans() {
  const [amount, setAmount] = useState(10000);
  const [days, setDays] = useState(60);

  const daily = amount * 0.02;
  const total = amount + daily * days;

  return (
    <div className="fade-up pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#d4a017" }}>Investment Plans</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6" style={{ letterSpacing: "-0.04em" }}>
            Four structured<br />investment tiers.
          </h1>
          <p className="text-base leading-relaxed max-w-xl" style={{ color: "#9090a8" }}>
            All plans apply the same stated daily rate of 2.0%. Tier selection determines minimum capital, investment duration, and account services. Returns are calculated — not guaranteed.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px mb-20" style={{ background: "rgba(212,160,23,0.1)" }}>
          {plans.map((p, i) => (
            <div
              key={i}
              className="flex flex-col p-8 transition-all duration-200"
              style={{
                background: p.featured ? "#16161f" : "#111118",
                outline: p.featured ? "1px solid rgba(212,160,23,0.3)" : "none",
                outlineOffset: "-1px",
              }}
            >
              {p.featured && (
                <div
                  className="text-xs font-semibold uppercase tracking-widest px-2 py-0.5 mb-4 self-start"
                  style={{ background: "rgba(212,160,23,0.15)", color: "#d4a017" }}
                >
                  Most selected
                </div>
              )}
              <div className="text-xs font-mono mb-2" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(212,160,23,0.4)" }}>
                {p.tier}
              </div>
              <h2 className="text-2xl font-black mb-1" style={{ color: p.color }}>{p.name}</h2>
              <p className="text-xs mb-8" style={{ color: "#9090a8" }}>
                {fmt(p.min)} – {p.max ? fmt(p.max) : "No limit"}
              </p>

              <div className="space-y-3 mb-8 p-4 border" style={{ borderColor: "rgba(212,160,23,0.1)", background: "rgba(9,9,14,0.4)" }}>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#9090a8" }}>Daily rate</span>
                  <span className="font-bold" style={{ fontFamily: "'DM Mono', monospace", color: "#d4a017" }}>{p.rate.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#9090a8" }}>Duration</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", color: "#f5f0e8" }}>{p.duration} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#9090a8" }}>Calculated return*</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", color: "#d4a017" }}>
                    {(p.rate * p.duration).toFixed(1)}%
                  </span>
                </div>
              </div>

              <ul className="space-y-2 mb-10 flex-1">
                {p.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-sm">
                    <span style={{ color: "#d4a017", marginTop: "2px", flexShrink: 0 }}>◆</span>
                    <span style={{ color: "#9090a8" }}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/register"
                className="text-center text-sm font-bold py-3 transition-all duration-150"
                style={{
                  background: p.featured ? "#d4a017" : "transparent",
                  color: p.featured ? "#09090e" : "#d4a017",
                  border: p.featured ? "none" : "1px solid rgba(212,160,23,0.3)",
                }}
              >
                Open Account →
              </Link>
            </div>
          ))}
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-10 border" style={{ background: "#111118", borderColor: "rgba(212,160,23,0.15)" }}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "#d4a017" }}>Return Calculator</p>
            <p className="text-sm mb-8" style={{ color: "#9090a8" }}>
              Enter a principal amount and duration to see a calculated return based on the platform's stated 2.0% daily rate. This is illustrative — not a guaranteed outcome.
            </p>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#9090a8" }}>Principal Amount (USD)</label>
                <input
                  type="number"
                  min={1000}
                  step={1000}
                  value={amount}
                  onChange={(e) => setAmount(Math.max(1000, Number(e.target.value)))}
                  className="w-full px-4 py-3 text-sm bg-transparent border outline-none transition-colors"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    color: "#f5f0e8",
                    borderColor: "rgba(212,160,23,0.3)",
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#9090a8" }}>Duration (days)</label>
                <input
                  type="number"
                  min={1}
                  max={120}
                  value={days}
                  onChange={(e) => setDays(Math.max(1, Math.min(120, Number(e.target.value))))}
                  className="w-full px-4 py-3 text-sm bg-transparent border outline-none"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    color: "#f5f0e8",
                    borderColor: "rgba(212,160,23,0.3)",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="p-5 border" style={{ background: "rgba(212,160,23,0.04)", borderColor: "rgba(212,160,23,0.1)" }}>
              <p className="text-xs mb-1" style={{ color: "#9090a8" }}>Daily accrual</p>
              <p className="text-2xl font-black" style={{ fontFamily: "'DM Mono', monospace", color: "#d4a017" }}>
                {fmt(daily)}
              </p>
            </div>
            <div className="p-5 border" style={{ background: "rgba(212,160,23,0.04)", borderColor: "rgba(212,160,23,0.1)" }}>
              <p className="text-xs mb-1" style={{ color: "#9090a8" }}>Total stated return over {days} days</p>
              <p className="text-2xl font-black" style={{ fontFamily: "'DM Mono', monospace", color: "#d4a017" }}>
                {fmt(daily * days)}
              </p>
            </div>
            <div className="p-5 border" style={{ background: "rgba(212,160,23,0.08)", borderColor: "rgba(212,160,23,0.2)" }}>
              <p className="text-xs mb-1" style={{ color: "#9090a8" }}>Total calculated value</p>
              <p className="text-3xl font-black" style={{ fontFamily: "'DM Mono', monospace", color: "#f5f0e8" }}>
                {fmt(total)}
              </p>
            </div>
            <p className="text-xs" style={{ color: "#9090a8" }}>
              * Illustrative only. Returns are not guaranteed. Risk of capital loss exists.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-5 border-l-2" style={{ borderColor: "#d4a017", background: "rgba(212,160,23,0.04)" }}>
          <p className="text-xs leading-relaxed" style={{ color: "#9090a8" }}>
            All investment plans involve risk. The stated 2.0% daily rate is a calculated rate applied by the platform's accounting system — it is not a guaranteed financial return. Capital invested may not be recovered in full. Read the{" "}
            <Link to="/risk-disclosure" style={{ color: "#d4a017" }}>Risk Disclosure</Link>
            {" "}before committing capital. Investment minimums and terms are subject to change.
          </p>
        </div>
      </div>
    </div>
  );
}
