# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

IPUC (Iglesia Pentecostal Unida de Colombia) members across all congregations — primarily youth and young adults (15–35) but open to all ages. Attendees register individually, often from mobile devices. Church leaders and pastors use post-event features for spiritual follow-up.

## Product Purpose

Fervor 2026 is a promotional and registration site for "Identidad Celestial," an all-night (12-hour) religious vigil hosted by the Conquistadores Pentecostales of IPUC District 9 on December 7–8, 2026, at Coliseo de Voleibol Yesid Santos in Medellín. The site serves as an animated, flyer-style landing page that excites visitors about the event, enables registration, and after the event captures spiritual experiences (testimonies, Holy Spirit encounters, pastoral accompaniment requests).

## Positioning

A highly visual, animated digital flyer — not a typical church registration form. The site itself is the first impression of the event's energy and spiritual intensity. Registration and post-event engagement flow naturally from that experience.

## Operating Context

- Spanish-language interface for Colombian audience
- Mobile-first usage (most visitors arrive via Instagram/WhatsApp links)
- Phone number as unique identifier (no authentication required)
- Multi-user support on shared devices
- Supabase backend for registration data and post-event forms
- Event price: $48,000 COP donation

## Capabilities and Constraints

**Confirmed capabilities:**
- Event information landing page with animated flyer presentation
- Attendee registration with demographic data
- Post-event engagement: testimony capture, Spirit-filled experience reporting, pastoral accompaniment requests
- Multiple user profiles per device via localStorage

**Constraints:**
- Registration uniqueness enforced by phone number
- Attendance modes: presencial (in-person) and virtual
- Age ranges tracked from <14 to 65+

## Brand Commitments

Design must be based on assets provided by the user: event flyer, color palette, and logo. Current repo assets include:
- `/logo-fervor-2026.png` — Main event logo
- `/fervor-2026-flyer.png` — Event flyer
- `/ipuc-logo.png` — IPUC institutional logo
- `/logo-conquistadores.png` — Conquistadores group logo

Current palette (from tailwind config):
- Primary/Ink: `#00162A` (deep navy)
- Secondary/Teal: `#0099AA`
- Tertiary/Cyan: `#05DBF2`
- Celestial: `#014040` (dark teal)
- Peach: `#FEBF89` (warm accent)
- Surface: `#F4FBFC` (light background)

Typography: Bebas Neue (display), Montserrat (body)

## Evidence on Hand

- 5 confirmed speakers/preachers for the event
- Event venue confirmed (Coliseo de Voleibol, Atanasio Girardot complex)
- Social media presence: @fervor.oficial, @conquistadores9 on Instagram
- No fabricated testimonials, metrics, or claims — all content must be real

## Product Principles

1. **The site IS the flyer** — every viewport should feel like an animated promotional piece, not a utility form
2. **Mobile-first energy** — most visitors arrive from social media on phones; the experience must captivate immediately
3. **Spiritual continuity** — registration is the entry point, but the real value is post-event spiritual engagement and follow-up
4. **Real content only** — no fabricated testimonials, attendance numbers, or claims

## Accessibility & Inclusion

- Prefers-reduced-motion support already implemented
- High contrast color combinations required (dark backgrounds with bright text)
- Spanish-only interface (no i18n requirement established)
