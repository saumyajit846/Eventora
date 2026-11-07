# Eventora — Event Management Website

A responsive event discovery and registration website built with HTML, CSS and vanilla JavaScript.

## Features

- Responsive homepage with featured event cards.
- Explore Events page with keyword search and category filtering.
- Event details page using a URL query parameter (`event-details.html?id=1`).
- Registration form with name, email, phone and event validation.
- Event selection is pre-filled when registering from an event details page.
- Registration records are saved in browser Local Storage (`eventoraRegistrations`).
- Dark/light theme toggle saved in Local Storage.

## Project structure

```text
eventora/
├── css/
│   └── style.css
├── js/
│   ├── events.js
│   ├── main.js
│   └── registration.js
├── index.html
├── events.html
├── event-details.html
├── register.html
└── README.md
```

## Run locally

1. Open the `eventora` folder in Visual Studio Code.
2. Install or enable the **Live Server** extension.
3. Right-click `index.html` and select **Open with Live Server**.
4. Use the navigation links to visit Explore Events, Event Details and Register.

Do not open only `event-details.html` directly to test the event details page. Open it through an event card, or use a URL such as `event-details.html?id=1`.

## Important notes

- All pages load the same `js/events.js` file, so event information stays consistent.
- `events.js` contains the event data and handles cards, filtering and event details.
- `registration.js` validates the registration form and stores entries in Local Storage.
- `main.js` handles active navigation and the theme toggle.
- This is a front-end demonstration. Local Storage is browser-specific; there is no server, database, payment processing or email delivery.
- Event images are loaded from Unsplash and therefore require an internet connection.

## Deployment

Upload the project folder to a GitHub repository, then connect the repository to GitHub Pages, Netlify or Vercel. No build command is required because this project uses plain HTML, CSS and JavaScript.
