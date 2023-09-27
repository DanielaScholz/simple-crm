export class User {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    address: string;
    postalCode: number;
    city: string;
    country: string;

    constructor(obj?: any){
        this.firstName = obj? obj.firstName : '';
        this.lastName = obj? obj.lastName : '';
        this.dateOfBirth = obj? obj.dateOfBirth : '';
        this.address = obj? obj.address : '';
        this.postalCode = obj? obj.postalCode : '';
        this.city = obj? obj.city : '';
        this.country = obj? obj.country : '';
    }


}