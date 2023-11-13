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

  //Register-method
  // register(email: string, password: string, name: string) {
  //   this.fireauth.createUserWithEmailAndPassword(email, password).then((res: any) => {
  //     alert('Registration successful');
  //     this.sendEmailForVerification(res.user);
  //     res.user.updateProfile({
  //       displayName: name
  //     })
  //     console.log(res.user.displayName);
      
  //     // this.router.navigate(['/login']);
  //   }, err => {
  //     alert(err.message); 
  //     this.router.navigate(['/register']);
  //   })
  // }


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
        // Fehler beim Aktualisieren des Anzeigenamens
        console.error('Error updating display name:', updateProfileError);
      });
    }, err => {
      this.errorMsg = err.message;
      this.router.navigate(['/register']);
    });
  }
  

  //E-mail varification methode
  sendEmailForVerification(user: any) {
    user.sendEmailVerification().then((res: any) => {
      this.router.navigate(['varify-email']);
    }, err => {
      alert(err.message);
    })
  }

  //Logout-method
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  //Send-link methode
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/varify-email']);
    }, err => {
      alert(err.message);
    })
  }
}
