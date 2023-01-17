import {firebaseConfig} from "../firebase/config.js";
import {FBStore} from "../firebase/storeHandle.js";
import {StatusContainer} from "../StatusContainer.js";
import {User} from "../ORM/User.js";
import {FBAuth} from "../firebase/authHandler.js";

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

export function stampToDateObj(stamp) {
    //console.log(stamp);
    if(!stamp){
        return "null";
    }

    return new Date(stamp.seconds * 1000);
}

export function timeStampToDateStr(stamp) {
    //console.log(stamp);
    if(!stamp){
        return "null";
    }

    let date = new Date(stamp.seconds * 1000);
    let  month = monthToMonthStr(date.getMonth() + 1);
    let day = dayToDayStr(date.getDate());
    let year = date.getFullYear();
    // return `${day} ${month} ${year}`;


    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    return `${day} ${month} ${year} ${hour}:${minute}:${second}`;

}

function monthToMonthStr(month){
    switch (month){
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
    }
}

function dayToDayStr(day){
    switch (day){
        case 1:
            return "1st";
        case 2:
            return "2nd";
        case 3:
            return "3rd";
        case 4:
            return "4th";
        case 5:
            return "5th";
        case 6:
            return "6th";
        case 7:
            return "7th";
        case 8:
            return "8th";
        case 9:
            return "9th";
        case 10:
            return "10th";
        case 11:
            return "11th";
        case 12:
            return "12th";
        case 13:
            return "13th";
        case 14:
            return "14th";
        case 15:
            return "15th";
        case 16:
            return "16th";
        case 17:
            return "17th";
        case 18:
            return "18th";
        case 19:
            return "19th";
        case 20:
            return "20th";
        case 21:
            return "21st";
        case 22:
            return "22nd";
        case 23:
            return "23rd";
        case 24:
            return "24th";
        case 25:
            return "25th";
        case 26:
            return "26th";
        case 27:
            return "27th";
        case 28:
            return "28th";
        case 29:
            return "29th";
        case 30:
            return "30th";
        case 31:
            return "31st";
    }
}

export function initFirebase() {
    StatusContainer.fireBaseStore = new FBStore(firebaseConfig);
    return true;
}

export async function initAllRoomsData(){
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
export function setLoginExpireTime(email,keepLogin) {
    localStorage.setItem("loginExpireTime",  Date.now().toString());
    localStorage.setItem("loginEmail", email);
    localStorage.setItem("keepLogin", keepLogin);
    //console.log("setLoginExpireTime");
}

export function getStoredLoginEmail(){
    return localStorage.getItem("loginEmail");
}

export function deleteLoginExpireTime() {
    localStorage.removeItem("loginExpireTime");
    localStorage.removeItem("loginEmail");
    //console.log("deleteLoginExpireTime");
}

export function detectLoginExpire() {
    let expireTime = localStorage.getItem("loginExpireTime");
    let now = Date.now();
    let res
    if (localStorage.getItem("keepLogin") === "true") {
        res =  now - expireTime > 1000 * 60 * 60 * 24 * 7;
    }else{
        res =  now - expireTime > 1000 * 60 * 60 * 24;
    }
    // console.log( now - expireTime )
    if(res === true){
        new FBAuth().logout().then(
            () => {
                localStorage.removeItem("loginExpireTime");
                localStorage.removeItem("loginEmail");
                localStorage.removeItem("keepLogin");
                StatusContainer.currentUser = null;
                StatusContainer.loginStatus = false;
            }
        )
    }

    return res;
    // true if expired
    // false if not expired
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

export async function writeNewPost(data, roomID) {
    let fbStore = StatusContainer.fireBaseStore;
    //console.log("roomID", roomID);


    if(roomID === ""){
        roomID = await getNewRoomID();
        await addOneToRoomsNum();
    }

    data["roomID"] = roomID;

    fbStore.write("rooms", data, roomID);

    await fbStore.readCollection("rooms")

    StatusContainer.currentRoomData  = {};

    return true;

}


export  function changeTimeStrTOStamp(timeStr){
    return new Date(timeStr);
}



export  function changeTimeStrListTOStamp(timeStrList){

    return [new Date(timeStrList[0]),new Date(timeStrList[1])];
}


export function captionFirstCharToUpper(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getRegDateFromUser(user){
    const  date = Number(user.metadata.createdAt);
    // stamp to date
    //console.log(new Date(date).toLocaleString());
    return new Date(date).toLocaleString();
}

export function isOnlyContainLetterAndSpace(content){
    const re = /^[a-zA-Z ]*$/;
    return re.test(content);
}

export function getName(user) {
    return user.displayName.split("-")[0];
}

export function getPhone(user) {
    return user.displayName.split("-")[1];
}