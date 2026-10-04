BHAGWATI STORE — LIVE PAYMENT + ORDER SYSTEM

This version connects:
1) Razorpay online checkout (UPI, cards, net banking, wallets, subject to your Razorpay account/eligibility)
2) A Node/Express order backend that creates Razorpay orders and stores order records
3) COD order capture

SETUP:
- Install Node.js 18+.
- Copy .env.example to .env.
- Create/activate your Razorpay account and put your Key ID and Key Secret in .env.
- Run: npm install
- Run: npm start
- Open: http://localhost:3000

SECURITY:
- Never put the Razorpay Key Secret in frontend JavaScript.
- The server verifies Razorpay payment signatures before marking an order paid.
- orders.json is suitable for a starter/demo; for a production store, use a proper database.

LIVE DEPLOYMENT:
Use a Node-compatible host and HTTPS. Set environment variables there instead of uploading .env.
