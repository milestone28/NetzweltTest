export class Loginuserdetails {

    constructor (
        username: string,
        displayName: string,
        roles: string,
    ) {
        this.username = username;
        this.displayName = displayName;
        this.roles = roles;
    }

    username: string;
    displayName: string;
    roles: string;
}