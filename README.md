# Vite + React + Tailwindcss Template

## Installation

Typical installation with `npm i` for dependencies and `npm run dev` to start the server.

## Vite

Server is open in `http://localhost:4000` and is exposed to the network in `http://162.168...:4000` to test it in your mobile browser for example.

## React

It is a simple configuration, with no pre-created components, no `react-router`, no `redux` or `context`... This is to make it easier to use and understand.


## Tailwindcss

It is configured to use dark mode based on a class in the html tag.

```html
<html class="dark">
  ```

Use it with `dark:your-class-name`

```html
<div class="bg-white dark:bg-dark">...</div>
```

## Deployment suggestions

You can publish a static site for free and automatically on [Vercel.com](https://vercel.com/)

- Create your account
- Connect to Github
- Click on New project
- Import your repositioning
- Deploy

Change the domain to something like this:

`project-viligal-morejander.vercel.app`

To this:

`my-cool-name.vercel.app`

Inside your project go to `Settings` from the top menu and then to `Domains`.