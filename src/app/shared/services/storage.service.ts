import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class StorageService {

  saveLocalStorage(key: string, object: string){
    localStorage.setItem(key, object);
  }

  getLocalStorage(key: string){
    return localStorage.getItem(key);
  }

  removeLocalStorage(key: string){
    localStorage.removeItem(key);
  }

  saveSessionStorage(key: string, object: string){
    sessionStorage.setItem(key, object);
  }

  getSessionStorage(key: string){
    return sessionStorage.getItem(key);
  }

  removeSessionStorage(key: string){
    sessionStorage.removeItem(key);
  }

}
