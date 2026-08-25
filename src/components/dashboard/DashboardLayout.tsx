import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { supabase } from "../../lib/supabase";

type Profile = {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
};

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("first_name, last_name, email")
      .eq("id", user.id)
      .single();

    setProfile(
      data ?? {
        first_name: user.user_metadata?.first_name ?? "",
        last_name: user.user_metadata?.last_name ?? "",
        email: user.email ?? "",
      }
    );

    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#09090e] text-white">
        Loading your dashboard...
      </div>
    );
  }

  const firstName = profile?.first_name || "User";

  const links = [
    ["Overview", "/dashboard", "⌂"],
    ["Wallet", "/dashboard/wallet", "◈"],
    ["Investment Plans", "/dashboard/plans", "▣"],
    ["My Investments", "/dashboard/investments", "↗"],
    ["Deposit", "/dashboard/deposit", "+"],
    ["Withdraw", "/dashboard/withdraw", "↓"],
    ["Transactions", "/dashboard/transactions", "≡"],
    ["Notifications", "/dashboard/notifications", "♢"],
    ["Profile", "/dashboard/profile", "◎"],
    ["Settings", "/dashboard/settings", "⚙"],
  ];

  return (
    <div className="min-h-screen bg-[#09090e] text-[#f5f0e8]">

      {/* SIDEBAR */}
      <aside
        className="fixed left-0 top-0 bottom-0 hidden lg:flex w-64 flex-col border-r z-40"
        style={{
          background: "#0d0d14",
          borderColor: "rgba(212,160,23,0.15)",
        }}
      >

        {/* LOGO */}
        <div
          className="px-6 py-6 border-b"
          style={{ borderColor: "rgba(212,160,23,0.15)" }}
        >
          <NavLink to="/dashboard" className="flex items-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center font-black"
              style={{
                background: "#d4a017",
                color: "#09090e",
              }}
            >
              ME
            </div>

            <div>
              <div className="font-bold">
                Musk Enterprise
              </div>

              <div
                className="text-[10px] uppercase tracking-widest"
                style={{ color: "#777789" }}
              >
                Member Portal
              </div>
            </div>
          </NavLink>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-3 py-5 overflow-y-auto">

          {links.map(([label, to, icon]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/dashboard"}
              className="flex items-center gap-3 px-4 py-3 mb-1 text-sm"
              style={({ isActive }) => ({
                background: isActive
                  ? "rgba(212,160,23,0.12)"
                  : "transparent",
                color: isActive
                  ? "#d4a017"
                  : "#9090a8",
              })}
            >
              <span className="w-5 text-center">
                {icon}
              </span>

              {label}
            </NavLink>
          ))}

        </nav>

        {/* USER */}
        <div
          className="p-4 border-t"
          style={{
            borderColor: "rgba(212,160,23,0.15)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">

            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold"
              style={{
                background: "rgba(212,160,23,0.15)",
                color: "#d4a017",
              }}
            >
              {firstName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">
                {firstName}
              </p>

              <p
                className="text-xs truncate"
                style={{ color: "#777789" }}
              >
                {profile?.email}
              </p>
            </div>

          </div>

          <button
            onClick={logout}
            className="w-full text-left px-4 py-3 text-sm"
            style={{ color: "#9090a8" }}
          >
            Sign out
          </button>
        </div>

      </aside>

      {/* MAIN */}
      <main className="lg:ml-64 min-h-screen">

        {/* TOP BAR */}
        <header
          className="h-16 px-5 lg:px-8 flex items-center justify-between border-b sticky top-0 z-30"
          style={{
            background: "rgba(9,9,14,0.95)",
            borderColor: "rgba(212,160,23,0.12)",
            backdropFilter: "blur(12px)",
          }}
        >

          <div className="lg:hidden font-bold">
            Musk Enterprise
          </div>

          <div
            className="hidden lg:block text-sm"
            style={{ color: "#777789" }}
          >
            Member Dashboard
          </div>

          <NavLink to="/dashboard/profile">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold"
              style={{
                background: "#d4a017",
                color: "#09090e",
              }}
            >
              {firstName.charAt(0).toUpperCase()}
            </div>
          </NavLink>

        </header>

        {/* PAGE CONTENT */}
        <div className="px-5 py-7 lg:px-8 lg:py-10 max-w-[1600px]">
          <Outlet />
        </div>

      </main>

      {/* MOBILE NAV */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t"
        style={{
          background: "#0d0d14",
          borderColor: "rgba(212,160,23,0.15)",
        }}
      >
        <div className="grid grid-cols-5">

          {[
            ["Home", "/dashboard"],
            ["Wallet", "/dashboard/wallet"],
            ["Plans", "/dashboard/plans"],
            ["Invest", "/dashboard/investments"],
            ["Profile", "/dashboard/profile"],
          ].map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/dashboard"}
              className="flex flex-col items-center py-3 text-[10px]"
              style={({ isActive }) => ({
                color: isActive
                  ? "#d4a017"
                  : "#777789",
              })}
            >
              <span className="text-base">●</span>
              {label}
            </NavLink>
          ))}

        </div>
      </nav>

    </div>
  );
}
