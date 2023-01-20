import {Message} from "@arco-design/web-react";
import {isNumber, isOnlyContainLetterAndSpace, validateTPEmail} from "../../tools/dataTools.js";

export async function ifAllValid(name,phoneAreaCode,phone,email,password){
    if (name === ''  || phone === '' ||phoneAreaCode==="" || email === '' || password === '') {
        Message.error('Please fill all the blanks');
        return false;
    }

    // email format check
    if (!validateTPEmail(email)) {
        Message.error('Please enter a valid TP email address');
        return false;
    }



    // if phoneAreaCode is two digits
    if (phoneAreaCode.length !== 2) {
        //console.log(phoneAreaCode.length);
        Message.error('Please enter a valid phone area code');
        return false;
    }

    // if phone number is number
    if (!isNumber(phoneAreaCode + phone)) {
        Message.error('Please enter a valid phone number');
        return false;
    }

    // name just contains letters and spaces
    if (!isOnlyContainLetterAndSpace(name)) {
        Message.error('Please enter a valid name');
        return false;
    }

    // if email exist
    // let ifExist = await ifUserExist(email);
    // if (ifExist) {
    //     Notification.error({
    //         title: 'Error',
    //         content: 'Email already exist',
    //     });
    //     return false;
    // }

    return true;
}