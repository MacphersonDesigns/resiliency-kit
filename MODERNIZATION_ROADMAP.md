# Modernization Roadmap

This document outlines a plan to simplify the Resiliency Kit architecture by reducing Prismic complexity and adopting modern Next.js patterns.

## Current Problems

### 1. Over-reliance on Prismic for Static Content
Currently using 8 Prismic custom types, but only 4 contain truly dynamic content:

**Actually Dynamic (Keep in CMS):**
- `checklist_item` - Business recommendations (filtered by user quiz answers)
- `question` (qualifier) - Quiz questions
- `answer` - Answer options for quiz questions
- `person` - Testimonial profiles (optional - could be removed)

**Just Static UI Text (Should be in code):**
- `globals` - Button labels ("Continue", "Submit", "Skip"), footer text, help text
- `homepage` - Page heading, time promise, SEO metadata
- `about` - About page content
- `resources_page` (checklist) - Page layout text and labels

### 2. Pages Router vs App Router
Built with Next.js Pages Router (older pattern), but Next.js 15 uses App Router with improved:
- Server Components by default
- Better data fetching patterns
- Simplified routing
- Improved performance

### 3. Complex Setup Process
New developers need to:
1. Create a Prismic account
2. Set up 8 custom types
3. Create and publish 4+ required documents
4. Configure environment variables
5. Hope everything matches exactly

Even simple text like "Continue" button requires Prismic CMS management.

## Modernization Goals

1. **Reduce CMS complexity** - Only use Prismic for truly dynamic, user-facing content
2. **Move to App Router** - Adopt modern Next.js patterns
3. **Improve developer experience** - Simpler setup, fewer external dependencies
4. **Better content management** - Clear separation: code for UI, CMS for content
5. **Maintain functionality** - Keep all existing features working

## Phased Migration Plan

### Phase 1: Move Static Content to Code (Quick Win)

**Goal:** Eliminate `globals`, `homepage`, `about`, and `resources_page` custom types

**Steps:**
1. Create i18n/localization files for all static text
2. Update components to read from config files instead of Prismic
3. Move SEO metadata to Next.js metadata API
4. Test thoroughly to ensure no broken functionality

**Benefits:**
- Reduce Prismic custom types from 8 → 4
- Faster local development (no API calls for static content)
- Easier setup for new developers
- Version control for UI text changes

**Estimated Effort:** 1-2 days

---

### Phase 2: Migrate to App Router (Medium Complexity)

**Goal:** Modernize to Next.js 15 App Router patterns

**Steps:**
1. Create new `app/` directory structure
2. Convert pages to route groups and layouts
3. Update data fetching to use Server Components
4. Migrate API routes if needed
5. Update navigation and linking
6. Test all routes and functionality

**Benefits:**
- Better performance with React Server Components
- Improved SEO with streaming SSR
- Simplified data fetching patterns
- Future-proof architecture

**Estimated Effort:** 2-3 days

---

### Phase 3: Simplify Content Model (Optional)

**Goal:** Further streamline what stays in Prismic

**Questions to answer:**
- Do you need the `person` testimonials, or can they be static?
- Could questions/answers be in code for simpler setup?
- Is multi-language support actually needed?

**Options:**
- **Keep Prismic for checklist items only** - Questions become static
- **Remove Prismic entirely** - All content in JSON/MDX files
- **Keep current model** - Just the 4 dynamic types

**Estimated Effort:** Varies based on approach (1-5 days)

---

## Recommended Content Architecture

### Option A: Minimal Prismic (Recommended)

```
Code (version controlled):
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Global layout
│   ├── page.tsx                 # Homepage
│   ├── about/page.tsx           # About page
│   └── checklist/page.tsx       # Checklist page
├── config/
│   ├── content.ts               # Static UI text
│   └── questions.ts             # Quiz questions & answers
└── lib/
    └── prismic.ts               # Only for checklist items

Prismic (CMS):
└── checklist_item               # Dynamic recommendations only
```

### Option B: No CMS (Simplest)

```
Code (version controlled):
├── app/                          # Next.js App Router
├── content/
│   ├── questions.json           # Quiz questions & answers
│   └── checklist-items.json    # All recommendations
└── config/
    └── site.ts                  # All static content
```

### Option C: Current Model (Status Quo)

Keep all 8 Prismic types, just improve documentation.

---

## File Structure After Modernization

### Proposed App Router Structure

```
resiliency-kit/
├── app/
│   ├── layout.tsx                    # Root layout (replaces _app.js)
│   ├── page.tsx                      # Homepage (replaces index.js)
│   ├── about/
│   │   └── page.tsx                  # About page
│   ├── checklist/
│   │   └── page.tsx                  # Results page
│   └── [locale]/                     # i18n routes (if needed)
├── components/
│   ├── Homepage/
│   ├── Header/
│   └── ...
├── config/
│   ├── site.ts                       # Site-wide config
│   ├── content/
│   │   ├── en-us.ts                 # English content
│   │   └── es-es.ts                 # Spanish content (if needed)
│   └── questions.ts                  # Quiz questions
├── lib/
│   ├── prismic.ts                    # Prismic client (simplified)
│   └── utils.ts
└── types/                            # Only checklist_item.json (maybe)
```

---

## Decision Points

Before starting modernization, decide:

### 1. Do you need multi-language support?
- **Yes** → Keep locale system, use i18n library
- **No** → Remove locale complexity, simplify routing

### 2. Will non-technical users edit content?
- **Yes** → Keep Prismic for relevant content types
- **No** → Consider moving to JSON/MDX files in code

### 3. Do you need testimonials/people section?
- **Yes** → Keep `person` type or move to static
- **No** → Remove entirely

### 4. How often do quiz questions change?
- **Often** → Keep in Prismic for easy editing
- **Rarely** → Move to code for simpler setup

### 5. Are checklist recommendations stable?
- **Frequently updated** → Keep in Prismic
- **Mostly stable** → Consider JSON files with admin UI

---

## Migration Checklist

When ready to start Phase 1:

- [ ] Audit all Prismic content usage in components
- [ ] Create content config files structure
- [ ] Extract all `globals` data to config
- [ ] Extract all `homepage` data to config
- [ ] Extract all `about` data to config
- [ ] Extract all `resources_page` static text to config
- [ ] Update all components to use config instead of Prismic
- [ ] Create content management documentation
- [ ] Test all pages and functionality
- [ ] Remove unused Prismic custom types
- [ ] Update environment variables
- [ ] Update setup documentation

---

## Immediate Next Steps (Not Blocking Current Work)

1. ✅ Document the current architecture clearly
2. ✅ Make current Prismic setup easier to follow
3. ⏳ Decide on modernization timeline
4. ⏳ Choose content architecture approach (A, B, or C)
5. ⏳ Schedule time for Phase 1 implementation

---

## Notes

- Current setup works fine, modernization is optional
- Phased approach allows testing at each stage
- Can stop after Phase 1 if App Router migration isn't needed
- All phases maintain backward compatibility until cutover
- Consider user needs before removing CMS features

---

## Questions to Answer

Before proceeding with modernization:

1. **Who manages content?** (Developers only, or non-technical users too?)
2. **How often does content change?** (Daily, weekly, monthly, rarely?)
3. **Is multi-language actually used?** (en-us only, or other locales?)
4. **What's the deployment process?** (Manual, CI/CD, Vercel, etc?)
5. **Do you want content changes to require code deployments?**

These answers will guide which modernization options make sense.
