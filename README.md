# Resiliency Kit

A personalized business resiliency checklist built with Next.js 15 and Prismic CMS.

## Overview

This is a quiz-based tool that generates personalized business recommendations. Users answer questions about their business, and get a filtered checklist of action items.

**Tech Stack:**
- Next.js 15.2.2 (Pages Router)
- React 19
- Prismic CMS (REST API)
- CSS Modules

## Quick Start

### Prerequisites

- Node.js 18+ installed
- A Prismic account (free tier works fine)
- 15-20 minutes for initial setup

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd resiliency-kit
npm install
```

### 2. Set Up Prismic CMS

This project requires content from Prismic CMS. You'll need to:

1. **Create a Prismic repository** at [prismic.io](https://prismic.io)
2. **Import 8 custom types** from the `/types` folder
3. **Create 4 required documents** (homepage, globals, about, resources_page)
4. **Get your API token**

**📖 Follow the detailed guide:** [`PRISMIC_SETUP.md`](./PRISMIC_SETUP.md)

⚠️ **Note:** Yes, this setup is more complex than it should be. See `MODERNIZATION_ROADMAP.md` for our plan to simplify this.

### 3. Configure Environment Variables

Create a `.env.local` file in the root:

```bash
PRISMIC_REPOSITORY_NAME="your-repo-name"
PRISMIC_API_TOKEN="your-token-here"
PRISMIC_REPOSITORY_LOCALE="en-us"
```

**Where to find these:**
- `PRISMIC_REPOSITORY_NAME`: The name you chose when creating your Prismic repo (must be URL-friendly)
- `PRISMIC_API_TOKEN`: Settings → API & Security → Generate an Access Token (Permanent)
- `PRISMIC_REPOSITORY_LOCALE`: Your default locale (usually `en-us`)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - you should see your site!

If you see errors, check the troubleshooting section in `PRISMIC_SETUP.md`.

## Project Structure

```
resiliency-kit/
├── pages/              # Next.js pages (index, about, checklist)
├── components/         # React components
├── lib/               # API functions and utilities
│   └── api.js        # Prismic data fetching
├── styles/           # CSS modules
├── types/            # Prismic custom type schemas (JSON)
└── public/           # Static assets
```

## How It Works

1. **Homepage** (`/`) - User starts the quiz
2. **Quiz questions** - Dynamically loaded from Prismic (business type, size, sector, etc.)
3. **Results** (`/checklist`) - Filtered checklist items based on user answers
4. **About page** (`/about`) - Information about the tool

All content is stored in Prismic and fetched via the REST API (`lib/api.js`).

## Understanding the Architecture

### What's Managed in Prismic?

Currently **8 custom types** (see `types/` folder):

**Static Content** (should eventually move to code):
- `globals` - Button labels, footer text, help text
- `homepage` - Page heading, time promise, SEO
- `about` - About page content
- `resources_page` - Checklist page layout text

**Dynamic Content** (makes sense in CMS):
- `checklist_item` - Business recommendations
- `question` (qualifier) - Quiz questions
- `answer` - Answer options
- `person` - Testimonials (optional)

📖 **See `MODERNIZATION_ROADMAP.md`** for our plan to simplify this architecture.

## Customization Guide

### Adding a New Quiz Question

1. **In Prismic:** Create a new `qualifier` document
   - Set question text and description
   - Set `question_identifier` (e.g., "industry")
   - Add answer options (link to `answer` documents)
   - Set display order

2. **If adding a new filter type:**
   - Edit `checklist_item` custom type in Prismic
   - Add a new Group field in the "Filters" tab
   - API ID must match the `question_identifier`
   - Add relationship field pointing to `answer` type with appropriate tag

### Adding Checklist Items

1. Create a new `checklist_item` document in Prismic
2. Fill in title and description
3. Add related resources (links, templates, videos)
4. Set filters:
   - `applies_to_all`: Shows to everyone
   - Or link specific answers this item applies to

### Multi-language Support

Currently configured for `en-us`. To add languages:

1. **In Prismic:** Settings → Translations & Locales → Add language
2. **In code:** Update `next.config.js` i18n configuration
3. **In code:** Update `/lib/localeFormat.js` with new locale format
4. **In Prismic:** Translate all documents to new locale

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Key Files

- `lib/api.js` - All Prismic API calls
- `prismicio.js` - Prismic client configuration
- `pages/index.js` - Homepage with quiz
- `pages/checklist.js` - Results page
- `components/` - Reusable UI components

## Deployment

### Environment Variables

Make sure to set these in your deployment platform:

```bash
PRISMIC_REPOSITORY_NAME="your-repo-name"
PRISMIC_API_TOKEN="your-permanent-access-token"
PRISMIC_REPOSITORY_LOCALE="en-us"
```

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

The site will auto-deploy on every push to main.

## Troubleshooting

### "No documents were returned"
- Ensure all required documents are **Published** in Prismic (not just saved)
- Check environment variables are set correctly
- Verify Prismic repository locale matches `PRISMIC_REPOSITORY_LOCALE`

### "Failed to fetch API"
- Check your `PRISMIC_API_TOKEN` is correct
- Ensure token is a "Permanent Access Token" (not temporary)
- Verify repository name doesn't have special characters

### Build errors after upgrade
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Clear Next.js cache: `rm -rf .next`

## Contributing

This project is currently being modernized. See `MODERNIZATION_ROADMAP.md` for upcoming changes and how you can help.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prismic Documentation](https://prismic.io/docs)
- [Project Modernization Roadmap](./MODERNIZATION_ROADMAP.md)
- [Prismic Setup Guide](./PRISMIC_SETUP.md)

## License

[Add your license here]
