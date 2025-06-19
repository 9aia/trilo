# Developer Contribution Guide

## Installing

Before proceeding with the installation, ensure you have the following prerequisites installed on your system:

- [Git](https://git-scm.com/downloads)

To set up the development environment, ensure you have the following tools installed:

- [Vscode](https://code.visualstudio.com/download) or any vscode-compatible IDE
- [Bun](https://bun.sh/docs/installation)

For Visual Studio Code, consider installing the following extensions:

- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) (recommended)
- [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) (recommended)
- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

Clone the repository to your local machine:

```sh
git clone https://github.com/9aia/trilo.git
cd trilo/
```

Make sure to install the dependencies:

```bash
bun install
```

## Project Management

At Gaia, we’re dedicated to transparent and community-driven development. Curious about what’s on the horizon or how we bring ideas to life? Dive into our roadmap to stay updated on current progress, upcoming features, and key milestones. From brainstorming sessions to prioritized tasks, we’re excited to share every step of Trilo’s journey with you. Explore the resources below to stay connected and see how Trilo grows with each contribution!

Project management files and documentation can be found in the `pm/` directory. This includes:

- **[Project Overview](/pm/OVERVIEW.md)**: A summary of Trilo's mission, vision, and progress.
- **[Roadmap](/pm/ROADMAP.md)**: Key milestones and planned features to guide development.
- **[Backlog](/pm/BACKLOG.md)**: A collection of tasks and ideas pending implementation.
- **[Todo](/pm/TODO.md)**: The current tasks we’re working on.
- **[Suggestions](/pm/SUGGESTIONS.md)**: Concepts and ideas under review for potential inclusion.
- **[Changelog](/pm/CHANGELOG.md)**: A detailed record of updates, changes, and improvements.

## Developing

### SQL Migrations

Generate SQL migrations:

```bash
pnpm db:generate
```

Apply those migrations:

```bash
pnpm db:migrate
```

### Developing

Once you've installed dependencies with `bun install`, start a development server on `http://localhost:3000`:

```bash
bun run dev

# or start the server and open the app in a new browser tab
bun run dev -- --open
```

### Testing API

For testing the API, we utilize the [Vscode REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client). You can find all the API requests in `./api-client` folder.

> [!NOTE]
> Remember to set the environment by opening Command Palette and selecting `Rest Client: Switch Environment`.

### Committing

// TODO

### Pushing

Once set up, you can push your changes to both repositories with a single command:

```bash
git push
```

## Building

// TODO

Solid apps are built with _presets_, which optimise your project for deployment to different environments.

By default, `bun run build` will generate a Node app that you can run with `bun start`. To use a different preset, add it to the `devDependencies` in `package.json` and specify in your `app.config.js`.

## Releasing and Deploying

// TODO

### Releasing

// TODO

## Useful Links

- [Iconify Icons](https://icon-sets.iconify.design/)

## Reference

For further information, please refer to the official documentation of the relevant technologies.
