import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private data = [
      {
        username: "test",
        password: "testUser",
        role: "user"
      },
      {
        username: "admin",
        password: "adminUser",
        role: "admin"
      },
    ]

    public currentUser: string | null = null;
    public userName:string | null = null;

    login(username: string, password: string): boolean {
      for (let item of this.data) {
        if (item.username === username && item.password === password) {
          this.currentUser = item.role;
          console.log(item.role);
          this.userName = username
          localStorage.setItem("userData", JSON.stringify([this.currentUser, username]))
          return true;  // Exit the function early
        }
      }
      return false;            
    }
}
