import { inject } from '@angular/core';
import { Firestore, collection, doc, addDoc } from '@angular/fire/firestore';

export class User {
    // firestore: Firestore = inject(Firestore);

    firstName: string;
    lastName: string;
    eMail: string;
    dateOfBirth: Date;
    address: string;
    postalCode: number;
    city: string;
    country: string;

    constructor(obj?: any){
        this.firstName = obj? obj.firstName : '';
        this.lastName = obj? obj.lastName : '';
        this.eMail = obj? obj.eMail : '';
        this.dateOfBirth = obj? obj.dateOfBirth : '';
        this.address = obj? obj.address : '';
        this.postalCode = obj? obj.postalCode : '';
        this.city = obj? obj.city : '';
        this.country = obj? obj.country : '';
    }

    public toJSON(){
        return{
            firstName: this.firstName,
            lastName: this.lastName,
            eMail: this.eMail,
            dateOfBirth: this.dateOfBirth,
            address: this.address,
            postalCode: this.postalCode,
            city: this.city,
            country: this.country
        }
    }

    // public getUsersColl(){
    //     return collection(this.firestore, 'users');
    // }


}