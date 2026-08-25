import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../lib/supabase";

type ProfileData = {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
};

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("first_name, last_name, email")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error(error);
      setProfile({
        first_name: user.user_metadata?.first_name ?? "",
        last_name: user.user_metadata?.last_name ?? "",
        email: user.email ?? "",
      });
    } else {
      setProfile(data);
    }

    setLoading(false);
  }

  if (loading) {
    return <p style={{ color: "#9090a8" }}>Loading profile...</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Profile</h1>
        <p className="mt-2 text-sm" style={{ color: "#9090a8" }}>
          View your account information.
        </p>
      </div>

      <div
        className="max-w-2xl p-8 border"
        style={{
          background: "#111118",
          borderColor: "rgba(212,160,23,0.15)",
        }}
      >
        <div className="space-y-6">
          <div>
            <p className="text-xs" style={{ color: "#9090a8" }}>
              First Name
            </p>
            <p className="mt-2 font-semibold">
              {profile?.first_name || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-xs" style={{ color: "#9090a8" }}>
              Last Name
            </p>
            <p className="mt-2 font-semibold">
              {profile?.last_name || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-xs" style={{ color: "#9090a8" }}>
              Email
            </p>
            <p className="mt-2 font-semibold">
              {profile?.email || "Not available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
