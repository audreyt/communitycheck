# Community Check — Design Reference

Visual reference for the Community Check specification. These mockups show what the intervention looks like in practice.

## The core interaction

A small, unobtrusive link beneath high-reach posts on contested policy topics:

![Community Check collapsed state: a social post with a subtle green prompt below asking "How do people actually feel about this?"](mockup-collapsed.png)

Tapping the link reveals representative opinion data — both from platform users (random sample) and from peer-reviewed national polls:

![Community Check expanded state: polling results with four answer choices shown as horizontal bars, toggle between "This platform" and "Nationally" tabs](mockup-expanded.png)

## Short-form video adaptation

The same intervention adapted for TikTok, Reels, and Shorts. A small green indicator appears at the bottom of qualifying videos once they cross the reach/engagement thresholds:

![Short-form video mockup with a persistent green Community Check indicator at the bottom of the video frame](video-mockup-indicator.png)

Swiping up reveals the full opinion data without leaving the video player — with larger type, tighter vertical layout, and bars optimized for glance-readability:

![Expanded Community Check over short-form video: question and three bars showing platform opinion distribution](video-mockup-expanded.png)

For platforms where swipe interactions aren't available, Community Check can attach as an auto-pinned comment instead:

![Pinned-comment variant: the first comment on a short-form video shows the Community Check summary inline](video-mockup-pinned.png)

See the [technical spec](../docs/technical-spec.md#short-form-video-adaptation) for classification, trigger thresholds, and latency strategies specific to video.

## The data pipeline

How posts become Community Checks — from viral trigger through topic classification to the two-tier data lookup:

![Pipeline diagram: 4 stages (Trigger → Classify → Lookup → Display) feeding from Tier 1 (national polls) and Tier 2 (platform random sampling)](pipeline-flow.png)

## Design principles

- **Conservative triggering.** The system stays silent when uncertain. Gaps are better than false matches.
- **Non-directional.** Community Check shows what people think — it never tells the user what to think.
- **Everyone sees the same numbers.** No personalization. No filtering by social graph. No engagement-based adjustment.
- **Unobtrusive.** Below the post, never on top of it. A quiet link, not a label or warning.
- **Two signals, side by side.** Platform sample (Tier 2) and national polls (Tier 1) are shown together because they correct different distortions.

## Files

| File | Purpose |
|------|---------|
| `mockup-collapsed.png` | Post with Community Check prompt attached |
| `mockup-expanded.png` | Full opinion data reveal |
| `video-mockup-indicator.png` | Short-form video with CC indicator |
| `video-mockup-expanded.png` | Short-form video with expanded CC |
| `video-mockup-pinned.png` | Pinned-comment variant |
| `pipeline-flow.svg` / `.png` | Data and control flow diagram |
| `og-image.png` | Social preview card |

All mockups are rendered from the interactive essay at [thenoisyroom.com](https://thenoisyroom.com).
