# Prismic Setup Guide

This guide walks you through setting up Prismic CMS for the Resiliency Kit.

**⏱️ Time required:** 15-20 minutes
**💡 Tip:** Have this guide open while working in Prismic

---

## Overview

You'll be creating **8 custom types** and **4 required documents** in Prismic.

**Why so many?** Currently this project manages both dynamic content (quiz questions, recommendations) and static UI text (button labels, page content) in Prismic. This is more complex than necessary - see `MODERNIZATION_ROADMAP.md` for our simplification plan.

---

## Step 1: Create a Prismic Account & Repository

1. Go to [prismic.io](https://prismic.io) and sign up (free tier is fine)
2. Click **"Create repository"**
3. Choose a repository name (e.g., "resiliency-kit")
   - Use lowercase, hyphens okay, no spaces
   - This becomes your `PRISMIC_REPOSITORY_NAME`
4. Select **"Blank project"** (don't use a template)

---

## Step 2: Get Your API Token

1. In Prismic dashboard, go to **Settings** (gear icon)
2. Click **"API & Security"**
3. Scroll to **"Repository security"**
4. Click **"Generate an Access Token"**
5. Choose **"Permanent Access Token"**
6. Copy the token - you'll need this for `.env.local`

**Save this now!** You'll use it in Step 5.

---

## Step 3: Create Custom Types

Go to **Custom Types** in the left sidebar.

You need to create **8 Custom Types** using the JSON files in the `/types` folder of this project.

### How to Create Each Custom Type:

For **each type in the table below**:

1. Click **"Create new"** in Custom Types
2. Select **Single** or **Repeatable** (see table)
3. Click **"JSON editor"** (top right)
4. Open the corresponding JSON file from `/types` folder
5. Copy the entire JSON content
6. Paste into Prismic's JSON editor
7. Click **"Save"**

### Custom Types to Create:

| # | Type Name | Single/Repeatable | JSON File | Purpose |
|---|-----------|-------------------|-----------|---------|
| 1 | `homepage` | Single | `types/homepage.json` | Homepage content & SEO |
| 2 | `globals` | Single | `types/globals.json` | Button labels, footer, help text |
| 3 | `about` | Single | `types/about.json` | About page content |
| 4 | `resources_page` | Single | `types/checklist.json` | Checklist page layout |
| 5 | `person` | Repeatable | `types/person.json` | Testimonials (optional) |
| 6 | `answer` | Repeatable | `types/answer.json` | Quiz answer options |
| 7 | `qualifier` | Repeatable | `types/question.json` | Quiz questions |
| 8 | `checklist_item` | Repeatable | `types/checklist_item.json` | Business recommendations |

**✅ Once all 8 are created, move to Step 4**

---

## Step 4: Create Required Documents

Now that custom types exist, create actual content.

Go to **Documents** in the left sidebar → Click **"Create new"**

You'll create **4 required documents** (one for each Single type).

---

### Document 1: Homepage

1. Click **"Create new"** → Select **"Homepage"**
2. Fill in these fields (or use your own text):

| Field | Example Text |
|-------|-------------|
| Heading | "Resiliency Checklist" |
| Time Promise | "Takes 5 minutes" |
| Data Security Promise | "Your data stays on your device" |
| Page Title | "Resiliency Kit" |
| Meta Title | "Business Resiliency Checklist" |
| Meta Description | "A quick checklist to help your business prepare" |

3. Click **"Save"**
4. Click **"Publish"** ⚠️ **Must publish, not just save!**

---

### Document 2: Globals

1. **"Create new"** → **"Globals"**
2. Fill in all button/UI text:

| Field | Example Text |
|-------|-------------|
| About Button Text | "About" |
| Button CTA | "Get Started" |
| Button CTA Returning Users | "Continue" |
| Footer Content | "© 2025 Resiliency Kit" |
| Form Continue Button | "Continue" |
| Form Skip Button | "Skip" |
| Form Submit Button | "Submit" |
| Help Button Text | "Help" |

3. **Save & Publish**

💡 **Tip:** Yes, having these simple text strings in a CMS is overkill. We know.

---

### Document 3: About

1. **"Create new"** → **"About"**
2. Fill in:

| Field | Example Text |
|-------|-------------|
| Page Heading | "About This Tool" |
| Page Content | "This tool helps businesses prepare for challenges and build resilience." |
| Page Title | "About" |
| Meta Title | "About - Resiliency Kit" |
| Meta Description | "Learn about the Resiliency Kit" |

3. **Save & Publish**

---

### Document 4: Resources Page

1. **"Create new"** → **"Resources Page"**
2. Fill in minimum required fields:

| Field | Example Text |
|-------|-------------|
| Page Headline | "Your Personalized Checklist" |
| Intro | "Based on your answers, here are your recommendations:" |
| Actions Menu Button Text | "Actions" |

3. **Save & Publish**

**✅ You now have the minimum content to run the site!**

---

### Optional: Add Quiz Content (Later)

To make the quiz actually work, you'll eventually need to create:
- **Answer** documents (quiz options)
- **Qualifier** documents (quiz questions)
- **Checklist Item** documents (recommendations)
- **Person** documents (testimonials - optional)

You can add these later. The site will run without them (just won't have quiz functionality yet).

---

## Step 5: Configure Environment Variables

In your project root, create a file called `.env.local`:

```bash
PRISMIC_REPOSITORY_NAME="your-repo-name"
PRISMIC_API_TOKEN="your-token-from-step-2"
PRISMIC_REPOSITORY_LOCALE="en-us"
```

**Replace:**
- `your-repo-name` - The repository name from Step 1
- `your-token-from-step-2` - The API token from Step 2

**Example:**
```bash
PRISMIC_REPOSITORY_NAME="resiliency-kit"
PRISMIC_API_TOKEN="MC5ab2NkZWYtZ2hpLWpr..."
PRISMIC_REPOSITORY_LOCALE="en-us"
```

---

## Step 6: Test Your Setup

1. Make sure you're in the project directory
2. Install dependencies (if you haven't):
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000

**✅ Success looks like:** Homepage loads with your content

**❌ Errors?** See troubleshooting below

---

## Troubleshooting

### "No documents were returned"

**Most common cause:** Documents not published

1. Go to Prismic → Documents
2. Check each document shows "Published" (green dot)
3. If it says "Draft" → open it and click "Publish"

**Other causes:**
- Wrong `PRISMIC_REPOSITORY_LOCALE` in `.env.local`
- Wrong `PRISMIC_REPOSITORY_NAME` (check for typos)
- API token is invalid or expired

---

### "Failed to fetch API" or "Invalid repository"

1. Check your `.env.local` file exists and has correct values
2. Verify `PRISMIC_REPOSITORY_NAME` matches your Prismic URL
   - If your Prismic is `my-site.prismic.io`, use `my-site`
3. Make sure you used a **Permanent Access Token**, not a temporary one
4. Restart your dev server after changing `.env.local`

---

### Wrong locale errors

1. In Prismic → Settings → Translations & Locales
2. Check what your default locale is (probably `en-us`)
3. Make sure `.env.local` has:
   ```bash
   PRISMIC_REPOSITORY_LOCALE="en-us"
   ```
4. If you're using a different locale, update the value

---

### Site loads but looks broken

1. Check browser console for errors (F12 → Console tab)
2. Make sure all 4 required documents are published:
   - Homepage
   - Globals
   - About
   - Resources Page
3. Check that custom type names match exactly (no typos)

---

## Next Steps

Once your site is running:

1. **Customize content** - Update the text in Prismic to match your needs
2. **Add quiz questions** - Create qualifier/answer documents
3. **Add recommendations** - Create checklist_item documents
4. **Read the main README** - Learn how to customize and deploy

---

## Still Stuck?

1. Check the main [README.md](./README.md) troubleshooting section
2. Verify you completed all steps above
3. Check the [Prismic documentation](https://prismic.io/docs)
4. Review the [MODERNIZATION_ROADMAP.md](./MODERNIZATION_ROADMAP.md) to understand the architecture
