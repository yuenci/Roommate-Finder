import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
import {firebaseConfig} from "./config.js";


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


// export async function uploadImageWithRandomName(file) {
//     // get time stamp
//     const timeStamp = Date.now().toString();
//     return await uploadImage(timeStamp, file);
// }

export function uploadImageWithRandomName(name,file) {
    // get time stamp
    const timeStamp = Date.now().toString();

    const storageRef = ref(storage, timeStamp+name);

    return new Promise((resolve, reject) => {
        uploadBytes(storageRef, file)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    resolve(url);
                });
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}