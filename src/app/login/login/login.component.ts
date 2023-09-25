import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	Output,
	EventEmitter,
	Input,
} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	@Output() onLogin = new EventEmitter<boolean>();
	@ViewChild('passwordField') passwordField: ElementRef;
	isLoggedIn: boolean;
	userName = '';
	userNameFocused = false;
	userNamePopulated = false;
	password = '';
	passwordFocused = false;
	passwordPopulated = false;
	showForgotPassword: boolean;

	constructor(
		private shared: SharedService,
		private http: HttpClient,
		private router: Router
	) {}

	ngOnInit() {
		this.showForgotPassword = false;
	}

	focusChanged(ctrl: string, isFocused: boolean) {
		switch (ctrl) {
			case 'userName':
				this.userNameFocused = isFocused;
				this.userNamePopulated = this.userName.length > 0;
				break;
			case 'password':
				this.passwordFocused = isFocused;
				this.passwordPopulated = this.password.length > 0;
				break;
		}
	}

	login() {
		const userName = this.userName.trim();
		const password = this.password.trim();
		const authPath = "https://9lwaroch9i.execute-api.us-east-2.amazonaws.com/prod/";
		const params = new HttpParams()
			.append('application', '1')
			.append('user', userName)
			.append('password', password);
		this.http
			.get(authPath + 'appAuthentication/login', {
				params,
				withCredentials: false,
			})
			.subscribe(
				(response: any) => {
					if (response.errorMessage) {
						return;
					}
					const data: any = JSON.parse(
						response.body
					);
					if (data.status === 'OK') {
						this.isLoggedIn = true;
						this.onLogin.emit(this.isLoggedIn);
						this.shared.appUser = data.permissions;
						this.shared.appUser.identity = data.identity;
						if (data.permissions.profilePhoto) {
							this.shared.appUser.profilePhoto =
								data.permissions.profilePhoto;
						} else {
						}
						this.shared.setToken(data.identity.token);
					}
				},
				(error) => {
					return;
				}
			);
	}

  userNameKeyUp(event: any) {
		if (event.which === 13) {
			this.passwordField.nativeElement.focus();
		}
	}

	passwordKeyUp(event: any) {
		if (event.which === 13) {
			this.login();
		}
	}
}
