import { FormControl, FormGroup } from '@angular/forms';
import { JobTypesEnum } from '../enums/job-types.enum';
import { Job } from '../interfaces/job';
import { ApplicationInventory } from '../interfaces/application-inventory';

export class CreateDeploymentForm extends FormGroup {
  constructor() {
    super({
      Application: new FormControl(),
      Inventories: new FormControl(),
      Version: new FormControl(),
    });
  }

  get Application() {
    return this.get('Application') as FormControl;
  }

  get Inventories() {
    return this.get('Inventories') as FormControl;
  }

  get Version() {
    return this.get('Version') as FormControl;
  }

  get deploymentsValue(): Job[] {
    return this.value.Inventories
      .map((value: ApplicationInventory) => ({
        Type: JobTypesEnum.DEPLOYMENT,
        ApplicationID: this.value.Application.ID,
        Version: this.value.Version,
        InventoryID: value.Inventory.ID,
        KeyID: value.KeyID,
        ExtraVariables: value.ExtraVariables
      }));
  }
}
