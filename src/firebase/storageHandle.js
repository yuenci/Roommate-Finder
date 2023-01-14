import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
                //console.log(error);
                reject(error);
            });
    });
}