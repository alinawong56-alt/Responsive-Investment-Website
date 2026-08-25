Build a complete production-ready web application called "Musk Enterprise".

IMPORTANT:
This must be a REAL functional application, NOT a demo, prototype, mockup, fake dashboard, fake accounts, placeholder authentication, simulated payments, or hardcoded balances.

Use:
• Next.js / React
• TypeScript
• Supabase
• PostgreSQL
• Supabase Authentication
• Supabase server-side functions/API routes where required
• Secure environment secrets
• Responsive modern UI

CONNECT THE APP TO MY SUPABASE PROJECT AND USE REAL POSTGRESQL DATA.

==================================================
1. PUBLIC WEBSITE
==================================================

Create a professional financial/investment website for Musk Enterprise.

Pages:

• Home
• Investment Plans
• About
• How It Works
• FAQ
• Contact
• Login
• Register
• Terms
• Privacy
• Risk Disclosure

Design:
• Professional
• Modern
• Premium
• Clean
• Mobile responsive
• Dark navy/black/white visual style
• Clear typography
• No excessive animations
• No fake statistics
• No fake testimonials
• No fake user activity
• No cryptocurrency-style hype

Do not use placeholder text where real application functionality is required.

==================================================
2. REAL USER AUTHENTICATION
==================================================

Use Supabase Authentication.

Users must be able to:

• Register
• Login
• Logout
• Reset password
• Change password
• View their profile

Store user profile information in PostgreSQL.

Never store plain-text passwords.

Protect authenticated dashboard routes.

==================================================
3. DATABASE
==================================================

Create a proper PostgreSQL database structure in Supabase.

Create tables for:

users/profiles
wallets
investment_plans
investments
transactions
deposits
withdrawals
notifications
support_tickets
admin_users
audit_logs

Use UUID primary keys.

Create proper foreign keys.

Create indexes where needed.

Enable Row Level Security.

Users must only be able to access their own:

• wallet
• investments
• deposits
• withdrawals
• transactions
• notifications
• support tickets
• profile

Administrators can access the appropriate administrative records.

Do not expose service-role credentials to the browser.

==================================================
4. WALLET
==================================================

Every registered user must have a wallet.

Wallet fields:

• available_balance
• invested_balance
• total_profit
• created_at
• updated_at

The wallet must use REAL database values.

Never hardcode wallet balances.

Every balance-changing operation must create an appropriate transaction record.

Use server-side/database transactions to prevent double spending and race conditions.

==================================================
5. INVESTMENT PLANS
==================================================

Create an investment-plan system controlled from the admin dashboard.

Each plan should contain:

• name
• description
• minimum_amount
• maximum_amount
• daily_rate
• duration_days
• status
• created_at
• updated_at

Default minimum investment:

$1,000

Default configured daily rate:

2%

The rate and duration must be stored in PostgreSQL rather than hardcoded throughout the frontend.

==================================================
6. INVESTMENT CREATION
==================================================

Authenticated users can create an investment when they have sufficient available balance.

When an investment is created:

1. Verify the authenticated user.
2. Verify the investment plan is active.
3. Verify the amount is at least $1,000.
4. Verify the user has sufficient available balance.
5. Atomically subtract the investment amount from available_balance.
6. Add the amount to invested_balance.
7. Create the investment record.
8. Create an INVESTMENT transaction.
9. Set the investment start date.
10. Calculate the maturity date from the selected plan duration.

Never perform these balance changes only in client-side JavaScript.

==================================================
7. DAILY RETURN CALCULATION
==================================================

The configured example is:

Investment = $1,000
Daily rate = 2%

Daily profit:

$1,000 × 0.02 = $20 per day

The application must calculate the daily return from the actual investment principal and stored daily rate.

For every investment display:

• Principal
• Daily rate
• Daily profit
• Accrued profit
• Start date
• Maturity date
• Days elapsed
• Days remaining
• Current investment value
• Status

Do NOT simply fake a continuously increasing number in the browser.

The authoritative calculation must come from server-side/database logic.

The dashboard should show the user's accrued profit and wallet balances using real database values.

==================================================
8. PROFIT ACCRUAL
==================================================

Implement a reliable server-side profit-accrual mechanism.

It must:

• Find active investments
• Determine how many eligible days have passed since the last accrual
• Calculate the applicable daily profit
• Prevent the same day from being credited twice
• Update accrued_profit
• Update wallet total_profit
• Credit the appropriate wallet balance according to the platform's accounting rules
• Create a PROFIT transaction
• Update last_accrual_date

The calculation must be idempotent.

If the process runs twice, it must NOT pay the same daily return twice.

Do not depend on a browser tab remaining open for profit calculations.

Use Supabase server-side functionality/cron-compatible infrastructure where available.

==================================================
9. MATURITY
==================================================

When an investment reaches its maturity date:

• Stop daily accrual
• Mark the investment as MATURED
• Prevent additional profit after maturity
• Process the principal according to the platform's defined maturity rules
• Record the event in transactions
• Update wallet balances atomically

Do not allow an investment to continue generating returns after maturity.

==================================================
10. DEPOSITS
==================================================

Implement REAL payment integration.

Do NOT create fake payment success.

The deposit flow must:

1. User selects deposit amount.
2. User is sent to the configured legitimate payment provider checkout.
3. Payment provider processes the payment.
4. Provider sends a webhook to the backend.
5. Backend verifies the webhook signature.
6. Backend verifies the payment with the provider where applicable.
7. Backend checks the payment reference has not already been processed.
8. Deposit is marked CONFIRMED.
9. User wallet is credited exactly once.
10. A DEPOSIT transaction is created.
11. User receives a notification.

Never trust a client-side "payment successful" message.

