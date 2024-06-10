import { FormGroup } from "@angular/forms";

/* validatte form fields */
export const validateField = (form) => {
    Object.keys(form.controls).forEach(field => {
        const controls: any = form.get(field);
        if (controls.value && typeof controls.value == 'object' && typeof controls.value != 'string' && !Array.isArray(controls.value)) {
            Object.keys(controls.controls).forEach(subField => {
                const subControls = (form.get(field) as FormGroup).get(subField);
                subControls.markAsTouched({ onlySelf: true });
            })
        } else {
            controls.markAsTouched({ onlySelf: true });
        }
    })
}

