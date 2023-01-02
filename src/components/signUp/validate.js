import {Notification} from "@arco-design/web-react";
import {ifUserExist, isNumber, validateTPEmail} from "../../tools/dataTools.js";

export async function ifAllValid(name,phoneAreaCode,phone,email,password){
    if (name === ''  || phone === '' ||phoneAreaCode==="" || email === '' || password === '') {
        Notification.error({
            title: 'Error',
            content: 'Please fill all the blanks',
        });
        return false;
    }

    // email format check
    if (!validateTPEmail(email)) {
        Notification.error({
            title: 'Error',
            content: 'Please enter a valid TP email address',
        });
        return false;
    }



    // if phoneAreaCode is two digits
    if (phoneAreaCode.length !== 2) {
        console.log(phoneAreaCode.length);
        Notification.error({
            title: 'Error',
            content: 'Please enter a valid phone area code',
        });
        return false;
    }

    // if phone number is number
    if (!isNumber(phoneAreaCode + phone)) {
        Notification.error({
            title: 'Error',
            content: 'Please enter a valid phone number',
        });
        return false;
    }

    // if email exist
    let ifExist = await ifUserExist(email);
    if (ifExist) {
        Notification.error({
            title: 'Error',
            content: 'Email already exist',
        });
        return false;
    }

    return true;
}