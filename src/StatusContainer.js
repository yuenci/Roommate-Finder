import {User} from "./ORM/User.js";

export class StatusContainer {
    static loginStatus = false;
    static currentAllRoomsData = {};

    static currentSearchRoomsData = {};

    static currentRoomData = {};

    static fireBaseStore = null;

    static currentUser = null;

    static loginError = "";
}