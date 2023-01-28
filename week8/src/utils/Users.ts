import bcrypt from 'bcrypt';

export class User {
    id: string;
    name: string;
    password : string;

    constructor(id: string, setName :string, setPassword :string){
        this.id = id;
        this.name = setName;
        this.password = setPassword;
    }
}