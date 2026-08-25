export default function Notifications() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Notifications</h1>
        <p className="mt-2 text-sm" style={{ color: "#9090a8" }}>
          Your account notifications and updates.
        </p>
      </div>

      <div
        className="p-8 border"
        style={{
          background: "#111118",
          borderColor: "rgba(212,160,23,0.15)",
        }}
      >
        <p className="text-sm" style={{ color: "#9090a8" }}>
          You have no new notifications.
        </p>
      </div>
    </div>
  );
}
