# API Reference (repo-specific)

This project primarily uses Next.js server actions (RPC-style server functions) from client components instead of a full set of HTTP REST endpoints. Where an explicit HTTP route exists (for example, NextAuth), it is listed below.

Summary
- Server actions: import server functions from the `src/app/actions` folder and call them directly from client components.
- Authentication: NextAuth is used for session handling at [src/app/api/auth/[...nextauth]/route.js](src/app/api/auth/[...nextauth]/route.js).

## How server actions work
- Location: server actions live in the `src/app/actions` directory (example: [src/app/actions/user.ts](src/app/actions/user.ts)).
- Usage: client components use `use client` and can `import { createUser } from 'src/app/actions/user'` then `await createUser(...)` — Next serializes the call and runs it on the server.
- Constraints: server actions run on the server only. They cannot access browser-only APIs, and arguments/return values must be serializable.

## Repository server actions 
- Users: [src/app/actions/user.ts](src/app/actions/user.ts)
    - `getUser(email)` — returns user by email or null.
    - `createUser(firstName, lastName, email, password, confirm_password)` — creates a user, returns { message } on success or { error } on failure.
- Products (items): [src/app/actions/item.ts](src/app/actions/item.ts)
    - `getAllProducts()` — returns an array of product summaries (calls `getProduct` internally).
    - `getProduct(id)` — returns product details including images.
- Item images: [src/app/actions/item_images.ts](src/app/actions/item_images.ts)
    - `getImage(productId)` — returns an array of image URLs for a product.

## Explicit HTTP routes
- NextAuth: [src/app/api/auth/[...nextauth]/route.js](src/app/api/auth/[...nextauth]/route.js) — session handling and authentication providers via NextAuth. This is an actual HTTP route and must be called through normal NextAuth flows.

## Examples
- Client call to server action (already used in `src/app/signup/page.tsx`):
    
    import { createUser } from "src/app/actions/user";

    // inside a client component on submit
    const res = await createUser(firstName, lastName, email, password, confirmPassword);

- If you prefer an explicit REST endpoint, create an API route under `src/app/api/` and `fetch` it from the client. Use this when you need granular control over headers, CORS, or webhooks.

## Error & response patterns
- Server actions in this repo generally return simple JSON-like objects: either a success shape (e.g., `{ message: '...' }`) or an error shape (e.g., `{ error: '...' }`).
- NextAuth endpoints follow NextAuth response formats (sessions, callbacks, tokens) and should be consumed by NextAuth client APIs.

## Guidance / notes
- Prefer server actions for tight coupling between client UI and server logic within the Next.js app — they avoid writing fetch handlers for internal calls.
- Use explicit API routes when you need:
    - a public REST API consumed by external clients,
    - custom headers or proxying,
    - webhook endpoints that must be reachable externally.
- Keep server action arguments serializable (no functions, DOM nodes, or complex class instances).
- Return consistent timestamps in ISO 8601 when returning dates.