import { Link } from "react-router";

const values = [
  { title: "Transparency", body: "We publish our rate structure, calculation methodology, and terms openly. No hidden fees, no opaque processes." },
  { title: "Security", body: "Funds are held and accounted for within a secure infrastructure. User data is protected through industry-standard authentication and encryption." },
  { title: "Integrity", body: "We do not fabricate performance figures, testimonials, or regulatory claims. All stated rates reflect our platform's calculation structure." },
  { title: "Discipline", body: "Investment is a structured activity. Our platform enforces minimum thresholds, defined durations, and systematic accrual — not speculative discretion." },
];

const team = [
  { role: "Chief Executive Officer", name: "Executive Leadership" },
  { role: "Chief Financial Officer", name: "Financial Operations" },
  { role: "Chief Technology Officer", name: "Platform Engineering" },
  { role: "Head of Compliance", name: "Legal & Compliance" },
];

export default function About() {
  return (
    <div className="fade-up pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#d4a017" }}>About</p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-8" style={{ letterSpacing: "-0.04em" }}>
              A platform built<br />on structure.
            </h1>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#9090a8" }}>
              Musk Enterprise is a structured investment platform designed to provide a systematic, transparent framework for capital allocation. We operate defined investment plans with clear parameters, published rate structures, and rigorous accounting controls.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "#9090a8" }}>
              Our platform does not make promises about guaranteed returns. We operate within the parameters of our stated plan structure — and we are forthright about the risks inherent to all investment activity.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="w-full max-w-sm p-10 border text-center"
              style={{ background: "#111118", borderColor: "rgba(212,160,23,0.2)" }}
            >
              <div
                className="w-20 h-20 flex items-center justify-center mx-auto mb-6"
                style={{ background: "#d4a017" }}
              >
                <span className="text-3xl font-black" style={{ color: "#09090e" }}>ME</span>
              </div>
              <h2 className="text-xl font-black mb-2">Musk Enterprise</h2>
              <p className="text-sm" style={{ color: "#9090a8" }}>Structured Investment Platform</p>
              <div className="mt-8 pt-6 border-t" style={{ borderColor: "rgba(212,160,23,0.1)" }}>
                <p className="text-xs" style={{ color: "#9090a8" }}>Established 2019</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <p className="text-xs font-semibold uppercase tracking-widest mb-12" style={{ color: "#d4a017" }}>Operating Principles</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "rgba(212,160,23,0.1)" }}>
            {values.map((v, i) => (
              <div key={i} className="p-10" style={{ background: "#111118" }}>
                <div className="w-8 h-px mb-6" style={{ background: "#d4a017" }} />
                <h3 className="text-xl font-bold mb-4">{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#9090a8" }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="mb-24 p-12 md:p-16 border-l-2" style={{ borderColor: "#d4a017", background: "#111118" }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#d4a017" }}>Mission</p>
          <p className="text-2xl md:text-3xl font-bold leading-tight" style={{ letterSpacing: "-0.02em" }}>
            "To provide an accessible, transparent, and systematically governed investment platform — one that is honest about what it is and what it is not."
          </p>
        </div>

        {/* Leadership */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest mb-8" style={{ color: "#d4a017" }}>Leadership Structure</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(212,160,23,0.08)" }}>
            {team.map((t, i) => (
              <div key={i} className="p-8" style={{ background: "#111118" }}>
                <div className="w-12 h-12 border mb-4 flex items-center justify-center" style={{ borderColor: "rgba(212,160,23,0.2)" }}>
                  <span className="text-lg" style={{ color: "#d4a017" }}>◆</span>
                </div>
                <p className="text-sm font-bold mb-1">{t.name}</p>
                <p className="text-xs" style={{ color: "#9090a8" }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/how-it-works"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold"
            style={{ background: "#d4a017", color: "#09090e" }}
          >
            How the Platform Works →
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium border"
            style={{ color: "#f5f0e8", borderColor: "rgba(212,160,23,0.3)" }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
