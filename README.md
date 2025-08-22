# pohlig-aufgabe

## Tech/Frameworks

[Express](https://expressjs.com/)

[Pinia (state management)](https://pinia.vuejs.org/)

[Vue 3](https://vuejs.org/)

[Vuetify 3](https://next.vuetifyjs.com/en/)

[VueUse (Vue composition utilities)](https://vueuse.org/)

## Setup

Open two terminals:  one for the backend and one for the frontend

### Backend

```bash
# cd into .\pohlig-aufgabe\backend\
npm install
npm run dev # runs backend on http://localhost:5000
```

### Frontend

```bash
#  cd into .\pohlig-aufgabe\frontend\
npm install
npm run dev # runs frontend on http://localhost:8080
```

## Project Structure
```
pohlig-aufgabe/
├── backend/ # Node.js backend
│   ├── src/
│   │   ├── config/         # Server configuration
│   │   ├── controllers/    # Webservice controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Data models
│   │   ├── routes/         # API routes
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── package.json
│   └── ...
│
├── frontend/ # Frontend framework
│   ├── public/             # URI-accessable resources (favicon.ico)
│   ├── src/
│   │   ├── assets/         # Preloaded image storage
│   │   ├── components/     # Vue template files
│   │   ├── composables/    # Functions that leverage Vue's Composition API
│   │   ├── constants/      # Immutable global variables
│   │   ├── languages/      # JSON for each available language
│   │   ├── layouts/        # Reusable components that wrap around pages
│   │   ├── pages/          # Navigatable routes
│   │   ├── plugins/        # Extend Vue application functionality
│   │   ├── router/         # Setup Vue Router
│   │   ├── stores/         # Pinia stores for state management
│   │   ├── styles/         # Application styles configuring
│   │   ├── util/           # Utiliy/helper functions
│   │   ├── App.vue         # Application root
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
└── ... 
```