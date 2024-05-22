# module-federation-override-fetch

This project uses `pnpm` and `turbo` to manage workspaces and run development scripts efficiently.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

-   Node.js (>= 20.x)
-   `pnpm` (>= 8.x)

## Installation

First, install the dependencies using `pnpm`:

```sh
pnpm install
```

Then run the project locally:

```sh
pnpm dev:mfe-override-fetch
```

This command will start 3 servers:

-   `http://localhost:3000/`: host server
-   `http://localhost:3001/`: Home static assets
-   `http://localhost:3002/`: List static assets
