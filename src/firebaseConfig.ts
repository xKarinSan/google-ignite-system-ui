import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
const firebaseConfig = {
    apiKey: import.meta.env.VITE__FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE__AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE__DATABASE_URL,
    projectId: import.meta.env.VITE__PROJECT_ID,
    storageBucket: import.meta.env.VITE__STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE__MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE__APP_ID,
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
