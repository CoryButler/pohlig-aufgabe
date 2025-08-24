# pohlig-aufgabe

This project is a patient management system designed to help healthcare providers efficiently manage patient records and information. It features a modern frontend built with Vue and a backend powered by Express, supporting CRUD operations. The system enables easy organization and editing of patient details in a user-friendly interface.

## Tech/Frameworks

[Express](https://expressjs.com/)

[Yup (schema builder)](https://github.com/jquense/yup)

[Pinia (state management)](https://pinia.vuejs.org/)

[Vue 3](https://vuejs.org/)

[Vuetify 3](https://next.vuetifyjs.com/en/)

[VueUse (Vue composition utilities)](https://vueuse.org/)

## Setup

Open two terminals:  one for the backend and one for the frontend

### Backend

Runs on port 5000

```bash
# cd into .\pohlig-aufgabe\backend\
npm install
npm run dev # runs backend on http://localhost:5000
```

### Frontend

Runs on port 8080

```bash
#  cd into .\pohlig-aufgabe\frontend\
npm install
npm run dev # runs frontend on http://localhost:8080
```

## Project Structure
```
pohlig-aufgabe/
├── backend/                    # Node.js backend
│   ├── src/
│   │   ├── config/             # Server configuration
│   │   ├── controllers/        # Webservice controllers
│   │   ├── middleware/         # Custom middleware
│   │   ├── models/             # Data models
│   │   ├── routes/             # API routes
│   │   ├── schemas/            # Validation schemas
│   │   ├── utils/              # Validation schemas
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── package.json
│   └── ...
│
├── frontend/ # Frontend framework
│   ├── public/                 # URI-accessable resources (favicon.ico)
│   ├── src/
│   │   ├── assets/             # Preloaded image storage (none used currently)
│   │   ├── components/         # Vue template files
│   │   │   ├── App/            # Application-wide UI
│   │   │   ├── Patient/        # Patient-related UI
│   │   │   └── DatePicker.vue  # Date Picker UI
│   │   ├── composables/        # Functions that leverage Vue's Composition API
│   │   ├── constants/          # Immutable global variables
│   │   ├── languages/          # JSON for each available language
│   │   ├── layouts/            # Reusable components that wrap around pages
│   │   ├── pages/              # Navigatable routes
│   │   ├── plugins/            # Extend Vue application functionality
│   │   ├── router/             # Setup Vue Router
│   │   ├── stores/             # Pinia stores for state management
│   │   ├── styles/             # Application styles configuring
│   │   ├── util/               # Utiliy/helper functions
│   │   ├── App.vue             # Application root
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
└── ... 
```

## TODO

If this project is developed further, the following improvements should be implemented.

- Convert backend JSON to a database
- Develop robust backend validation
- Improve API documentation with Swagger
- Create a table for insurances and pharmacies
  - Then update the UI form to use v-select elements
- Make a notes editor to add custom comments on each patient
  - Update patients table
- Include addition filtering and search features