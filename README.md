# DonationsApp

A lightweight, self-hosted donation page for creators. Accept one-time or monthly contributions via Paystack, with donor records stored in Airtable. Deploy as a standalone site or embed anywhere with a single iframe.

## Tech Stack

- **Framework:** SvelteKit 2 + Svelte 5 (runes)
- **Styling:** TailwindCSS v4 + shadcn-svelte
- **Payments:** Paystack (NGN, GHS, ZAR, USD, KES)
- **Database:** Airtable
- **Forms:** Superforms + Zod
- **Deployment:** Vercel (adapters for Cloudflare, Netlify available)

## Features

- Preset and custom donation amounts
- One-time and monthly donation options
- Paystack secure payment popup
- Donor wall with real-time Airtable data
- Embeddable via iframe (`?embed=1`)
- Creator profile card with social links
- Fundraising goal tracker
- PDF receipt generation

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/)
- [Paystack](https://paystack.com) API keys (test or live)
- [Airtable](https://airtable.com) account with a base

### 1. Clone and install

```bash
git clone <repository-url>
cd DonationsApp-v2
pnpm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env` and fill in your keys:

```bash
cp .env.example .env
```

Required:

```env
# Paystack (keep the secret key server-only)
PAYSTACK_SECRET_KEY=sk_test_xxxxx

# Airtable (keep the token server-only)
AIRTABLE_TOKEN=pat_xxxxx
AIRTABLE_BASE_ID=app_xxxxx
AIRTABLE_TABLE_NAME=Donors
```

Optional (branding):

```env
VITE_CREATOR_NAME="Your Name"
VITE_CREATOR_TAGLINE="Building cool things"
VITE_CREATOR_BIO="Independent maker shipping tools."
VITE_CREATOR_TWITTER="https://twitter.com/you"
VITE_CREATOR_GITHUB="https://github.com/you"
VITE_CREATOR_WEBSITE="https://yoursite.com"
VITE_GOAL_AMOUNT=100000
VITE_GOAL_LABEL="Support the creator"
```

### 3. Run development server

```bash
pnpm dev
```

Open [http://localhost:5173/donationspage](http://localhost:5173/donationspage).

## Airtable Setup

Create a table named `Donors` (or set `AIRTABLE_TABLE_NAME` to your exact existing table name) with these fields:

| Field       | Type   |
| ----------- | ------ |
| Name        | Text   |
| Email       | Email  |
| Amount      | Number |
| Frequency   | Select (`one-time`) / (`monthly`) |
| Message     | Text   |
| Reference   | Text   |
| Date        | Date   |
| Status      | Select (`verified`) / (`pending`)|

## Pages

| Route            | Description                          |
| ---------------- | ------------------------------------ |
| `/donationspage` | Main donation form with creator card |
| `/donationslist` | Wall of supporters with stats        |
| `/about`         | How it works, embed snippet, setup   |

## Embedding

Append `?embed=1` to any page URL to strip the header and show just the content:

```html
<iframe
  src="https://your-domain.vercel.app/donationspage?embed=1"
  title="Donate"
  style="border:0;width:100%;max-width:640px;height:820px;"
  loading="lazy"
></iframe>
```

## Deploy

### Vercel (recommended)

```bash
pnpm build
```

Or push to GitHub and connect the repo to [Vercel](https://vercel.com). The `@sveltejs/adapter-vercel` is pre-configured.

### Other platforms

The project includes adapters for Cloudflare and Netlify. See the [SvelteKit deployment docs](https://svelte.dev/docs/kit/adapters) for details.

## Project Structure

```
src/
  routes/
    donationspage/        # Main donation page
      +page.svelte        # Page layout
      +page.server.ts     # Server-side data + form handling
      donation-form.svelte # Donation form component
      schema.ts           # Zod validation schema
    donationslist/        # Donor wall
      +page.svelte
      +page.server.ts
    about/                # About/setup page
      +page.svelte
  lib/
    components/
      ui/                 # shadcn-svelte components
     ...other-components.svelte
    utils/
      receipt.ts          # PDF receipt generation
  app.css                 # Design system tokens
```

## Contributing

Contributions are welcome. Open an issue or submit a pull request.

## License

MIT
