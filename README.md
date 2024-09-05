# Customer Logger - Built with Hono, Cloudflare Pages and D1

This customer logger is designed to simplify the way students interact with clients. Built using the powerful combination of Hono for backend logic, Cloudflare Pages for fast and secure hosting, and Cloudflare D1 for seamless database management.

## Features

-   **Customer Listings**: Access a basic list of clients to easily track who has visited the service desk.
-   **Dark Theme Mode (TODO)**: Enhance your viewing experience with a built-in dark theme mode.
-   **Simple Authentication**: Secure your data with basic authentication provided by Hono/Basic Auth.

## Demo

![demo](./demo.gif)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js
-   npm

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/JaredStanbrook/it-service-desk
    ```
2. Install NPM packages:
    ```sh
    npm install
    ```
3. Start the development server:
    ```sh
    npm run dev
    ```
4. Copy the wrangler config file
    ```sh
    cp wrangler.example.toml wrangler.toml
    ```
5. Create a DB with Wrangler and copy config to wrangler.toml
    ```
    npx wrangler d1 create <DATABASE_NAME>
    ```
6. Seed remote DB with data
    ```sh
    npx wrangler d1 execute <DATABASE_NAME> --remote --file=./schema.sql
    ```
    ## Contributing

This is intended to be worked on by Murdoch University students studying ICT299. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request (`https://docs.github.com/en/pull-requests`)

## License

Distributed under the MIT License.

## Resources

-   [Hono](https://honojs.dev/)
-   [Cloudflare Pages](https://pages.cloudflare.com/)
-   [Cloudflare D1](https://www.cloudflare.com/products/d1/)
