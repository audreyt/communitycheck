# Open Questions

Community Check is a design proposal, not a finished system. These are the open problems we're actively thinking about — and where we'd most welcome input from researchers, engineers, and skeptics.

## Non-Response Bias

If the platform randomly selects 500,000 users for an in-app survey, the expected response rate is 5–15% (industry benchmark for optional in-app prompts). The people who respond are systematically different from those who don't — they tend to be more engaged, more opinionated, more politically interested.

Oversampling underrepresented strata and demographic weighting mitigate this, but non-response bias is the single largest methodological risk in the platform sample. How far can weighting correct for it? This needs empirical testing on real platform data.

## Question Framing Effects

"Do you support background checks for all gun purchases?" and "Should the government require background checks before you can buy a gun?" produce different numbers — even though both are neutral. The specific wording determines the percentage displayed.

Our proposed mitigation is showing multiple polls on the same topic with their exact wordings, so users can see how framing affects results. But the "headline number" shown in the collapsed view is still a choice. Should it be the median across polls? The most recent? The most conservative estimate? This is unresolved.

## Temporal Validity

Public opinion shifts. A poll from 2023 may not reflect 2026 sentiment. The platform sample (Tier 2) addresses this with continuous refresh, but the national polls (Tier 1) may lag by months or years.

The system should display dates prominently and weight more recent data, but the exact weighting function is TBD. For fast-moving issues (emerging legislation, crisis events), there may be periods where no current data exists — and the system should stay silent rather than show stale numbers.

## Governance and Accountability

The bridging-based approach for question approval is promising, but it raises its own questions:

- Who are the initial contributors?
- How do you bootstrap a diverse contributor pool?
- What happens when the bridging algorithm itself is contested?
- What's the appeals process for a rejected question or a flagged match?

These governance structures need to be designed with the same rigor as the technical architecture.

## Does In-Feed Data Actually Change Behavior?

The research on metaperception correction is strong ([Mernyk et al., 2022](https://doi.org/10.1073/pnas.2116851119); [Lee et al., 2025](https://doi.org/10.1093/pnasnexus/pgaf310)). But those studies were conducted in controlled settings — not in the middle of an algorithmically optimized feed designed to trigger emotional reactions.

Does a polling widget beneath an enraging post actually get processed rationally? Or does it get scrolled past? This is an empirical question that can only be answered by building and testing the intervention in real environments.

## International Applicability

The current design is US-centric — American polling institutions, American policy questions, American perception gap research. Social media is global.

Adapting Community Check for other countries requires equivalent trusted polling infrastructure in each context, which exists in some countries (UK, Germany, Australia) but not others. The architecture is portable; the data sources are not.

---

These are real problems, not rhetorical ones. If you're a researcher, engineer, or designer with ideas about any of them — [open an issue](https://github.com/rosestt/communitycheck/issues) or submit a PR.
