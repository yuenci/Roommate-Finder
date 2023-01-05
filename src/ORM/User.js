import {stampToDateStr, writeNewUser} from "../tools/dataTools.js";
import {StatusContainer} from "../StatusContainer.js";


export class User {
    constructor(email){
        this._email = email;
        this._name = "";
        this._phone = "";
        this._password = "";
        this._regTimeStamp = "";
        this._avatarUrl = "";
    }

    async registerUser(name,phone,email,password) {
        this._name = name;
        this._phone = phone;
        this._email = email;
        this._password = password;
        this._regTimeStamp = new Date();
        return await writeNewUser(this);
    }
//[age,name.password,phone,regTimeStamp]


     async initUser() {
        let data = await StatusContainer.fireBaseStore.readDocument("users",this._email);
        this._name = data.name;
        this._phone = data.phone;
        this._password = data.password;
        this._phone = data.phone;
        this._regTimeStamp = stampToDateStr(data.regTimeStamp);
        this._avatarUrl = data.avatarUrl;
        return this;
    }

    updateData() {
        StatusContainer.fireBaseStore.update("users",{
            name: this._name,
            phone: this._phone,
            password: this._password},this._email);
    }


    // region Getters and Setters
    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get phone() {
        return this._phone;
    }

    set phone(value) {
        this._phone = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get regTimeStamp() {
        return this._regTimeStamp;
    }

    set regTimeStamp(value) {
        this._regTimeStamp = value;
    }


    get avatarUrl() {
        return this._avatarUrl;
    }

    set avatarUrl(value) {
        this._avatarUrl = value;
    }

// endregion

}