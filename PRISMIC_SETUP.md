# Prismic Setup Guide

Your Prismic repository is empty and needs to be configured with Custom Types and content.

## Step 1: Create Custom Types in Prismic

Go to your Prismic repository: **https://resiliency.prismic.io**

### Navigate to Custom Types
1. Click on **"Custom Types"** in the left sidebar
2. You need to create **8 Custom Types**

### Create Each Custom Type

For each type below, click **"Create new"** and paste the corresponding JSON:

---

#### 1. Homepage (Single Type)
- Name: `homepage`
- Type: **Single**
- JSON: Copy from `types/homepage.json`

---

#### 2. About (Single Type)
- Name: `about`
- Type: **Single**
- JSON: Copy from `types/about.json`

---

#### 3. Globals (Single Type)
- Name: `globals`
- Type: **Single**
- JSON: Copy from `types/globals.json`

---

#### 4. Checklist / Resources Page (Single Type)
- Name: `resources_page`
- Type: **Single**
- JSON: Copy from `types/checklist.json`

---

#### 5. Person (Repeatable Type)
- Name: `person`
- Type: **Repeatable**
- JSON: Copy from `types/person.json`

---

#### 6. Answer (Repeatable Type)
- Name: `answer`
- Type: **Repeatable**
- JSON: Copy from `types/answer.json`

---

#### 7. Qualifier/Question (Repeatable Type)
- Name: `qualifier`
- Type: **Repeatable**
- JSON: Copy from `types/question.json`

---

#### 8. Checklist Item (Repeatable Type)
- Name: `checklist_item`
- Type: **Repeatable**
- JSON: Copy from `types/checklist_item.json`

---

## Step 2: Create Documents

After creating all Custom Types, you need to create actual content:

### Required Single Documents (Must Create One Each)

1. **Homepage**
   - Go to Documents → Create new → Homepage
   - Fill in:
     - Heading: "Resiliency Checklist"
     - Time Promise: "Takes 5 minutes"
     - Data Security Promise: "Your data stays on your device"
     - Page Title: "Resiliency Kit"
     - Meta Title: "Business Resiliency Checklist"
     - Meta Description: "A quick checklist to help your business prepare"
   - **Save & Publish**

2. **Globals**
   - Go to Documents → Create new → Globals
   - Fill in:
     - About Button Text: "About"
     - Button CTA: "Get Started"
     - Button CTA Returning Users: "Continue"
     - Footer Content: "© 2025 Resiliency Kit"
     - Form Continue Button: "Continue"
     - Form Skip Button: "Skip"
     - Form Submit Button: "Submit"
     - Help Button Text: "Help"
   - **Save & Publish**

3. **About**
   - Go to Documents → Create new → About
   - Fill in:
     - Page Heading: "About This Tool"
     - Page Content: "This tool helps businesses prepare for challenges..."
     - Page Title: "About"
     - Meta Title: "About - Resiliency Kit"
     - Meta Description: "Learn about the Resiliency Kit"
   - **Save & Publish**

4. **Resources Page** (Checklist)
   - Go to Documents → Create new → Resources Page
   - Fill in:
     - Page Headline: "Your Personalized Checklist"
     - Intro: "Based on your answers, here's what you should do:"
     - Pre Checklist Content: "Review these action items..."
     - End of Checklist Content: "You've completed the checklist!"
     - Actions Menu Button Text: "Actions"
   - **Save & Publish**

### Optional: Add Sample Content

You can add sample **Person**, **Answer**, **Qualifier**, and **Checklist Item** documents later as needed.

---

## Step 3: Verify Setup

After creating the documents, restart your dev server:

```bash
npm run dev
```

Your site should now load at http://localhost:3000

---

## Troubleshooting

### If you still get "No documents were returned":
1. Make sure all documents are **Published** (not just saved as drafts)
2. Check that Custom Type names match exactly (lowercase, underscores)
3. Verify your API token has access to the documents

### Check your locale settings:
Your repository is configured for `en-us`. If your Prismic repository uses a different locale:
1. Go to Settings → Translations & Locales in Prismic
2. Update `.env` with the correct `PRISMIC_REPOSITORY_LOCALE`
