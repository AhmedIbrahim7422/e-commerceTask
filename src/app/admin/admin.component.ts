import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/interface';
import { ProductService } from '../shared/services/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  products: IProduct[] = [];
  categories: Array<string> = []

  errorMessage: string = '';
  constructor(private productService: ProductService, private auth: AuthService, public formBuilder: FormBuilder, private router: Router) {
    this.updateForm = formBuilder.group({
      title: ["", Validators.required],
      price: ["", Validators.required],
      image: ["", Validators.required],
      description: ["", Validators.required],
    })
  }

  //pagination code
  totalRocords: number | undefined
  page: number = 1;

  loader = document.querySelector(".loader")
  ngOnInit(): void {
    if (this.loader) {
      (this.loader as HTMLElement).style.display = "flex"
    }
    this.productService.getAllProducts().subscribe(
      (data: IProduct[]) => {
        this.products = data
        this.totalRocords = this.products.length
        if (this.loader) {
          (this.loader as HTMLElement).style.display = "none"
        }
      },
      (error: string) => this.errorMessage = error
    );

    this.productService.getAllCategories().subscribe(
      (data: string[]) => this.categories = data,
      (error: string) => this.errorMessage = error
    );

  }

  getcategory(category: string) {
    if (this.loader) {
      (this.loader as HTMLElement).style.display = "flex"
    }
    this.productService.getCategory(category).subscribe(
      (data: IProduct[]) => {
        this.products = data
        const active = document.querySelector(".active");
        const itemEle = document.getElementById(category);
        if (active && itemEle) {
          active.classList.remove("active");
          itemEle.classList.add("active")
        }
        if (this.loader) {
          (this.loader as HTMLElement).style.display = "none"
        }
        this.totalRocords = this.products.length
      },
      (error: string) => this.errorMessage = error
    );
  }

  truncate(text: string, limit: number): string {
    if (!text) return '';
    const words = text.split(' ');
    return words.length <= limit ? text : words.slice(0, limit).join(' ') + '...';
  }

  deleteItem(id: number) {
    this.productService.deleteProduct(id).subscribe(
      (data: Object) => {
        const productEle = document.getElementById(`${id}`);
        if (productEle && productEle.parentNode) {
          productEle.parentNode.removeChild(productEle);
        }
      },
      (error: string) => this.errorMessage = error
    );
  }

  startUpdate: boolean = false
  updateForm: any

  updataId: number | null = 0
  modalTitle: string = ""

  openModal(id: number | any) {
    if (id == null) {
      this.startUpdate = true
      this.updateForm.value = ""
      this.updataId = null
      this.modalTitle = "Add Product"
    } else {
      this.startUpdate = true
      let singleProduct = this.products.find(prod => prod.id == id)
      this.updateForm.patchValue({ title: singleProduct?.title });
      this.updateForm.patchValue({ price: singleProduct?.price });
      this.updateForm.patchValue({ image: singleProduct?.image });
      this.updateForm.patchValue({ description: singleProduct?.description });
      this.updataId = id
      this.modalTitle = "Update Product"
    }
  }

  update() {
    if (this.updataId == null) {
      this.addProduct()
    } else {
      this.productService.updateProduct(this.updataId, this.updateForm.value).subscribe(
        (data: Object) => {
          this.closeModal()
        },
        (error: string) => this.errorMessage = error
      );      
    }
  }

  addProduct() {
    this.productService.addProduct(this.updateForm.value).subscribe(
      (data: Object) => {
        this.closeModal()
      },(error: string) => this.errorMessage = error
    );
  }

  closeModal() {
    this.startUpdate = false
  }
  logout() {
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
