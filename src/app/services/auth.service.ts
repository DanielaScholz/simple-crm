import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { getAuth } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  //Login-Method

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['dashboard']);

      if (res.user?.emailVerified == true) {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['varify-email']);
      }

    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  //Register-method

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Registration successful');
      this.router.navigate(['/login']);
      this.sendEmailForVarification(res.user);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register'])
    })

  }

  //E-mail varification methode
  sendEmailForVarification(user:any){
    user.sendEmailForVarification().then((res: any) =>{
      this.router.navigate(['varify-email'])
    }, err =>{
      alert(err.message);
    })

  }


  //Logout-method
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login'])
    }, err => {
      alert(err.message)
    })
  }

  //Send link
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      alert('Link is sent to you');
      this.router.navigate(['/varify-email']);
    }, err => {
      alert(err.message);
    })
  }



}
