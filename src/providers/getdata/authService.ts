import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/ADD/operator/map';

// ---------------------Online Apis

let result = "https://www.indiantalent.org/webservice/result";
let login = "https://www.indiantalent.org/webservice/login";
let invitschool = "https://www.indiantalent.org/webservice/inviteSchool";
let coordinator = "https://www.indiantalent.org/webservice/becomeCoordinator";
let news = "https://www.indiantalent.org/webservice/news";
let product = "https://www.ebook.indiantalent.org/webservice/product";
let eBookRegister = "https://www.ebook.indiantalent.org/webservice/eBookregister";
let eBookLogin = "https://www.ebook.indiantalent.org/webservice/eBookLogin";
let eBookcart = "https://www.ebook.indiantalent.org/webservice/eBookcart";
let eBookcartview = "https://www.ebook.indiantalent.org/webservice/eBookcartview";
let deleteCart = "https://www.ebook.indiantalent.org/webservice/deleteCart";
let eBookForgot = "https://www.ebook.indiantalent.org/webservice/eBookForgot";
let eBookpayment = "https://www.ebook.indiantalent.org/webservice/eBookpayment";
let eBookOrderview = "https://www.ebook.indiantalent.org/webservice/eBookOrderview";
let eBookOrderDetails = "https://www.ebook.indiantalent.org/webservice/eBookOrderDetails";
@Injectable()
export class AuthService {
private headers:Headers;
  constructor(public http : Http) {    
    this.headers=new Headers();
    this.headers.append('Content-Type', 'application/json; charset=UTF-8');
    this.headers.append('Accept','application/json');
  }


  
  eBookOrderDetails(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      console.log(credentials);
      this.http.post(eBookOrderDetails, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
          console.log(res.json());
        }, (err) => {
          console.log('ERROR',err);
          reject(err);
        });
    });
  }


  eBookOrderview(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      console.log(credentials);
      this.http.post(eBookOrderview, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
          console.log(res.json());
        }, (err) => {
          console.log('ERROR',err);
          reject(err);
        });
    });
  }

  product(type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      console.log(type);
      headers.append('Content-Type', 'application/json');     
      this.http.post(product,JSON.stringify(type),{headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          console.log('ERROR',err);
          reject(err);
        });
    });
  }



  news() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');     
      this.http.post(news, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          console.log('ERROR',err);
          reject(err);
        });
    });
  }


  // function made for login
  resullt(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      console.log(credentials);
      this.http.post(result, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          console.log('ERROR',err);
          reject(err);
        });
    });
  }

  Login(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      console.log(credentials);
      this.http.post(login, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
          console.log(res.json());
        }, (err) => {
          console.log('ERROR',err);
          reject(err);
        });
    });
  }

  eBookpayment(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      console.log(credentials);
      this.http.post(eBookpayment, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
          console.log(res.json());
        }, (err) => {
          console.log('ERROR',err);
          reject(err);
        });
    });
  }


  eBookCart(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      console.log(credentials);
      this.http.post(eBookcart, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
          console.log(res.json());
        }, (err) => {
          console.log('ERROR',err);
          reject(err);
        });
    });
  }

  eBookForgot(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      console.log(credentials);
      this.http.post(eBookForgot, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
          console.log(res.json());
        }, (err) => {
          console.log('ERROR',err);
          reject(err);
        });
    });
  }

  deleteCart(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      console.log(credentials);
      this.http.post(deleteCart, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
          console.log(res.json());
        }, (err) => {
          console.log('ERROR',err);
          reject(err);
        });
    });
  }

  


  eBookCartview(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      console.log(credentials);
      this.http.post(eBookcartview, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
          console.log(res.json());
        }, (err) => {
          console.log('ERROR',err);
          reject(err);
        });
    });
  }
  

  eBookLogin(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      console.log(credentials);
      this.http.post(eBookLogin, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
          console.log(res.json());
        }, (err) => {
          console.log('ERROR',err);
          reject(err);
        });
    });
  }

  eBookRegister(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');      
      this.http.post(eBookRegister, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
          console.log(res.json());
        }, (err) => {
          console.log('ERROR',err);
          reject(err);
        });
    });
  }

  inviteschool(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(invitschool, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          console.log('ERROR',err);
          reject(err);
        });
    });

  }

  coordinator(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(coordinator, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          console.log('ERROR',err);
          reject(err);
        });
    });

  }
   

}