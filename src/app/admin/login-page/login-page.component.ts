import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/interfaces';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [ './login-page.component.scss' ]
})
export class LoginPageComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  get emailControl(): AbstractControl | null {
    return this.form.get('email');
  }

  get passwordControl(): AbstractControl | null {
    return this.form.get('password');
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [ Validators.email, Validators.required ]),
      password: new FormControl(null, [ Validators.required, Validators.minLength(6) ])
    });
  }

  submit(): void {

    if (this.form.valid) {
      const { email, password } = this.form.value;
      const user: User = { email, password };

      this.auth.login(user)
        .subscribe(() => {
          this.form.reset();
          this.router.navigate([ '/admin', 'dashboard' ]);
        });
    }
  }

  isInvalidControl(field: 'email' | 'password'): boolean {
    const control = this.form.get(field);
    return !!control && control.touched && control.invalid;
  }
}
