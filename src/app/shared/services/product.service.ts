import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IProduct } from '../interface'; // Adjust the import path as needed

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string = 'https://fakestoreapi.com/';

  private products: Array<IProduct> = [];
  private categories : Array<string> = []

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<IProduct[]> {
    if (this.products.length > 0) {
      return of(this.products); // Return cached products if available
    }

    return this.http.get<IProduct[]>(this.url + "products").pipe(
        tap(data => {
            console.log(data);            
            this.products = data
        }), // Cache the fetched products
        catchError(this.handleError) // Handle errors
    );
  }

  getCategory(category: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url + "products/category/" + category).pipe(
        tap(data => {
            console.log(data);            
            this.products = data
        }), // Cache the fetched products
        catchError(this.handleError) // Handle errors
    );
  }

  getAllCategories(): Observable<string[]> {
    if (this.categories.length > 0) {
      return of(this.categories); // Return cached products if available
    }

    return this.http.get<string[]>(this.url + "products/categories").pipe(
        tap(data => {
            console.log("cat" ,data);            
            this.categories = data
        }), // Cache the fetched products
        catchError(this.handleError) // Handle errors
    );
  }

  deleteProduct(id: number): Observable<IProduct[]> {
    return this.http.delete<IProduct[]>(this.url + "products/" + id).pipe(
        tap(data => {
          this.products = this.products.filter(product => product.id !== id);
            console.log(this.products);            
        }), // Cache the fetched products
        catchError(this.handleError) // Handle errors
    );
  }
  updateProduct(id: number | null, updatedData: IProduct): Observable<IProduct> {
    return this.http.patch<IProduct>(this.url + "products/" + id, updatedData).pipe(
        tap(data => {
          let productIndex = this.products.findIndex(product => product.id == id);
          this.products[productIndex] = data
            console.log(this.products);
            console.log(data)            
        }), // Cache the fetched products
        catchError(this.handleError) // Handle errors
    );
  }

  addProduct(updatedData: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.url + "products/", updatedData).pipe(
        tap(data => {
            this.products.unshift(data)
            console.log(this.products);
            console.log(data)            
        }), // Cache the fetched products
        catchError(this.handleError) // Handle errors
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
