# Frequently Asked Questions

## Isn't polling easily gamed? What stops a coordinated campaign from flooding the results?

You can't flood a system that chooses its respondents randomly. Community Check uses stratified random sampling — the gold standard in survey methodology (Groves et al., *Survey Methodology*, 2nd ed., Wiley, 2009). You don't volunteer to respond. You're selected, like jury duty. Each user responds once per question per 90-day cycle. Coordinated response patterns are anomaly-detected and excluded. The sampling algorithm and exclusion criteria are open-source and auditable.

This is the same methodology behind national polls that reliably measure opinion across 330 million people using samples of just 1,000–2,000 respondents. The key isn't sample size — it's random selection. A platform with hundreds of millions of users has an even larger pool to draw from, making representative sampling more robust, not less.

Right now, a single viral post from one account can shape the perceived consensus of millions. Community Check replaces that with N>100,000 randomly selected responses — orders of magnitude larger than any national poll, and a dramatically higher bar than the status quo.

## Who decides what questions get asked? That's where the bias lives.

In the ideal implementation, questions are governed by a bridging algorithm — the same approach Community Notes uses. Questions are proposed by a diverse pool of contributors and only enter the active taxonomy if they earn approval from contributors who historically disagree with each other. Loaded or partisan questions are filtered out structurally, not by any single editorial board. AAPOR standards for neutral question design apply: balanced language, all reasonable response options, no leading framing.

For the open-source starting point, questions come from established polling organizations (Pew, Gallup, AP-NORC) with published methodology. The full question taxonomy is open — any researcher or journalist can audit the wording. That's a level of transparency no social media algorithm currently offers.

## Doesn't this just become another tool for the majority to silence minorities?

Right now, the system already silences the actual majority. The spiral of silence — people self-censoring because they falsely believe they're in the minority — is one of the most replicated findings in political communication ([Noelle-Neumann, 1974](https://doi.org/10.1111/j.1460-2466.1974.tb00367.x)). [Hampton et al. (Pew Research, 2014)](https://www.pewresearch.org/internet/2014/08/26/social-media-and-the-spiral-of-silence/) found social media makes this worse: people who sensed their Facebook network disagreed with them were less likely to speak up both online and in person. Community Check breaks that cycle.

It also explicitly displays minority positions — when 15% hold a view, that number appears clearly. A minority position accurately shown at 15% is far healthier than one that looks like 50% through amplification or 0% through suppression. Everyone benefits from seeing the real picture.

## Why should I trust polls at all? They got 2016 wrong. They got 2020 wrong.

Election forecasting and opinion measurement are different things. Community Check doesn't predict elections. It measures policy preferences — "Do you support background checks?" — which are far more stable and far easier to measure than vote intention. When Pew reports 87% support for background checks across 15 years of polling with N=5,000+, that's a measurement with a published margin of error, not a prediction.

The platform sample adds N>100,000 — 50–100x larger than typical national polls, with margins of error below ±0.5%. That's an extraordinarily reliable signal, and it updates continuously.

## This feels like social engineering. Who gave anyone permission to "correct" my perception?

Your perception is already being shaped — by algorithms that prioritize engagement over accuracy. Community Check simply makes additional information visible: what a representative sample of people actually believe. You can agree, disagree, or ignore it entirely.

Think of nutrition labels. The Nutrition Labeling and Education Act of 1990 didn't tell people what to eat — it made the information available. Community Check does the same for public opinion: standardized, transparent data beneath content that is already shaping how you see the world.

## How is this different from Community Notes on X/Twitter?

