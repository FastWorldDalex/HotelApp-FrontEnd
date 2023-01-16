import { Injectable } from '@angular/core';
import { ENUM_VALIDATION_OPTIONS } from '../../../data/enum/validations-options.enum';
import { IResponseValidations } from '../../../data/interfaces/services/Iresponse-validations.metadata';
import { ERRORS_VALIDATIONS } from 'src/app/data/constants';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }
/**
 * @param value any -> email a validar
 * @param type ENUM_VALIDATION_OPTIONS -> opciones a validar
 */
  public validateField(value:any, type: ENUM_VALIDATION_OPTIONS){
    switch(type){
      case ENUM_VALIDATION_OPTIONS.EMAIL:
        return this.validateEmail(value);
      case ENUM_VALIDATION_OPTIONS.PASSWORD:
          return this.validatePassword(value);
    }
    
  }


/**
 * @param value any -> email a validar
 */
  private validateEmail(value: any):IResponseValidations{
    const r:IResponseValidations = {
      msg: '',
      isvalid: true
    }
     // tslint: disable-next-line: max-line-lenght
     const pattern = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{3,3})+$/;
     r.isvalid = pattern.test(value);
     if(r.isvalid){
      r.msg = ERRORS_VALIDATIONS.EMAIL_VALID;
     }else{
     r.msg = (value ==='')? ERRORS_VALIDATIONS.EMAIL_REQUIRED_FLIED:ERRORS_VALIDATIONS.EMAIL_INVALID ;}
    return r;
  }

  /**
   * @param value any -> password a validar
   */
  private validatePassword(value:string):IResponseValidations{
    const r: IResponseValidations = {
      msg:'',
      isvalid: true
    }
    const pattern = /.{8,}/;
    r.isvalid = pattern.test(value);
    if(r.isvalid){
      r.msg = ERRORS_VALIDATIONS.PASSWORD_VALID;
    }else{
    r.msg = (value === '')? ERRORS_VALIDATIONS.PASSWORD_REQUIRED_FIELD: ERRORS_VALIDATIONS.PASSWORD_REQUIRED_PATTERN;}
    return r;
  }
 
}
