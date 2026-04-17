# Contributing

Thanks for your interest in contributing to Community Check.

## What this project is

Community Check is a design proposal for an intervention that attaches representative public opinion data to viral social media posts. The repository contains the technical specification, research base, FAQ, and the interactive essay at [thenoisyroom.com](https://thenoisyroom.com).

## How to contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b my-change`)
3. Make your changes
4. Test locally by opening `index.html` in a browser (for essay changes)
5. Commit your changes (`git commit -m 'Description of change'`)
6. Push to your branch (`git push origin my-change`)
7. Open a Pull Request

## What we're looking for

**Specification:**
- Critique and refinement of the [technical spec](docs/technical-spec.md)
- Answers or approaches to the [open questions](docs/open-questions.md)
- International polling sources and adaptation strategies

**Research:**
- Additional peer-reviewed citations relevant to the design
- Counter-evidence or limitations we haven't addressed
- Replication studies on metaperception correction

**Essay (thenoisyroom.com):**
- Accessibility improvements
- Mobile experience fixes
- Translations
- Bug fixes

## Code style (for the essay)

- The essay is a single-file HTML application (`index.html`). All CSS, HTML, and JavaScript live in one file. This is intentional — it keeps the project portable and easy to deploy.
- Use CSS custom properties for theming
- Support both light and dark modes
- All external claims must link to peer-reviewed research or established polling organizations

## Documentation style

- Write clearly and concisely
- Include citations with DOIs or stable URLs
- When referencing polling data, include: provider, sample size, date, and exact question wording

## Reporting issues

Open an issue on GitHub with:
- What you expected to happen
- What actually happened
- Browser and device info (for essay bugs)
- Screenshots if relevant
