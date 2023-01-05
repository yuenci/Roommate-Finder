// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// import {getAnalytics,logEvent } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { initializeApp } from "firebase/app";
import {getAnalytics,logEvent } from "firebase/analytics";
import {firebaseConfig} from "./config.js";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
logEvent(analytics, 'page_view');

export class Analysis {
    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.analytics = getAnalytics(this.app);
    }

    logEvent(eventName) {
        logEvent(this.analytics, eventName);
    }
}
