import { useState, FormEvent } from "react";
import { Link } from "react-router";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("Authentication backend not yet connected. Please configure Supabase to enable login.");
    setLoading(false);
  }

  function handleReset(e: FormEvent) {
    e.preventDefault();
    setResetSent(true);
  }

  const inputStyle = {
    background: "rgba(255,255,255,0.03)",
    color: "#f5f0e8",
    border: "1px solid rgba(212,160,23,0.2)",
    outline: "none",
    width: "100%",
    padding: "0.875rem 1rem",
    fontSize: "0.875rem",
    fontFamily: "'Hanken Grotesk', sans-serif",
  } as const;

  return (
    <div className="fade-up min-h-screen flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 flex items-center justify-center" style={{ background: "#d4a017" }}>
              <span className="text-sm font-black" style={{ color: "#09090e" }}>ME</span>
            </div>
            <span className="font-bold text-lg tracking-tight">Musk Enterprise</span>
          </Link>
          <h1 className="text-2xl font-black tracking-tight" style={{ letterSpacing: "-0.03em" }}>
            {showReset ? "Reset password" : "Sign in to your account"}
          </h1>
        </div>

        <div className="p-8 border" style={{ background: "#111118", borderColor: "rgba(212,160,23,0.2)" }}>
          {showReset ? (
            resetSent ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.3)" }}>
                  <span style={{ color: "#d4a017" }}>◆</span>
                </div>
                <p className="text-sm font-semibold mb-2">Check your email</p>
                <p className="text-sm" style={{ color: "#9090a8" }}>If an account exists for {resetEmail}, a password reset link has been sent.</p>
                <button onClick={() => { setShowReset(false); setResetSent(false); }} className="mt-6 text-sm" style={{ color: "#d4a017" }}>
                  Back to sign in
                </button>
              </div>
            ) : (
              <form onSubmit={handleReset} className="space-y-5">
                <p className="text-sm mb-4" style={{ color: "#9090a8" }}>Enter your email address and we'll send a reset link if an account exists.</p>
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: "#9090a8" }}>Email Address</label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    style={inputStyle}
                    placeholder="you@example.com"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 text-sm font-bold"
                  style={{ background: "#d4a017", color: "#09090e" }}
                >
                  Send Reset Link
                </button>
                <button type="button" onClick={() => setShowReset(false)} className="w-full text-sm" style={{ color: "#9090a8" }}>
                  Back to sign in
                </button>
              </form>
            )
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="px-4 py-3 text-xs border" style={{ background: "rgba(212,160,23,0.06)", borderColor: "rgba(212,160,23,0.2)", color: "#d4a017" }}>
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#9090a8" }}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold" style={{ color: "#9090a8" }}>Password</label>
                  <button
                    type="button"
                    onClick={() => setShowReset(true)}
                    className="text-xs transition-colors"
                    style={{ color: "#d4a017" }}
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-sm font-bold tracking-wide transition-all"
                style={{
                  background: loading ? "#a07c10" : "#d4a017",
                  color: "#09090e",
                  cursor: loading ? "wait" : "pointer",
                  marginTop: "0.5rem",
                }}
              >
                {loading ? "Signing in…" : "Sign In"}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-sm mt-6" style={{ color: "#9090a8" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#d4a017", fontWeight: 600 }}>
            Create one →
          </Link>
        </p>

        <p className="text-center text-xs mt-8" style={{ color: "#9090a8" }}>
          By signing in, you agree to our{" "}
          <Link to="/terms" style={{ color: "#d4a017" }}>Terms of Service</Link>
          {" "}and{" "}
          <Link to="/privacy" style={{ color: "#d4a017" }}>Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
