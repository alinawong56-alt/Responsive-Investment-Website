import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../lib/supabase";

type Transaction = {
  id: string;
  type: string;
  amount: number;
  status: string;
  created_at: string;
};

export default function Transactions() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    const { data, error } = await supabase
      .from("transactions")
      .select("id, type, amount, status, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setTransactions(data ?? []);
    }

    setLoading(false);
  }

  function money(value: number) {
    return `$${Number(value ?? 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  function date(value: string) {
    return new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Transactions</h1>
        <p className="mt-2 text-sm" style={{ color: "#9090a8" }}>
          Your account transaction history.
        </p>
      </div>

      <div
        className="border overflow-hidden"
        style={{
          background: "#111118",
          borderColor: "rgba(212,160,23,0.15)",
        }}
      >
        {loading ? (
          <div className="p-8">
            <p style={{ color: "#9090a8" }}>Loading transactions...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="p-8 text-center">
            <p style={{ color: "#9090a8" }}>
              No transactions yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ background: "rgba(255,255,255,0.02)" }}>
                <tr>
                  <th className="text-left p-4">Type</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Date</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-t"
                    style={{
                      borderColor: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <td className="p-4 font-semibold">
                      {transaction.type}
                    </td>

                    <td className="p-4">
                      {money(transaction.amount)}
                    </td>

                    <td className="p-4">
                      {transaction.status}
                    </td>

                    <td className="p-4" style={{ color: "#9090a8" }}>
                      {date(transaction.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
