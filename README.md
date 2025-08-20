# pohlig-aufgabe

## Tech/Frameworks

[Express](https://expressjs.com/)

[Pinia (state management)](https://pinia.vuejs.org/)

[Vue 3](https://vuejs.org/)

[Vuetify 3](https://next.vuetifyjs.com/en/)

[VueUse (Vue composition utilities)](https://vueuse.org/)

## Setup

### Backend

```bash
#  .\pohlig-aufgabe\backend\
npm install
npm run dev
```

### Frontend

```bash
#  .\pohlig-aufgabe\frontend\
npm install
npm run dev
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
│   ├── src/
│   │   ├── assets/         # Preloaded image storage
│   │   ├── components/     # Vue template files
│   │   ├── layouts/        # Reusable components that wrap around pages
│   │   ├── pages/          # Navigatable routes
│   │   ├── plugins/        # Extend Vue application functionality
│   │   ├── stores/         # Pinia stores
│   │   ├── styles/         # Application styles configuring
│   │   ├── App.vue         # Application root
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
└── ... 
```