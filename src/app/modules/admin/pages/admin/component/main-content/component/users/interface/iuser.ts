export class User {
  constructor(){

  }
  id?:            number=0;
  username:       string='';
  firstname:      string='';
  lastname:       string='';
  password:       string='';
  role_id?:       number=0;
  status:         number=0;
  created_date?:  Date;
  role?:          Role;
}
export interface UserDTO {
  id?:            number;
  username:       string;
  firstname:      string;
  lastname:       string;
  role_id?:       number;
  status:         number;
}
export interface UserInput {
  id?:            number;
  username:       string;
  firstname:      string;
  lastname:       string;
  password:       string;
  role_id?:       number;
  status:         number;
}

export class Role {
  constructor(){

  }
  id?:        number=0;
  name:       string='';
  modules:    string='';
  status:     string='';
}
