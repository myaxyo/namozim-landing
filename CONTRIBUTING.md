# Contributing to Namozim Web

First off, thank you for considering contributing to Namozim Web! It is people like you that make open source such a great community.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to ensure the issue hasn't already been reported.

When creating a bug report, please include as much detail as possible:
* **A clear and descriptive title**
* **Steps to reproduce the problem**
* **Expected behavior vs. actual behavior**
* **City or region tested** (e.g., Tashkent, Samarkand, Moscow, etc.)
* **Screenshots or console errors**, if applicable
* **Device / browser version**

### Suggesting Enhancements

Feature suggestions and improvement requests are welcome! Please open an issue and include:
* The motivation behind the suggested feature
* A clear and concise description of what should happen
* Any mockups or references if relevant

### Adding or Correcting Prayer Data

If you notice an inaccuracy in prayer times, prayer offsets, or city coordinates:
1. Identify the file in `src/data/`:
   * `src/data/cities.ts` — Cities in Uzbekistan and Central Asia
   * `src/data/uzOfficialOffsets.ts` — Official minute offsets for Uzbekistan regions
   * `src/data/districts.ts` — District mappings
   * `src/data/internationalCities.ts` — International cities list
   * `src/data/translations.ts` — Multi-language strings
2. Cite the official source (e.g. Muslim Board of Uzbekistan circular or municipal religious authority).
3. Open a Pull Request with the proposed adjustments.

## Development Workflow

### Prerequisites
* [Node.js](https://nodejs.org/) v20.x or later
* [npm](https://www.npmjs.com/) or another package manager

### Setup
1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/namozim-landing.git
   cd namozim-landing
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy the environment variables:
   ```bash
   cp .env.example .env.local
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

### Code Style & Guidelines
* **TypeScript**: Use strict typing and avoid `any`.
* **Tailwind CSS**: Follow existing utility class patterns and semantic color variables.
* **Linting**: Run `npm run lint` before committing. Ensure there are zero errors or warnings.
* **Testing Builds**: Run `npm run build` locally to verify static generation passes cleanly.

### Submitting a Pull Request
1. Create a new branch with a descriptive name:
   ```bash
   git checkout -b fix/offset-andijan
   # or
   git checkout -b feat/export-calendar-pdf
   ```
2. Commit your changes with clear, descriptive commit messages.
3. Push your branch to GitHub:
   ```bash
   git push origin feat/your-feature-name
   ```
4. Open a Pull Request against the `main` branch.
5. Fill out the PR template with relevant details and screenshots.

Thank you for contributing to Namozim!
