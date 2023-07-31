import { HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from "@angular/forms";

export function setServerSideErrors(error:HttpErrorResponse,form:FormGroup){
    var validationErrors=error.error.errors;
    Object.keys(error.error.errors).forEach(e=>{
        var control=form.get(e);
        if(control){
        control.patchValue('');
        control.setErrors({
            serverError: validationErrors[e].toString()
        })
        }
    })
}