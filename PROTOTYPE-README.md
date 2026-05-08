# Rewards Club Microsite - Clickable Prototype

This is a wireframe prototype for internal review. It covers the full user journey and CMS admin experience.

## How to navigate

**Front-end (user experience):**
- Start at `/` (login gate)
- Click "Log in with Spotify" to enter the auth flow
- After auth, you land on the rewards catalog
- Click any reward card or event card to see the detail/registration flow
- Use the nav bar (Rewards, History, Account) to move between sections

**CMS (admin experience):**
- Click the blue "CMS" button in the bottom-right corner of any front-end page
- Or go directly to `/cms/login`
- The CMS uses a blue colour scheme to visually separate it from the user-facing site

## What's prototype tooling (not product)

These elements exist to help reviewers test different states. They won't ship:

- **ScenarioSwitcher** (bottom-left corner) - Toggles between happy path, empty states, all-claimed, etc. Use it to see how the UI handles edge cases without manually claiming everything.
- **Annotation toggle** (top-right "i" icon) - Shows/hides yellow annotation notes. These are design rationale and open questions for the team, not user-facing content.
- **CMS access button** (bottom-right blue pill) - Quick shortcut to the CMS wireframes. In production, the CMS would be on a separate subdomain.

## What's real product

Everything else. The screens, flows, copy, data model, and interactions represent the intended product experience.

## Event registration types

The prototype demonstrates two distinct registration flows:

1. **FCFS (first come first served)** - Pre-filled details, single confirm button, instant spot. See: Prateek Kuhad event.
2. **Competition** - Personal details + 2-3 multiple choice questions + 1 written answer. Winners selected later. See: Arijit Singh event.

## Key routes

| Route | What it shows |
|-------|---------------|
| `/` | Login gate |
| `/rewards` | Main catalog (rewards + events) |
| `/rewards/:id` | Reward detail |
| `/rewards/:id/claim` | Code reveal after claiming |
| `/events/:id/register` | Event detail + registration |
| `/history` | Claimed codes and event registrations |
| `/profile` | Account settings |
| `/premium-lapsed` | Expired subscription state |
| `/not-eligible` | Free user blocked state |
| `/cms` | CMS dashboard |
| `/cms/events` | Event list (admin) |
| `/cms/events/:id` | Event editor with all fields |
| `/cms/rewards` | Rewards overview (read-only, Razorpay managed) |

## Running locally

```
npm install
npm run dev
```

Opens on `http://localhost:3000`.

## Open questions for the team

Annotation notes (toggle them on with the "i" icon) contain specific questions about implementation decisions. Key ones:

- FCFS vs competition: client confirmed both types, but hasn't specified how many questions or whether they're configurable per event
- Cancellation deadline: per-event or global policy?
- Reward budget exhaustion: does the card disappear or show a "just missed it" state?
- Waitlist for full events: currently not included (sold out = done)
