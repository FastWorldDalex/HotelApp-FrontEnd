export class User {
    constructor(){
        
    }
    id?:            number=0;
    username:       string='';
    firstname:      string='';
    lastname:       string='';
    status:         number=0;
    role_id?:       number=0;
    created_date?:  Date;
    role?:          Role;
}

export class Role {
    constructor(){

    }
    id?:        number=0;
    name:       string='';
    modules:    string='';
    status:     string='';
}