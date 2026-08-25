import { useState } from "react";
import { Link } from "react-router";

const faqs = [
  {
    category: "Getting Started",
    items: [
      {
        q: "What is Musk Enterprise?",
        a: "Musk Enterprise is a structured investment platform that allows registered users to allocate capital to defined investment plans. The platform manages accrual tracking, wallet balances, and transaction history through a secure online dashboard.",
      },
      {
        q: "What is the minimum investment amount?",
        a: "The minimum investment amount is $1,000. This applies to the Foundation plan. Higher tiers have higher minimums — see the Investment Plans page for full details.",
      },
      {
        q: "Do I need to verify my identity to register?",
        a: "Identity verification requirements depend on applicable regulations and your selected investment tier. You will be informed of any verification requirements during the registration process.",
      },
    ],
  },
  {
    category: "Investment Plans",
    items: [
      {
        q: "What is the stated daily rate?",
        a: "The platform's current stated daily rate is 2.0%. This rate is applied to your invested principal by the platform's server-side accrual system. It is a calculated rate — not a guaranteed financial return.",
      },
      {
        q: "Are investment returns guaranteed?",
        a: "No. Investment returns are not guaranteed. The stated daily rate is a calculation rate applied by the platform's accounting system. All investment activity carries risk, including the risk of capital loss. Read the Risk Disclosure before investing.",
      },
      {
        q: "What happens when an investment matures?",
        a: "When an investment reaches its maturity date, daily accrual stops and the investment is marked as MATURED. No further returns are generated after maturity. The principal is handled according to the platform's maturity rules, which are applied server-side.",
      },
      {
        q: "Can I have multiple active investments?",
        a: "Yes, depending on your plan tier. Growth, Apex, and Sovereign plans support multiple concurrent active investments. Foundation plan users may have restrictions — check your plan terms.",
      },
    ],
  },
  {
    category: "Deposits & Withdrawals",
    items: [
      {
        q: "How do I deposit funds?",
        a: "From your dashboard, select a deposit amount and you will be redirected to our payment provider's secure checkout. Payment is processed by the provider, confirmed via a server-side webhook, and credited to your wallet upon verification. Never submit a payment reference manually.",
      },
      {
        q: "How long do deposits take?",
        a: "Once your payment is confirmed by the payment provider and the webhook is received and verified by our system, your wallet is credited. Processing times depend on the payment method and provider — typically between a few minutes and one business day.",
      },
      {
        q: "How do withdrawals work?",
        a: "Submit a withdrawal request from your dashboard with your destination details. The amount is reserved immediately from your available balance. Requests are reviewed by administrators and processed through our payout provider. Withdrawals are only marked complete upon verified payout confirmation.",
      },
      {
        q: "Is there a minimum withdrawal amount?",
        a: "Yes. A minimum withdrawal threshold applies. You will see the current minimum during the withdrawal process in your dashboard.",
      },
    ],
  },
  {
    category: "Security",
    items: [
      {
        q: "How is my data protected?",
        a: "User authentication is managed through Supabase Authentication. Passwords are never stored in plain text. Row-level security policies ensure you can only access your own data. All sensitive keys are stored server-side and never exposed to the browser.",
      },
      {
        q: "Can another user see my wallet or investment data?",
        a: "No. Database-level row security policies prevent any user from accessing another user's wallet, investments, transactions, or personal information.",
      },
      {
        q: "How do you prevent duplicate payments or double profit accrual?",
        a: "Deposit webhooks include idempotency checks — a payment reference that has already been processed cannot be processed again. Profit accrual tracks the last accrual date per investment, so the same calendar day cannot be credited twice, even if the accrual process runs multiple times.",
      },
    ],
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "rgba(212,160,23,0.1)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-semibold" style={{ color: open ? "#f5f0e8" : "#c8c8d8" }}>{q}</span>
        <span
          className="flex-shrink-0 text-lg transition-transform duration-200"
          style={{ color: "#d4a017", transform: open ? "rotate(45deg)" : "none" }}
        >
          +
        </span>
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-sm leading-relaxed" style={{ color: "#9090a8" }}>{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="fade-up pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#d4a017" }}>FAQ</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6" style={{ letterSpacing: "-0.04em" }}>
            Frequently asked<br />questions.
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "#9090a8" }}>
            Answers to common questions about the platform, investment plans, deposits, withdrawals, and security.
          </p>
        </div>

        <div className="space-y-12">
          {faqs.map((section, si) => (
            <div key={si}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#d4a017" }}>
                {section.category}
              </p>
              <div className="border-t" style={{ borderColor: "rgba(212,160,23,0.15)" }}>
                {section.items.map((item, ii) => (
                  <Item key={ii} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 border" style={{ background: "#111118", borderColor: "rgba(212,160,23,0.15)" }}>
          <p className="text-sm font-semibold mb-2">Have a question not answered here?</p>
          <p className="text-sm mb-4" style={{ color: "#9090a8" }}>Contact our support team or open a support ticket from your dashboard once registered.</p>
          <Link
            to="/contact"
            className="inline-flex items-center text-sm font-semibold"
            style={{ color: "#d4a017" }}
          >
            Contact Support →
          </Link>
        </div>
      </div>
    </div>
  );
}
