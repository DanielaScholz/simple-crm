export class User {
    firstName: string;
    lastName: string;
    eMail: string;
    dateOfBirth: any;
    address: string;
    postalCode: number;
    city: string;
    country: string;
    notes: Array <string>;
    orders: Array <any>;

    constructor(obj?: any){
        this.firstName = obj? obj.firstName : '';
        this.lastName = obj? obj.lastName : '';
        this.eMail = obj? obj.eMail : '';
        this.dateOfBirth = obj? obj.dateOfBirth : '';
        this.address = obj? obj.address : '';
        this.postalCode = obj? obj.postalCode : '';
        this.city = obj? obj.city : '';
        this.country = obj? obj.country : '';
        this.notes = obj? obj.notes : [];
        this.orders = obj? obj.orders : [];
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
            country: this.country,
            notes: this.notes,
            orders: this.orders
        }
    }

}

export class Order {
     amount: number = 0;
     price: number = 0;
     item: string = '';


    constructor(obj?: any){
        this.amount = obj? obj.amount : 0;
        this.price = obj? obj.price : 0;
        this.item = obj? obj.item : '';
    }

    
    public toJSON(){
        return{
            amount: this.amount,
            price: this.price,
            item: this.item,
        }
    }
}


// export class Order {
//     amount: number = 0;
//     price: number = ;
//     item: string = '';

//     constructor(obj?: any) {
//         if (obj) {
//             this.amount = obj.amount || 0;
//             this.price = obj.price || 0;
//             this.item = obj.item || '';
//         }
//     }

//     public toJSON() {
//         return {
//             amount: this.amount,
//             price: this.price,
//             item: this.item,
//         };
//     }
// }