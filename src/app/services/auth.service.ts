import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  name: string;
  errorMsg: string;

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  
  //Login-method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      this.name = res.user.displayName;
      localStorage.setItem('token', 'true');
      localStorage.setItem('name', res.user.displayName);
      this.router.navigate(['dashboard']);
      if (res.user?.emailVerified == true) {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['varify-email']);
      }
    }, err => {
      this.errorMsg = err.message;
      this.router.navigate(['/login']);
    })
  }


  //guest-login-method
  guestLogin(name: string) {
    this.name = name;
    localStorage.setItem('token', 'true');
    localStorage.setItem('name', name);
    this.router.navigate(['dashboard']);
  }


  //register-method
  register(email: string, password: string, name: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then((res: any) => {
      this.sendEmailForVerification(res.user); //send user verfication e-mail

      // sets the login-name during register process
      res.user.updateProfile({
        displayName: name
      }).then(() => {
        console.log(res.user.displayName);
        // this.router.navigate(['/login']);
      }).catch((updateProfileError: any) => {
        // shows error-message while updating display name
        console.error('Error updating display name:', updateProfileError);
      });
    }, err => {
      this.errorMsg = err.message;
      this.router.navigate(['/register']);
    });
  }


  //e-mail verification-methode
  sendEmailForVerification(user: any) {
    user.sendEmailVerification().then((res: any) => {
      this.router.navigate(['varify-email']);
    }, err => {
      alert(err.message);
    })
  }


  //logout-method
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }


  //send-link-methode
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/varify-email']);
    }, err => {
      alert(err.message);
    })
  }
}
