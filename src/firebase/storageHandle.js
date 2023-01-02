import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
import {firebaseConfig} from "./config.js";


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export function uploadImage(name, file) {
    const storageRef = ref(storage, name);
    // uploadBytes(storageRef, file).then((snapshot) => {
    //     console.log('Uploaded a blob or file!');
    // });
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then(
                    (downloadURL) => {
                        console.log('File available at', downloadURL);
                        resolve(downloadURL);
                    }
                )
            }
        );
    });


}