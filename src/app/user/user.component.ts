import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/interface';
import { ProductService } from '../shared/services/product.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  products: IProduct[] = [];
  categories: Array<string> = [];
  errorMessage: string = '';
  maxPrice: number = 1000;

  constructor(private productService: ProductService, private auth: AuthService, private router: Router) {
    
  }
  loader = document.querySelector(".loader")

  ngOnInit(): void {
    if (this.loader) {
      (this.loader as HTMLElement).style.display = "flex"
    }
    this.productService.getAllProducts().subscribe(
      (data: IProduct[]) => {
        this.products = data;

      },
      (error: string) => this.errorMessage = error
    );
    

    this.productService.getAllCategories().subscribe(
      (data: string[]) =>{
        (this.loader as HTMLElement).style.display = "none"
        this.categories = data
      },
      (error: string) => this.errorMessage = error
    );
  }

  priceChange(event: any) {
    this.maxPrice = event.target.value;

    if (document.querySelectorAll(".cat-items").length > 0) {
      
      let catContainers = document.querySelectorAll(".cat-items")
      console.log(catContainers);
      let hasFlexDisplay = false;
      catContainers.forEach(e =>{
        let productsElements = (e as HTMLElement).querySelectorAll('.product-item');
        console.log(productsElements.length);
        for (let i = 0; i < productsElements.length; i++) {
          const element = productsElements[i];
          const computedStyle = window.getComputedStyle(element);
          console.log(computedStyle.display);
          
          if (computedStyle.display == 'flex') {
            hasFlexDisplay = true;
            break; // Exit the loop once a match is found for efficiency
          }
        }
        if (!hasFlexDisplay) {
          (e as HTMLElement).style.display = "none"
        } else{
          (e as HTMLElement).style.display = "block"
        }
      })

    }

  }

  truncate(text: string, limit: number): string {
    if (!text) return '';
    const words = text.split(' ');
    return words.length <= limit ? text : words.slice(0, limit).join(' ') + '...';
  }

  showOneCat(event: Event ,cat: string) {
    const catsElements = document.querySelectorAll('.cat-items');
    const itemEle = document.getElementById(cat);
    if (document.querySelector(".active")) {
      document.querySelector(".active")?.classList.remove("active");
      (event.target as HTMLElement).classList.add("active")
    }
    if (catsElements && itemEle) {
      catsElements.forEach(e => {
        (e as HTMLElement).style.display = 'none';
      });
      itemEle.style.display = 'block';
    }
  }
  
  startUpdate: boolean = false

  singleProduct: IProduct = {} as IProduct
  openModal(id:number){
    this.startUpdate = true
    this.singleProduct = this.products.find(e => e.id == id) as IProduct

  }

  closeModal(){
    this.startUpdate = false
  }

  logout(){
    this.auth.currentUser = null
    this.auth.userName = null
    localStorage.clear()
    this.router.navigate(["/"]);
  }

  showSidebar(){
    let sidebarContent = document.querySelector(".contain-all-cats-names")
    if (sidebarContent) {
      if (document.querySelector(".mobile-sidebar")) {
        sidebarContent.classList.remove("mobile-sidebar")
      } else {
        sidebarContent.classList.add("mobile-sidebar")
      }
    }
  }
}
