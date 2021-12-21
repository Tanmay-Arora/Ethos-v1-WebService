import { AbstractControl, ValidationErrors, Validators } from "@angular/forms";

export function PasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ?
        {mismatch: true} :
        null;
}