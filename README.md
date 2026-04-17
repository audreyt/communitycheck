# Community Check

**A design proposal for showing people what the hidden majority actually believes.**

![Community Check collapsed state: a viral social post with a subtle green prompt below asking "How do people actually feel about this?"](design/mockup-collapsed.png)

Community Check is a system that attaches representative public opinion data to viral social media posts as context. When a high-reach post (about gun policy, for example) goes viral, Community Check shows what a statistically representative sample of users (and Americans nationally) actually believe about that topic in question.

The goal is to up level the views of the quiet majority on issues that are prone to extreme viewpoint amplification.

## The Problem

A [2025 study in PNAS Nexus](https://doi.org/10.1093/pnasnexus/pgaf310) found that 3.1% of social media users post toxic content — but Americans estimate 43% of users do. That's a 13x overestimate. Similar perception gaps exist across every major policy issue: Americans underestimate popular climate policy support by [nearly half](https://doi.org/10.1038/s41467-022-32412-y), overestimate partisan hostility by [roughly 2x](https://doi.org/10.1073/pnas.2001263117), and misjudge party composition by [over 3x](https://doi.org/10.1086/697253).

This represents misperceptions and factual errors about the composition of the larger audience, leading to real harmful policy decisions and political movements that are divorced from reality.

The result: the majority self-censors ([spiral of silence](https://doi.org/10.1111/j.1460-2466.1974.tb00367.x)), the minority thinks it's the majority, and everyone loses trust in everyone else.

## The Intervention

Community Check draws from two data sources:

1. **Platform random sampling** — stratified random samples of actual platform users (N>100,000, margins of error <0.5%), updated continuously
2. **Trusted national polls** — peer-reviewed surveys from Pew, Gallup, AP-NORC, KFF, and similar institutions

Posts trigger a Community Check when they meet three criteria: high reach (>10K impressions), high engagement heat (disproportionate replies/quotes), and high-confidence topic match (>0.8 from an LLM classifier). Most posts are never touched.

The result is a small, unobtrusive link beneath qualifying posts that lets you see where the actual community stands — both on that platform and nationally.

![Community Check expanded state: polling results shown as horizontal bar chart with toggle between "This platform" and "Nationally" tabs](design/mockup-expanded.png)

The goal is to supplement tools like Community Notes, providing better context to help people form accurate perceptions when consuming content on social media.

## Why This Works

Multiple studies show that correcting misperceptions about what others believe (metaperceptions) reduces hostility:

- [Mernyk et al. (PNAS, 2022)](https://doi.org/10.1073/pnas.2116851119): A single correction reduced partisan hostility for ~26 days
- [Lee et al. (PNAS Nexus, 2025)](https://doi.org/10.1093/pnasnexus/pgaf310): Correcting overestimates of toxic users improved positive emotions and reduced perceived moral decline

This is different from fact-checking, which (with the exception of Community Notes) is often criticized as being heavy-handed and censorious. Instead, Community Check shows users what the larger community of people actively believe about particular viral issues. The goal is to help platform communities (and the public in general) more effectively calibrate their beliefs about the wider public online.


## The pipeline

![Pipeline diagram: 4 stages (Trigger → Classify → Lookup → Display) feeding from Tier 1 national polls and Tier 2 platform random sampling](design/pipeline-flow.png)

See [design/](design/) for additional mockups and the full visual reference.

## Documentation

- **[Technical Specification](docs/technical-spec.md)** — Data architecture, topic classification, trigger criteria, governance, platform integration, and video adaptation
- **[FAQ](docs/faq.md)** — Gaming, bias, governance, and why this isn't social engineering
- **[Research](docs/research.md)** — Full citations and evidence base
- **[Open Questions](docs/open-questions.md)** — Unsolved problems where we need input
- **[Design Reference](design/)** — UI mockups, pipeline diagram, and design principles

## The Essay

The interactive essay explaining Community Check is live at [thenoisyroom.com](https://thenoisyroom.com). It walks through the problem, the research, and the proposed intervention with interactive visualizations.

## Status

Community Check is a design proposal. The technical specification is detailed enough to build from, but several [open questions](docs/open-questions.md) remain — particularly around non-response bias, question framing, and governance bootstrapping. We believe these can be solved with the right deployment of bridging systems and community input.

We're actively looking for support from researchers, engineers, platform designers, PMs at the major social media cos, and skeptics.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. The most valuable contributions right now are:

- Critique of the technical specification
- Research citations we've missed, for and against
- Answers to the [open questions](docs/open-questions.md)
- Translations and international polling sources

## Acknowledgments

This work builds on ideas from Audrey Tang (bridging-based deliberation, digital democracy), the authors of [Community Notes](https://arxiv.org/abs/2210.15723) (crowd-sourced bridging algorithms for contested information), and Steven Pinker's *When Everyone Knows That Everyone Knows* (common knowledge and social norms).

## License

[CC BY 4.0](LICENSE)
