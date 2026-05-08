# Project Instructions

## Overview
- **Type**: Single Page Application (React + Vite + TypeScript)
- **Purpose**: Clickable wireframe prototype for Spotify Rewards Club microsite
- **Styling**: Tailwind CSS v4 (utility-first, premium light UI)
- **UI Libraries**: react-router-dom (navigation)
- **Dev Server**: Vite with HMR on port 3000

## Visual Design System
Premium light UI with the following principles:

- **Surfaces** — No visible borders. Cards float on `shadow-sm`, rounded-2xl (mobile) / rounded-3xl (desktop).
- **Page background** — Off-white `#FAFAFA` with pure white cards for layered depth.
- **Typography** — Large bold headlines (3xl-5xl), `tracking-tight`, dramatic hierarchy between heading and body.
- **Section labels** — `text-xs font-bold text-gray-400 uppercase tracking-[0.15em]`.
- **Buttons** — All pill-shaped (`rounded-full`), primary has `shadow-lg shadow-gray-900/20`, hover lifts.
- **Inputs** — Borderless, `bg-gray-50 rounded-xl`, focus ring `ring-gray-900/10`.
- **Cards** — Hover: `hover:shadow-xl hover:-translate-y-1`, 300ms transition.
- **Navigation** — Frosted glass header (`bg-white/80 backdrop-blur-xl`), mobile hamburger with slide-in panel.
- **Colour** — Restrained grayscale. Gray-900 for primary actions, gray-400 for secondary text.
- **No emojis** anywhere.

## Architecture
- Entry point: `src/main.tsx`
- Root component: `src/App.tsx` (React Router setup)
- Global styles: `src/index.css` (Tailwind + animations)
- State management: `src/context/AppContext.tsx` (useReducer)
- Mock data: `src/data/mockData.ts` (rewards with discount/isNew/locked, events with date/venue/city/spots)
- Screens: `src/screens/` (one file per screen)
- Shared components: `src/components/` (BrowserFrame, WireframeShell, CMSShell, Placeholder, Skeleton)
- CMS screens: `src/screens/cms/` (admin wireframes, blue-themed)

## Current State
Clickable prototype with premium UI, full mobile responsiveness, and all brief requirements covered. CMS admin wireframes accessible via blue floating button.

### Screens Built
1. **LoginGate** (`/`) — Full-bleed dark hero with Spotify login pill button
2. **SpotifyLogin** (`/login`) — Spotify-branded login form (email/password, Google/Apple social options, show/hide password toggle). Pre-filled with Priya's email.
3. **AuthPermissions** (`/auth-permissions`) — OAuth consent screen ("Rewards Club wants to access your Spotify account") with permissions list + Agree/Cancel
4. **Onboarding** (`/onboarding`) — Welcome moment ("Premium verified" badge, explains why we need details) + profile form. Pre-filled with Priya Sharma's details. Terms & Privacy checkbox required before submit.
5. **RewardsCatalog** (`/rewards`) — Browse all benefits with filters, progress bar, locked cards, discount badges, "new" indicators. Welcome guide carousel for first-time users.
6. **OfferDetail** (`/rewards/:rewardId`) — Full offer info with discount badge, locked state handling, denomination picker (gift cards), interval display (memberships), no-code redirect variant (offers without codes)
7. **CodeReveal** (`/rewards/:rewardId/claim`) — Voucher code + PIN + redemption info. Shows denomination/interval context. All fields mapped to Razorpay API response.
8. **EventRegister** (`/events/:eventId/register`) — Full event detail page (date/time/venue/address/map/access/parking/included/not-allowed/dress-code/contact) + registration form. Cancel option for registered users.
9. **History** (`/history`) — Active/Expired tabs with segmented control
10. **Profile** (`/profile`) — Account page with Priya Sharma persona, subscription status, Spotify connection
11. **PremiumLapsed** (`/premium-lapsed`) — Premium subscription lapsed state
12. **ErrorState** (`/error`) — API failure / network error state
13. **Terms** (`/terms`) — Terms of Service page
14. **Privacy** (`/privacy`) — Privacy Policy page (DPDP Act compliant)

### CMS Admin Wireframes (blue-themed, `/cms/*`)
Accessible via blue floating "CMS" button on front-end. Clearly NOT part of user experience.

