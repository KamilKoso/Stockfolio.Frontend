import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, finalize, map, Subject, switchMap, take } from 'rxjs';
import { LoginRequest } from 'src/app/shared/services/user/models/login-request';
import { UserService } from 'src/app/shared/services/user/user.service';
import { Global } from 'src/global';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  showSubmitSpinner = false;
  errors$ = new Subject<Nullable<string>>();

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false),
  });

  constructor(private _userService: UserService, private route: ActivatedRoute, private router: Router) {}

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.showSubmitSpinner = true;
    this.errors$.next(null);
    this._userService
      .login(this.loginForm.value as LoginRequest)
      .pipe(
        switchMap(() => this._userService.getUser()),
        switchMap(() =>
          this.route.queryParams.pipe(
            take(1),
            map(params => params[Global.returnUrlQueryParam] ?? '/')
          )
        ),
        finalize(() => (this.showSubmitSpinner = false)),
        catchError(err => {
          this.errors$.next(err.error.errors[0].code);
          return EMPTY;
        })
      )
      .subscribe(returnUrl => {
        this.router.navigateByUrl(returnUrl);
      });
  }
}
