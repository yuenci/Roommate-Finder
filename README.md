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

## Firebase
```bash
$ npm install firebase
```

## pageClip
```bash
npm install --save pageclip
```

## emailjs
```bash
$ npm install @emailjs/browser --save
## can use post method to send email, no need to use emailjs npm package
```

## axios
```bash
$ npm install axios
```


# Test
```jsx
        // 新加坡服务器
        // axios.post("http://43.134.228.150:5000/sendEmail", data).then(
        //     (res) => {
        //         console.log(res.data);
        //     }
        // )

        // axios.post("http://localhost:7071/api/HttpTrigger1", data).then(
        //     (res) => {
        //         console.log(res.data);
        //     }
        // )

        // azure function
        axios.post("https://emailproxy.azurewebsites.net/api/httptrigger1", data).then(
            (res) => {
                console.log(res.data);
            }
        )
```

# Toggle dark mode
https://github.com/JoseRFelix/react-toggle-dark-mode
```bash
npm i react-toggle-dark-mode
```