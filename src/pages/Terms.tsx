import { Link } from "react-router";

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: `By registering for or using the Musk Enterprise platform, you agree to be bound by these Terms of Service. If you do not agree, do not access or use the platform. These terms constitute a legally binding agreement between you and Musk Enterprise.`,
  },
  {
    title: "2. Eligibility",
    body: `You must be at least 18 years of age to use this platform. You represent that you have the legal capacity to enter into binding agreements. The platform may not be available in all jurisdictions, and it is your responsibility to ensure that using this platform complies with laws applicable in your location.`,
  },
  {
    title: "3. Account Registration",
    body: `You agree to provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately of any unauthorized access to your account. We reserve the right to suspend or terminate accounts found to be in violation of these terms.`,
  },
  {
    title: "4. Investment Plans",
    body: `Investment plans are offered subject to availability and active status. The stated daily rate is a calculation rate applied by the platform's accounting system. It is not a guaranteed financial return. Investment returns depend on the platform's operations and are subject to the risks described in the Risk Disclosure. The platform reserves the right to modify, suspend, or discontinue any investment plan with notice.`,
  },
  {
    title: "5. Deposits and Withdrawals",
    body: `Deposits are processed through third-party payment providers. The platform does not directly handle payment card data. Withdrawal requests are subject to review and processing by platform administrators. Processing times are not guaranteed. The platform reserves the right to delay, suspend, or refuse withdrawals where there are grounds to believe fraudulent, illegal, or unauthorized activity has occurred.`,
  },
  {
    title: "6. Prohibited Conduct",
    body: `You agree not to: (a) use the platform for any unlawful purpose; (b) attempt to circumvent security controls; (c) submit false or misleading information; (d) engage in any activity that constitutes money laundering or fraud; (e) access another user's account or data without authorization; (f) use automated systems to access the platform without permission.`,
  },
  {
    title: "7. Limitation of Liability",
    body: `To the maximum extent permitted by applicable law, Musk Enterprise and its affiliates, officers, employees, and agents are not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform, including investment losses. Our total liability for any claim arising from these terms shall not exceed the amount you deposited in the 12-month period preceding the claim.`,
  },
  {
    title: "8. Termination",
    body: `We reserve the right to suspend or terminate your account at any time for violation of these terms, suspected fraudulent activity, or any other reason at our discretion with reasonable notice where practicable. Upon termination, any available balance will be made available for withdrawal subject to verification and applicable requirements.`,
  },
  {
    title: "9. Changes to Terms",
    body: `We may update these Terms of Service from time to time. We will notify registered users of material changes. Continued use of the platform after changes are effective constitutes acceptance of the revised terms.`,
  },
  {
    title: "10. Governing Law",
    body: `These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Musk Enterprise is incorporated. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of that jurisdiction.`,
  },
];

export default function Terms() {
  return (
    <div className="fade-up pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#d4a017" }}>Legal</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ letterSpacing: "-0.04em" }}>
            Terms of Service
          </h1>
          <p className="text-sm" style={{ color: "#9090a8" }}>Last updated: January 2025</p>
        </div>

        <div
          className="p-6 mb-10 border-l-2 text-sm"
          style={{ borderColor: "#d4a017", background: "#111118", color: "#9090a8" }}
        >
          Please read these Terms of Service carefully before using the Musk Enterprise platform. These terms govern your access to and use of the platform, including all investment activities conducted through it.
        </div>

        <div className="space-y-10">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-base font-bold mb-3">{s.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#9090a8" }}>{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t flex flex-wrap gap-4" style={{ borderColor: "rgba(212,160,23,0.15)" }}>
          <Link to="/privacy" className="text-sm" style={{ color: "#d4a017" }}>Privacy Policy →</Link>
          <Link to="/risk-disclosure" className="text-sm" style={{ color: "#d4a017" }}>Risk Disclosure →</Link>
          <Link to="/contact" className="text-sm" style={{ color: "#d4a017" }}>Contact →</Link>
        </div>
      </div>
    </div>
  );
}
