# Quick Prismic Setup Guide

## 🚀 Quick Start

Your Prismic repository is empty. Follow these steps to get it working:

### 1. Go to Prismic Dashboard

Visit: <https://resiliency.prismic.io/custom-types>

### 2. Import Custom Types

You need to create **8 Custom Types**. For each one:

1. Click **"Create new"**
2. Choose **Single** or **Repeatable** (see table below)
3. Click **"Build mode"** or **"JSON editor"**
4. Copy the JSON from the corresponding file in `types/` folder
5. Save

| Custom Type Name | Type | JSON File |
|-----------------|------|-----------|
| `homepage` | Single | `types/homepage.json` |
| `about` | Single | `types/about.json` |
| `globals` | Single | `types/globals.json` |
| `resources_page` | Single | `types/checklist.json` |
| `person` | Repeatable | `types/person.json` |
| `answer` | Repeatable | `types/answer.json` |
| `qualifier` | Repeatable | `types/question.json` |
| `checklist_item` | Repeatable | `types/checklist_item.json` |

### 3. Create Minimal Content

After creating the types, create these **4 required documents**:

#### A. Homepage

1. Go to Documents → Create → Homepage
2. Fill in ANY text (just to get started):
   - Heading: "Welcome"
   - Time Promise: "5 minutes"
   - Data Security Promise: "Secure"
   - Page Title: "Home"
   - Meta Title: "Resiliency Kit"
   - Meta Description: "Business resilience checklist"
3. **Click "Save" then "Publish"** ✅

#### B. Globals

1. Documents → Create → Globals
2. Fill in:
   - About Button Text: "About"
   - Button CTA: "Get Started"
   - Button CTA Returning Users: "Continue"
   - Footer Content: "© 2025"
   - Form Continue Button: "Continue"
   - Form Skip Button: "Skip"
   - Form Submit Button: "Submit"
   - Help Button Text: "Help"
3. **Save & Publish** ✅

#### C. About

1. Documents → Create → About
2. Fill in:
   - Page Heading: "About"
   - Page Content: "About this tool..."
   - Page Title: "About"
   - Meta Title: "About"
   - Meta Description: "About page"
3. **Save & Publish** ✅

#### D. Resources Page

1. Documents → Create → Resources Page
2. Fill in:
   - Page Headline: "Your Checklist"
   - Intro: "Here are your items"
   - Actions Menu Button Text: "Actions"
3. **Save & Publish** ✅

### 4. Test Your Site

```bash
npm run dev
```

Visit: <http://localhost:3000>

## ⚠️ Common Issues

### "No documents were returned"

- Make sure you clicked **"Publish"** (not just "Save")
- Check Custom Type names match exactly (lowercase, underscores)
- Verify documents are in the correct locale (`en-us`)

### Wrong locale?

Check your Prismic Settings → Translations & Locales. Update `.env` if needed:

```bash
PRISMIC_REPOSITORY_LOCALE="en-us"
```

## 📚 Full Documentation

See `PRISMIC_SETUP.md` for detailed instructions on all fields and optional content.
