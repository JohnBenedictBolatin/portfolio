---
name: John Benedict Bolatin Portfolio
description: A monochrome, typography-led portfolio for software and technology work.
colors:
  primary: "#ffffff"
  neutral-bg: "#0a0a0a"
  neutral-surface: "#111111"
  neutral-raised: "#171717"
  neutral-ink: "#f5f5f5"
  neutral-muted: "#a1a1aa"
  neutral-line: "#27272a"
  neutral-line-strong: "#414146"
typography:
  display:
    fontFamily: "Sora, sans-serif"
    fontSize: "clamp(32px, 4vw, 48px)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Sora, sans-serif"
    fontSize: "18px"
    fontWeight: 600
  body:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "16px"
    lineHeight: 1.85
  secondary:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "12px"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "11px"
  metadata:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "10px"
rounded:
  sm: "3px"
  md: "5px"
  card: "6px"
  lg: "8px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  text-link:
    textColor: "{colors.neutral-ink}"
    typography: "{typography.label}"
  credential-card:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.lg}"
    padding: "16px"
---

# Design System: John Benedict Bolatin Portfolio

## Overview

**Creative North Star: "A restrained technical portfolio."**

The interface presents software and technology work with a monochrome palette, concise copy, locally hosted typography, and measured motion. A subtle ASCII character field and chrome mark provide visual identity without taking attention away from the content. Preserve the current page structure and adapt its spacing and component patterns to the viewport.

**Key Characteristics:**
- Black and white with layered charcoal surfaces.
- Sora headings paired with JetBrains Mono body and interface text.
- Chrome accents used for the owner's mark and section icons.

## Colors

Dark mode uses near-black surfaces and white type; light mode uses warm near-white surfaces and dark type. Credential artwork keeps its original issuer colors.

### Primary
- **White highlight** (#ffffff): Bright chrome reflections and emphasis.

### Neutral
- **Near-black** (#0a0a0a): Dark theme canvas.
- **Charcoal surface** (#111111): Dark theme cards and panels.
- **Raised charcoal** (#171717): Secondary surface layer.
- **Soft white** (#f5f5f5): Primary dark theme text.
- **Muted gray** (#a1a1aa): Secondary text.
- **Divider gray** (#27272a): Dark theme borders and rules.
- **Strong divider** (#414146): Emphasized borders.

### Named Rules
**The Real-Evidence Rule.** Show credential artwork only when it comes from the issuer or owner's supplied evidence; preserve its source colors.

## Typography

**Display Font:** Sora (sans-serif)
**Body Font:** JetBrains Mono (monospace)
**Label/Mono Font:** JetBrains Mono (monospace)

**Character:** Sora supplies clear, compact title hierarchy. Mono distinguishes interface labels, prose, and metadata.

### Hierarchy
- **Display** (600, clamp 32px–48px, 1.12): Interior page titles.
- **Title** (600, 18–24px): Section and item titles.
- **Body** (400, 16px, 1.85): Reading text.
- **Label** (400, 11–13px): Navigation, dates, issuer names, and metadata.

## Layout

Interior content follows the shared sidebar shell and a centered reading area. Page headings align their chrome icon with the title, place the description underneath, and end with a thin divider. Credentials are grouped by field: Networking & Cybersecurity (Appkademiya and Cisco), AI, CRM & Business (IBM SkillsBuild and LinkedIn Learning), then Salesforce Trailhead. Credential cards use two columns when the content region is at least 640px wide and one column below that width; the compact Trailhead grid uses three columns on wider screens.

## Elevation & Depth

Surfaces are distinguished by tonal shifts and thin borders. Keep shadows restrained; chrome shading belongs to the mark and icon assets.

## Shapes

Use small corner radii (3–8px), thin gray rules, and contained artwork. Avoid oversized rounded UI and clipping that cuts content.

## Components

### Links
- **Shape:** Unboxed inline text links.
- **Hover / Focus:** Existing restrained transition and visible focus ring.

### Cards / Containers
- **Corner Style:** Subtle, approximately 8px radius.
- **Background:** Existing raised charcoal or light theme surface.
- **Shadow Strategy:** Flat by default; thin border defines the edge.
- **Border:** One-pixel theme divider.
- **Internal Padding:** Approximately 16px.

## Do's and Don'ts

### Do
- Use the shared typography, surfaces, and divider language.
- Keep credentials and issuer evidence easy to scan and verify.
- Preserve original colors in official certificate and badge images.

### Don't
- Add ambient glows or animated gradients to the page background.
- Invent badge artwork, completion dates, or certification claims.
- Use entrance effects that hide content before hydration.
