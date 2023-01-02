# Install
```bash
$ yarn
# install dependencies

$ yarn dev
# run development server

$ yarn build
# build for production
```

# Dependencies
## Firebase
```bash
$ npm install firebase@9.13.0 --save
# https://firebase.google.com/docs/web/setup#available-libraries
```
```javascript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
```

## Arco Design
```bash
$ yarn add @arco-design/web-react
```
```javascript
import { Button } from '@arco-design/web-react';
import "@arco-design/web-react/dist/css/arco.css";
```

## React Router
```bash
$ yarn add react-router-dom
```
```javascript
import { BrowserRouter as Router } from "react-router-dom";
```

## tailwindcss
```bash
$ npm install -D tailwindcss postcss autoprefixer
$ npx tailwindcss init -p
```

## PubSub
```bash
$ npm install pubsub-js
```
```javascript
import PubSub from 'pubsub-js';
```

## SVGR
```bash
$ npm i vite-plugin-svgr
# or
$ yarn add vite-plugin-svgr
```
```javascript
//vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
});
```
```javascript
import { ReactComponent as Logo } from "./logo.svg";
```
