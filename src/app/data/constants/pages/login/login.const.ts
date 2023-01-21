import { IField } from '../../../interfaces/forms/ifield.metadata';
import { ValidationsService } from '../../../../shared/services/validations/validations.service';
import { ENUM_VALIDATION_OPTIONS } from 'src/app/data/enum';
import { ERRORS_VALIDATIONS } from '../../error/errors-validations.const';
export const CONST_LOGIN_PAGE:{
    FORM:{
        username: IField;
        password: IField;
    }
}={
        FORM:{
            username:{
                valor: '',
                error: ERRORS_VALIDATIONS.EMAIL_REQUIRED_FLIED,
                isValid(){
                    const validationsService = new ValidationsService();
                    const validateEmail =  validationsService.validateField(this.valor,ENUM_VALIDATION_OPTIONS.EMAIL);
                    this.error = validateEmail.msg;
                    
                    return validateEmail.isvalid;
                }
            },
            password:{
                valor: '',
                error: ERRORS_VALIDATIONS.PASSWORD_REQUIRED_FIELD,
                isValid(){
                    const validationsService = new ValidationsService();
                    const validatePassword =  validationsService.validateField(this.valor,ENUM_VALIDATION_OPTIONS.PASSWORD);
                    this.error = validatePassword.msg;
                    return validatePassword.isvalid;
                }
            }
        }
    }
