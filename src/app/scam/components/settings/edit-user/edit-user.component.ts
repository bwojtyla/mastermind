import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsersService } from '../../../../core/services/users.service';
import { UserForm } from '../../../../core/forms/user.form';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  form = new UserForm();

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.usersService.getUser(Number(this.route.snapshot.paramMap.get('id'))).subscribe(user => {
        this.form.patchValue(user);
      });
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    this.usersService.save(this.form.value).subscribe(() => {
      this.router.navigateByUrl('/settings/users');
    });
  }
}

@NgModule({
    declarations: [EditUserComponent],
    exports: [EditUserComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    RouterModule,
  ]
})
export class EditUserComponentModule {}
