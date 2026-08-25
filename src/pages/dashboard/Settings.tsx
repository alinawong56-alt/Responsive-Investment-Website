export default function Settings() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Settings</h1>
        <p className="mt-2 text-sm" style={{ color: "#9090a8" }}>
          Manage your account settings.
        </p>
      </div>

      <div
        className="max-w-2xl p-8 border"
        style={{
          background: "#111118",
          borderColor: "rgba(212,160,23,0.15)",
        }}
      >
        <h2 className="text-xl font-bold">Account Settings</h2>
        <p className="mt-3 text-sm" style={{ color: "#9090a8" }}>
          Your account settings will appear here.
        </p>
      </div>
    </div>
  );
}
