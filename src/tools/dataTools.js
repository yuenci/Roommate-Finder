import {firebaseConfig} from "../firebase/config.js";
import {FBStorage} from "../firebase/storeHandle.js";
import {StatusContainer} from "../StatusContainer.js";
import {User} from "../ORM/User.js";

export function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function validateTPEmail(email){
    const re = /^tp\d{6}@mail\.apu\.edu\.my/gm;
    return re.test(String(email).toLowerCase());
}

// const fbStore = new FBStorage(firebaseConfig)
export function stampToDateStr(stamp) {
    //console.log(stamp);
    if(!stamp){
        return "null";
    }

    return new Date(stamp.seconds * 1000).toLocaleString();
}


export function initFirebase() {
    StatusContainer.fireBaseStore = new FBStorage(firebaseConfig);
    return true;
}

export async function initAllUsersData(){
    console.log("initAllUsersData called");


    const fbStore = StatusContainer.fireBaseStore;

    StatusContainer.currentAllRoomsData = await fbStore.readCollection("rooms");

    //console.log(StatusContainer.currentAllRoomsData);

    return  StatusContainer.currentAllRoomsData ;
}


export async function loginValidation(email, password) {
    let fbStore = StatusContainer.fireBaseStore;
    let data = await fbStore.readDocument("users", email);
    if (data === null) {
        StatusContainer.loginError = "User does not exist";
        return false;
    }
    else if (data.password === password) {
        StatusContainer.loginStatus = true;
        new User(email).initUser().then((user) => {
            StatusContainer.currentUser = user;
            //console.log(user);
        });
        return true;
    }
    else {
        StatusContainer.loginError = "Wrong password";
        return false;
    }
}

export async function ifUserExist(email) {
    let fbStore = StatusContainer.fireBaseStore;
    let data = await fbStore.readDocument("users", email);
    return data !== null;
}


export  function isNumber(str) {
    return !isNaN(Number(str));
}

export async function writeNewUser(user) {
    let fbStore = StatusContainer.fireBaseStore;
    return await fbStore.write("users", {
        name: user.name,
        phone: user.phone,
        email: user.email,
        password: user.password,
        regTimeStamp: new Date()
    }, user.email);
}
export function setLoginExpireTime(email) {
    localStorage.setItem("loginExpireTime",  Date.now().toString());
    localStorage.setItem("loginEmail", email);
    //console.log("setLoginExpireTime");
}

export function getStoredLoginEmail(){
    return localStorage.getItem("loginEmail");
}

export function detectLoginExpire() {
    let expireTime = localStorage.getItem("loginExpireTime");
    let now = Date.now();
    let res =  now - expireTime > 1000 * 60 * 60 * 24 * 7;
    if(res === true){
        localStorage.removeItem("loginExpireTime");
        localStorage.removeItem("loginEmail");
        StatusContainer.currentUser = null;
        StatusContainer.loginStatus = false;
    }

    return res;
    // true if expired
}

export async function getNewRoomID(){
    let fbStore = StatusContainer.fireBaseStore;
    let roomsNum =await fbStore.readDocument("status", "rooms");
    //console.log(roomsNum);
    return roomsNum.number + 1;
}

export async function addOneToRoomsNum(){
    let fbStore = StatusContainer.fireBaseStore;
    return fbStore.addOne("status", "rooms", "number");
}

export async function writeNewPost(data){
    let fbStore = StatusContainer.fireBaseStore;

    let roomID = await getNewRoomID();

    data["roomID"] = roomID;

    fbStore.write("rooms", data, roomID);

    await addOneToRoomsNum();

    await fbStore.readCollection("rooms")

    return true;

}


export  function changeTimeStrTOStamp(timeStr){
    return new Date(timeStr);
}



export  function changeTimeStrListTOStamp(timeStrList){

    return [new Date(timeStrList[0]),new Date(timeStrList[1])];
}