15. **CMSDashboard** (`/cms`) — Stats overview (active events, registrations, rewards count), recent events list
16. **CMSEventsList** (`/cms/events`) — Table of all events with date, venue, type, capacity bar, status, edit links
17. **CMSEventEditor** (`/cms/events/new` or `/cms/events/:eventId`) — Full event creation/edit form with sections: Basic Info, Date & Time, Location (full address + Google Maps URL), Access & Logistics, Capacity, Lists (what to bring/included/not allowed), Day-of Contact, Event Image upload
18. **CMSRewards** (`/cms/rewards`) — Read-only view of Razorpay API rewards with sync button and info banner explaining external management

### Login & Auth Flow
The full authentication flow is now:
1. Homepage (dark hero) -- "Log in with Spotify" CTA
2. Spotify Login screen (dark, Spotify-branded) -- email/password + social options
3. Auth Permissions screen (dark, card-based) -- OAuth consent with permissions list
4. Onboarding (light, welcoming) -- "Premium verified" badge + profile form with explanation of why data is needed
5. Rewards Catalog -- the main experience

Returning users (onboarding already complete) skip step 4 and go straight to the catalog.

### Brief Coverage (7 requirements)
1. Premium vs Free distinction — Covered (LoginGate + AuthCallback routing)
2. Collect user info — Covered (Onboarding form: name, email, phone, age, gender, city)
3. Display offers, grey out claimed — Covered (opacity-60 + "Claimed" badge)
4. Conditional unlock — Covered (locked cards, progress bar, unlock at N claims)
5. Claimed codes in history — Covered (History screen with Active/Expired tabs)
6. Catalog API integration — Deferred (mock data in place, Skeleton component ready)
7. Unique codes/QRs — Covered (CodeReveal shows text code + QR placeholder)

### Mobile Experience
- **Hamburger menu** — Slide-in panel from right with user card, nav links (active = dark pill), smooth animation
- **Responsive padding** — `px-5 md:px-6 lg:px-12 xl:px-20` throughout
- **Touch targets** — All buttons minimum 44px tap area
- **Cards** — `rounded-2xl` on mobile, `rounded-3xl` on desktop
- **Typography** — Scales down gracefully (3xl mobile, 5xl desktop)
- **Filter pills** — Horizontally scrollable on mobile
- **Event cards** — Stack vertically on mobile with full-width image

### Component Structure
- **BrowserFrame** — macOS browser chrome wrapper (traffic lights, URL bar)
- **WireframeShell** — Site header (frosted glass) + mobile hamburger + main content
- **Placeholder** — Image placeholder with nested box-within-box pattern
- **LogoPlaceholder** — Brand initial in a circle
- **Skeleton** — Shimmer loading states (CatalogSkeleton, SkeletonCard, SkeletonEventCard)

### Persona: Priya Sharma
All wireframes use a consistent persona throughout:
- **Name**: Priya Sharma
- **Email**: priya.sharma@gmail.com
- **Phone**: +91 98765 43210
- **DOB**: 14 March 1996
- **Gender**: Female
- **City**: Mumbai
- **Spotify**: Premium Individual, active, renews 14 Jun 2025
- **Username**: priya.sharma

This persona is pre-filled in the login screen, onboarding form, profile page, and event registration forms. The avatar shows "PS" in the header.

### State Variations Shown
- **Event tickets: scarcity states** — 3 visual tiers:
  - Green/neutral (white pill): plenty of spots (e.g. "84 spots left")
  - Amber (amber pill): running low, under 20% remaining (e.g. "12 spots left")
  - Red (red pill): critical scarcity, 5 or fewer (e.g. "Only 3 left")
  - Sold out: greyed out card with "Sold out" label
- **Event registration: cancel flow** — registered users see their confirmation with event details + a "Cancel registration" text button. Cancelling shows a confirmation state and releases the spot.
- **Rewards: locked/unlocked/claimed** — three distinct visual states per card
- **Welcome guide** — 4-step carousel (dismiss with X or click through)