Never allow users to manually submit a payment reference and automatically receive money.

Keep payment provider secret keys server-side.

Create environment variables for:

PAYMENT_PROVIDER
PAYMENT_SECRET_KEY
PAYMENT_WEBHOOK_SECRET
NEXT_PUBLIC_APP_URL

Do not expose secret keys in frontend code.

==================================================
11. WITHDRAWALS
==================================================

Create a real withdrawal system.

Users can submit:

• amount
• destination
• currency

Before accepting a withdrawal:

• Verify authentication.
• Verify available balance.
• Verify minimum withdrawal amount.
• Prevent negative balances.
• Reserve/deduct the amount atomically.
• Create a withdrawal record.
• Create a WITHDRAWAL transaction.
• Mark the request PENDING.

Administrators can then process withdrawals from the admin dashboard.

Do not automatically mark withdrawals as completed unless a real payout provider confirms them.

==================================================
12. TRANSACTION HISTORY
==================================================

Create a complete transaction page.

Show:

• Date
• Type
• Amount
• Currency
• Status
• Reference
• Description

Transaction types:

DEPOSIT
WITHDRAWAL
INVESTMENT
PROFIT
MATURITY
REFUND
FEE

Use real database records.

==================================================
13. USER DASHBOARD
==================================================

Create a professional authenticated dashboard.

Show:

Available Balance
Invested Balance
Total Profit
Active Investments

Show investment cards containing:

• Investment amount
• Daily return
• Accrued profit
• Start date
• Maturity date
• Days remaining
• Status

Show recent transactions.

Show deposit button.

Show withdrawal button.

Show investment button.

Show notifications.

Show account settings.

All displayed values must come from the database.

==================================================
14. ADMIN DASHBOARD
==================================================

Create a protected admin dashboard.

Admin sections:

• Overview
• Users
• Investment Plans
• Investments
• Deposits
• Withdrawals
• Transactions
• Support Tickets
• Notifications
• Audit Logs
• Settings

Admin overview should show REAL database totals:

• Registered users
• Total deposits
• Total invested
• Total profits credited
• Pending deposits
• Pending withdrawals
• Active investments

Admin must be able to:

• View users
• Suspend/activate accounts
• View user wallets
• View investments
• Create/edit/deactivate investment plans
• Review deposits
• Review withdrawals
• Process withdrawals
• View transactions
• Respond to support tickets

Every important admin action must create an audit log.

==================================================
15. SECURITY
==================================================

Implement:

• Supabase authentication
• Row Level Security
• Server-side authorization
• Admin role protection
• Secure cookies/session handling
• Input validation
• Server-side amount validation
• Server-side investment validation
• Webhook signature verification
• Idempotency for payments
• Idempotency for profit accrual
• Database transactions for wallet changes
• Rate limiting where appropriate

Never expose:

• Supabase service-role key
• Payment secret key
• Webhook secret
• Database password

Never put secrets in NEXT_PUBLIC_* variables.

==================================================
16. LEGAL/TRANSPARENCY
==================================================

Do not claim guaranteed profits.

Clearly display that investment returns involve risk.

Show the configured 2% daily rate as the platform's stated calculation/rate, not as a guaranteed financial outcome.

Do not fabricate regulatory licenses, company registrations, customer numbers, testimonials, payment volume, or investment results.

Do not create fake testimonials.

Do not create fake users.

Do not create fake transactions.

Do not bypass legally required payment-provider or regulatory verification.

Do not add unnecessary KYC screens, but if the selected payment provider or applicable law requires verification, implement the provider's required flow rather than attempting to bypass it.

==================================================
17. UI
==================================================

Make the interface look like a real professional financial platform.

Desktop:

• Sidebar dashboard navigation
• Top navigation/header
• Cards
• Tables
• Charts only where useful
• Responsive layouts

Mobile:

• Bottom navigation or mobile sidebar
• Responsive cards
• Responsive transaction tables
• Easy deposit/withdrawal controls

Use consistent components.

Use accessible forms.

Show loading states.

Show success/error states.

Show empty states.

Never show fake loading screens.

==================================================
18. ERROR HANDLING
==================================================

Handle:

• Failed login
• Invalid credentials
• Duplicate registration
• Insufficient balance
• Invalid investment amount
• Inactive investment plan
• Failed deposit
• Pending payment
• Failed webhook
• Duplicate webhook
• Failed withdrawal
• Expired session
• Unauthorized admin access
• Database errors

Show useful user-friendly error messages.

Log technical errors securely on the server.

==================================================
19. PRODUCTION REQUIREMENT
==================================================

This must be a functional application.

Do NOT generate:

• Demo accounts
• Fake login credentials
• Mock payments
• Fake wallet balances
• Fake transactions
• Fake API responses
• Hardcoded investment balances
• Fake admin statistics
• Simulated payment success
• Placeholder backend functions

If a required external service cannot be connected automatically, STOP and clearly identify the exact connection/secret that must be configured rather than replacing it with fake functionality.

Use Supabase for the real PostgreSQL backend.

Create the required SQL schema, relationships, indexes, RLS policies, database functions and server-side logic needed by the application.

After generating the application, verify that:

1. Registration works.
2. Login works.
3. Database connection works.
4. User profile is stored.
5. Wallet is created.
6. Investment plans load from PostgreSQL.
7. Investment creation uses real wallet balances.
8. Profit calculations use the stored principal and daily rate.
9. Profit cannot be credited twice for the same day.
10. Deposits use the real payment provider webhook.
11. Transactions are recorded.
12. Admin authorization works.
13. Admin dashboard uses real database data.
14. Users cannot access another user's data.
15. Secrets are not exposed to the browser.

Build the application around real data and real backend functionality from the beginning.