# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2025-11-14

### Added
- Comprehensive Prismic setup documentation (`scripts/setup-prismic.md` and `PRISMIC_SETUP.md`)
- Support for Prismic REST API v2 (replacing GraphQL)
- Error handling and fallbacks for missing content in Prismic
- Safety checks for empty data arrays to prevent runtime errors

### Changed
- **BREAKING**: Migrated from GraphQL to REST API for Prismic integration
  - Updated all API functions in `lib/api.js` to use `@prismicio/client` v7+ REST methods
  - Replaced `fetchAPI` GraphQL queries with `getSingle`, `getAllByType`, and `getByID` methods
  - Maintained backward-compatible data structure for existing components
- **BREAKING**: Updated all `<Link>` components for Next.js 15 compatibility
  - Removed `<a>` tags from within `<Link>` components
  - Moved `className` and other props directly to `<Link>` elements
  - Removed deprecated `passHref` prop
  - Updated components: `Homepage.js`, `Logo.js`, `MainNav.js`, `LanguageSwitcher.js`, `Header.js`
- Upgraded to Next.js 15.2.2 and React 19.0.0
- Fixed `<title>` tag in `pages/index.js` to use template string instead of array children
- Added optional chaining for `open_graph_image.url` to handle missing images gracefully
- Updated `HomepageSlider.js` to handle empty or null `people` array

### Removed
- Removed `@prismicio/next` preview functionality due to Next.js 15 incompatibility
  - Removed `PrismicPreview` wrapper from `pages/_app.js`
  - Removed `enableAutoPreviews` from `prismicio.js`
  - Preview mode can be re-enabled when `@prismicio/next` releases Next.js 15 compatible version

### Fixed
- Fixed Prismic repository name validation error
- Resolved "Failed to fetch API" errors by migrating from GraphQL to REST API
- Fixed "Invalid <Link> with <a> child" errors across all components
- Fixed "Cannot read properties of null (reading 'length')" error in `HomepageSlider`
- Fixed React `<title>` tag children warning
- Resolved module resolution errors with `next/headers` in `@prismicio/next`

### Technical Details

#### Environment Configuration
- `PRISMIC_REPOSITORY_NAME`: Must be URL-friendly format (e.g., "resiliency")
- `PRISMIC_API_TOKEN`: Master/permanent access token from Prismic
- `PRISMIC_REPOSITORY_LOCALE`: Default locale (e.g., "en-us")

#### Prismic Custom Types Required
The following custom types must be created in Prismic (JSON schemas in `/types` directory):
1. `homepage` (Single)
2. `about` (Single)
3. `globals` (Single)
4. `resources_page` (Single)
5. `person` (Repeatable)
6. `answer` (Repeatable)
7. `qualifier` (Repeatable)
8. `checklist_item` (Repeatable)

#### API Migration Details
- **Before**: GraphQL queries via `fetchAPI` function
- **After**: REST API using Prismic client methods
  - `client.getSingle(type, { lang })` - for single documents
  - `client.getAllByType(type, { lang })` - for collections
  - `client.getByID(id, { lang })` - for linked content
- Data structure preserved for backward compatibility with existing components

#### Next.js 15 Link Component Pattern
```javascript
// Before (Next.js 12-14)
<Link href="/path">
  <a className="styles">Text</a>
</Link>

// After (Next.js 15+)
<Link href="/path" className="styles">
  Text
</Link>
```

### Known Issues
- Prismic preview mode temporarily disabled due to `@prismicio/next` v2.0.2 incompatibility with Next.js 15
- Preview functionality will be restored when `@prismicio/next` releases a Next.js 15 compatible version

### Documentation
- Added step-by-step Prismic setup guide in `scripts/setup-prismic.md`
- Added detailed custom type documentation in `PRISMIC_SETUP.md`
- Included sample content examples for quick start

### Dependencies
- next: ^15.2.2 (upgraded from previous version)
- react: 19.0.0 (upgraded from previous version)
- react-dom: 19.0.0 (upgraded from previous version)
- @prismicio/client: ^7.15.0 (REST API support)
- @prismicio/next: ^2.0.2 (preview features disabled)
- @prismicio/react: ^2.9.2

### Migration Guide

#### For Existing Users
If upgrading from an older version:

1. **Update environment variables** in `.env`:
   ```bash
   PRISMIC_REPOSITORY_NAME="your-repo-name"  # Must be URL-friendly
   PRISMIC_API_TOKEN="your-token"
   PRISMIC_REPOSITORY_LOCALE="en-us"
   ```

2. **Update dependencies**:
   ```bash
   npm install
   ```

3. **No code changes required** - API structure maintained for compatibility

4. **Preview mode**: If you were using preview mode, it's temporarily unavailable. Standard content fetching works normally.

#### For New Users
Follow the setup guide in `scripts/setup-prismic.md` to configure your Prismic repository with the required custom types and content.

---

## Notes

This release focuses on modernizing the codebase to support the latest Next.js and React versions while maintaining API compatibility. The Prismic integration has been completely rewritten to use the modern REST API approach, which is more performant and better supported than the legacy GraphQL implementation.