### Event Detail Page (expanded)
The event detail page now shows comprehensive logistics info (all CMS-managed per event):
- **Date and time** — full date, event start time, doors open time, duration
- **Location** — venue name, full street address (mappable), Google Maps embed placeholder, "Open in Google Maps" link
- **Access and entry** — specific gate/entrance instructions, how to get in, what to show at the door
- **Parking and transport** — parking availability, cost, alternatives (metro, cab)
- **What's included** — list of perks (drinks, merch, photo ops, etc.)
- **What to bring** — ID requirements, confirmation email, dress code compliance
- **Not allowed** — prohibited items (cameras, bags, outside food)
- **Dress code** — conditional, only shown when applicable
- **Day-of contact** — WhatsApp helpline for event-day issues
- **Age restriction** — shown as pill badge

All fields are optional in the CMS except date, time, venue, address, and whatToBring. The UI conditionally renders sections only when data exists.

### Animations & Transitions (Motion.tsx + index.css)
- `FadeUp` component — reusable wrapper, configurable delay, 600ms ease-out
- `animate-fade-up` — CSS keyframe (opacity 0 > 1, translateY 20px > 0)
- `animate-scale-in` — CSS keyframe (scale 0.95 > 1, opacity 0 > 1)
- `animate-slide-in` — Mobile menu panel entrance (0.3s cubic-bezier)
- `animate-shimmer` — Skeleton loading gradient sweep (1.5s infinite)
- Stagger classes (`.stagger-1` through `.stagger-8`) for cascading card reveals
- Smooth page transitions via FadeUp wrappers on each screen

### Event Registration (two distinct flows)
The prototype demonstrates both registration types confirmed by the client:

**FCFS (first come first served):**
- Pre-filled user details (read-only display)
- Single "Confirm registration" button
- Instant spot confirmation
- Post-registration screen with reference number, add-to-calendar, what-to-bring reminder

**Competition:**
- Editable personal details
- 2-3 multiple choice questions + 1 written answer (50-200 words)
- "Submit entry" button
- Post-submission screen with "Pending selection" status, reference number

Both flows lead to a full confirmation screen with: reference number, event details grid, add-to-calendar button, what-to-bring list, cancellation info, and navigation back to rewards/history.

### CMS Event Editor - Registration Type
The CMS event editor includes a "Registration type" section where admins:
- Choose between FCFS and Competition
- For competition events: add/remove questions, set question type (multiple choice or written), configure options for MCQs
- Preview how the registration form will look to users

### Free User Path (clarified)
Free users are blocked at login. They see the NotEligible screen and cannot browse the catalog. There is no "browse with banner" state. The gate is binary: Premium = full access, Free = blocked.

### Prototype Tooling (not product)
These elements help reviewers test states. They won't ship:
- **ScenarioSwitcher** (bottom-left) — toggles between happy path, empty states, all-claimed
- **AnnotationToggle** (top-right) — shows/hides design rationale notes
- **CMS access button** (bottom-right blue pill) — shortcut to CMS wireframes

See `PROTOTYPE-README.md` for full walkthrough instructions.

## Key Decisions
- Premium light UI (not dark mode) — generous spacing, soft shadows, no borders
- Homepage stays dark/atmospheric as a contrast entry point
- Discount value shown directly on catalog cards (dark badge, bottom-left)
- "New" indicator = small dark dot (top-right of card)
- Event cards show date, venue, spots remaining
- Mobile nav is a full slide-in panel, not a bottom tab bar
- Skeleton components ready for API integration phase

## Data Flow (from Razorpay API)
- `GET /v1/engage/marketplace/program/:id/rewards` — List all available rewards
- `POST /v1/engage/marketplace/program/:id/orders` — Place order (claim voucher)
- `GET /v1/engage/marketplace/program/:id/orders/:orderId` — Get order details (voucher codes)
- `GET /v1/engage/marketplace/program/:id/balance` — Check remaining budget

## Open Questions for Client
1. Event management — self-serve CMS or handled by dev team?
2. Event format flexibility — same template or variable?
3. Data access format — dashboard or on-request?
4. Notifications — Spotify channels or site-driven?
5. Premium lapse — lock out or allow access to claimed codes?
6. Claim limits — per user, per brand, per time period?
7. Budget exhaustion — hide offers or show unavailable?
8. Trial users — same catalog access as full Premium?
9. Geolocation — auto-detect via browser API or manual city selection?