They solve different problems. Community Notes evaluates whether specific claims are true or false, written by self-selected volunteers rated via a bridging algorithm ([Wojcik et al., 2022](https://arxiv.org/abs/2210.15723)). Community Check doesn't assess truth — it shows what people think about the policy topic a post discusses. A post can be entirely accurate and still create a distorted picture of where the public stands.

The data source matters too. Community Notes contributors self-select in — and [More in Common (2019)](https://perceptiongap.us/) found that the most politically engaged users have the largest perception gaps (nearly 3x more distorted than disengaged users). Community Check uses random sampling and peer-reviewed national surveys. Both tools are valuable; they complement each other.

## Doesn't showing consensus numbers just create conformity pressure?

The research consistently shows the opposite. The social norms approach — correcting misperceived norms by showing accurate data — has been validated across 200+ studies (Berkowitz, *Changing the Culture of College Drinking*, Hampton Press, 2004). [Tankard & Paluck (2016)](https://doi.org/10.1111/sipr.12022) found that accurate norm information corrects misperceptions without coercion — it reveals what people already privately believe, rather than pressuring them into something new.

[Mernyk et al. (PNAS, 2022, n=4,741)](https://doi.org/10.1073/pnas.2116851119) showed this directly: correcting inaccurate metaperceptions reduced support for partisan violence, with effects lasting ~26 days. People didn't conform — they recalibrated, and felt better about each other as a result.

## What about topics where the "consensus" is just wrong?

Community Check doesn't claim majority opinion equals truth. It provides a map of what people actually think — which is valuable precisely when your estimate of the room is off by 200–400%, as [Ahler & Sood (2018)](https://doi.org/10.1086/697253) documented. If 70% of people believe something you disagree with, knowing that number helps you understand the world you're operating in. Hiding it doesn't make the disagreement go away.

Both majority and minority positions are always displayed with their numbers. This isn't "the crowd says you're wrong." It's "here's what the room actually looks like" — and that's useful no matter where you stand in it.

## This only works for issues with clear polling data, right?

Correct — by design. Community Check activates only when reliable polling data exists, a documented perception gap has been identified, and a post reaches >10K impressions. That covers ~50–100 major policy questions. Posts about niche topics or emerging controversies without polling data get no Community Check.

The topic-matching confidence threshold is 0.8 — if the system isn't sure, it stays silent. False positives are worse than gaps. This is intentionally focused on the specific, well-documented cases where perception gaps are largest: gun policy, climate, immigration, healthcare, money in politics. Start where the data is strongest, and expand from there.

## What's stopping governments from using this to manufacture consent?

This is a legitimate question, and one worth exploring carefully. It's entirely possible that a government — or any well-resourced actor — could try to use a system like this to pollute polling data and distort public perception. The history of opinion measurement is full of attempts to do exactly that. For this reason, **transparency is the most important property of the design.**

The architecture is built to make manipulation detectable. Data comes from independent polling organizations — not governments, not platforms. The sampling algorithm is open-source. Question wording is published. Methodology is auditable. Quarterly transparency reports detail every step from sampling to display.

Compromising it would require simultaneously infiltrating multiple independent polling organizations, altering open-source code inspected by thousands of researchers, and evading anomaly detection. That's a high bar — and one that gets higher as more independent eyes are watching. Today's platform algorithms shape public perception at scale with zero transparency and zero public oversight. Community Check raises the baseline significantly, but it depends on a vigilant community of researchers, journalists, and engineers continuing to inspect it.

## I form my own opinions. Why would I want this?

Independent thinking requires accurate inputs. Right now, the feed is giving you wildly inaccurate ones. [Sparkman et al. (Nature Communications, 2022, n=6,119)](https://doi.org/10.1038/s41467-022-32412-y) found Americans underestimate popular climate policy support by nearly half — 80% actually support renewable energy siting, but people estimate 43%. [Moore-Berg et al. (PNAS, 2020)](https://doi.org/10.1073/pnas.2001263117) found partisans overestimate the other side's hostility by roughly 2x. These aren't matters of opinion — they're factual errors about the world around you.

Community Check doesn't ask you to care what others think. It gives you an accurate picture so your independent opinions are based on reality, not on an algorithmically curated distortion of it.

## Won't people just dismiss the data if it contradicts their beliefs?

Correcting metaperceptions — beliefs about what others believe — works differently than correcting factual beliefs. Factual corrections can trigger defensiveness. But learning "the other side is less extreme than you thought" tends to be relieving, not threatening. It lowers the temperature.

[Lee et al. (PNAS Nexus, 2025, n=1,090)](https://doi.org/10.1093/pnasnexus/pgaf310) found that correcting overestimates of toxic social media users improved positive emotions and reduced perceived moral decline. [Mernyk et al. (PNAS, 2022, n=4,741)](https://doi.org/10.1073/pnas.2116851119) found effects lasting ~26 days from a single correction. Community Check targets this same mechanism — not what you believe, but what you believe others believe. That's where the distortion lives, and that's where the correction is most effective.
