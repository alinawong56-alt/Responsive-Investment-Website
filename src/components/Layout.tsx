import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router";

const navLinks = [
  { to: "/plans", label: "Investment Plans" },
  { to: "/about", label: "About" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#09090e", color: "#f5f0e8" }}>
      {/* Nav */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(9,9,14,0.96)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(212,160,23,0.12)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{ background: "#d4a017" }}
            >
              <span className="text-xs font-black tracking-tight" style={{ color: "#09090e", fontFamily: "'Hanken Grotesk', sans-serif" }}>ME</span>
            </div>
            <span className="text-base font-bold tracking-tight hidden sm:block" style={{ letterSpacing: "-0.02em" }}>
              Musk Enterprise
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-medium transition-colors duration-150"
                style={{
                  color: location.pathname === l.to ? "#d4a017" : "#9090a8",
                }}
                onMouseEnter={(e) => { if (location.pathname !== l.to) (e.target as HTMLAnchorElement).style.color = "#f5f0e8"; }}
                onMouseLeave={(e) => { if (location.pathname !== l.to) (e.target as HTMLAnchorElement).style.color = "#9090a8"; }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium px-5 py-2 transition-colors duration-150"
              style={{ color: "#9090a8" }}
              onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = "#f5f0e8"; }}
              onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = "#9090a8"; }}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-sm font-semibold px-5 py-2 transition-all duration-150"
              style={{
                background: "#d4a017",
                color: "#09090e",
              }}
              onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.background = "#e8b830"; }}
              onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.background = "#d4a017"; }}
            >
              Open Account
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span
                className="block h-px transition-all duration-200"
                style={{
                  background: "#d4a017",
                  transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
                }}
              />
              <span
                className="block h-px transition-all duration-200"
                style={{
                  background: "#d4a017",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block h-px transition-all duration-200"
                style={{
                  background: "#d4a017",
                  transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
                }}
              />
            </div>
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="lg:hidden px-6 pb-6 flex flex-col gap-1"
            style={{ background: "rgba(9,9,14,0.98)", borderTop: "1px solid rgba(212,160,23,0.1)" }}
          >
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="py-3 text-sm font-medium border-b"
                style={{
                  color: location.pathname === l.to ? "#d4a017" : "#9090a8",
                  borderColor: "rgba(212,160,23,0.08)",
                }}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-3 mt-4">
              <Link
                to="/login"
                className="flex-1 text-center text-sm font-medium py-2.5 border"
                style={{ color: "#f5f0e8", borderColor: "rgba(212,160,23,0.3)" }}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="flex-1 text-center text-sm font-semibold py-2.5"
                style={{ background: "#d4a017", color: "#09090e" }}
              >
                Open Account
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{ background: "#111118", borderTop: "1px solid rgba(212,160,23,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center" style={{ background: "#d4a017" }}>
                  <span className="text-xs font-black" style={{ color: "#09090e" }}>ME</span>
                </div>
                <span className="font-bold text-sm tracking-tight">Musk Enterprise</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#9090a8" }}>
                A structured investment platform for discerning capital allocators. All investments carry risk. Past performance does not indicate future results.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#d4a017" }}>Platform</p>
              <div className="flex flex-col gap-2">
                {[["Investment Plans", "/plans"], ["How It Works", "/how-it-works"], ["About", "/about"], ["FAQ", "/faq"]].map(([label, to]) => (
                  <Link key={to} to={to} className="text-sm transition-colors" style={{ color: "#9090a8" }}
                    onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = "#f5f0e8"; }}
                    onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = "#9090a8"; }}
                  >{label}</Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#d4a017" }}>Account</p>
              <div className="flex flex-col gap-2">
                {[["Sign In", "/login"], ["Create Account", "/register"], ["Contact Us", "/contact"]].map(([label, to]) => (
                  <Link key={to} to={to} className="text-sm transition-colors" style={{ color: "#9090a8" }}
                    onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = "#f5f0e8"; }}
                    onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = "#9090a8"; }}
                  >{label}</Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#d4a017" }}>Legal</p>
              <div className="flex flex-col gap-2">
                {[["Terms of Service", "/terms"], ["Privacy Policy", "/privacy"], ["Risk Disclosure", "/risk-disclosure"]].map(([label, to]) => (
                  <Link key={to} to={to} className="text-sm transition-colors" style={{ color: "#9090a8" }}
                    onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = "#f5f0e8"; }}
                    onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = "#9090a8"; }}
                  >{label}</Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(212,160,23,0.08)" }}>
            <p className="text-xs" style={{ color: "#9090a8" }}>
              © {new Date().getFullYear()} Musk Enterprise. All rights reserved.
            </p>
            <p className="text-xs" style={{ color: "#9090a8" }}>
              Investment products involve risk. Not FDIC insured. May lose value.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
