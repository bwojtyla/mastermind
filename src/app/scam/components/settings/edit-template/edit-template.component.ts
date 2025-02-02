import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TemplatesService } from '../../../../core/services/templates.service';
import { TemplateForm } from '../../../../core/forms/template.form';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormProjectComponentModule } from '../../form/form-project/form-project.component';
import { FormInventoryComponentModule } from '../../form/form-inventory/form-inventory.component';
import { FormProjectFileComponentModule } from '../../form/form-project-file/form-project-file.component';
import { FormSshKeyComponentModule } from '../../form/form-ssh-key/form-ssh-key.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.scss']
})
export class EditTemplateComponent implements OnInit {
  form = new TemplateForm();

  constructor(
    private templatesService: TemplatesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.templatesService.getTemplate(Number(this.route.snapshot.paramMap.get('id'))).subscribe(project => {
        this.form.patchValue(project);
      });
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    this.templatesService.save(this.form.value).subscribe(() => {
      this.router.navigateByUrl('/settings/templates');
    });
  }
}

@NgModule({
    declarations: [EditTemplateComponent],
    exports: [EditTemplateComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    FormProjectComponentModule,
    FormInventoryComponentModule,
    FormProjectFileComponentModule,
    FormSshKeyComponentModule,
    MatButtonModule,
    RouterModule,
  ]
})
export class EditTemplateComponentModule {}
