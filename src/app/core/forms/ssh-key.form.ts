import { FormControl, FormGroup } from '@angular/forms';

export class SshKeyForm extends FormGroup {
  constructor() {
    super({
      ID: new FormControl(),
      Title: new FormControl(),
      Key: new FormControl()
    });
  }
}
