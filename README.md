# Stock

## Demo
[See Demo](https://ravid7000.github.io/shiny-spoon/)

## Setup
Clone this repo:
```
git clone https://github.com/ravid7000/shiny-spoon.git
```

I'm using Create-React-App boilerplate
```
npm i
```

Start local development server:
```
npm start
```

## Director Structure
```
-- .env // environment file
-- src
    |- Components // Global Components
        |- Autocomplete // custom autocomplete component
        |- StockDetails
        |- StockGraph // Rechart configured component
        |- Table
    |- HiverStock // Home page component
    |- utils
        |- api.js // utils for all api
        |- apiMiddleware.js // Custom middleware for Redux to handle api related actions
        |- helper.js // Helper function to fromat data
        |- stockReducer.js // Single reducer for Redux
        |- store.js // Redux store
    |- index.js // Enter file
    |- styles.scss // global styles. I'm using reset.css
```
## Tech
React, Redux, Fetch, Recharts and Redux Custom middleware to handle api request.

