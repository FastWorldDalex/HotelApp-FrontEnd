export class Rol {
  constructor(){

  }
  id?:            number=0;
  name:       string='';
  modules_list:      string[]=[];
  status:         number=0;
  created_date?:  Date;
}
export interface RolDTO {
  id?:            number;
  name:       string;
  modules:      string;
  status:         number;
}

export interface RolInput {
  id?:            number;
  name:       string;
  modules:      string;
  status:         number;
}

