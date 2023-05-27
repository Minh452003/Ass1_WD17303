import { Component } from '@angular/core';
import { ProductService } from "src/app/pages/services/product.service"
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { IProduct } from 'src/app/interfaces/product';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {
  productForm = this.FormBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    price: [0],
    image: ['']
  })
  constructor(
    private FormBuilder: FormBuilder,
    private ProductService: ProductService,
    private Router: Router
  ) { }
  onHandeAdd() {
    if (this.productForm.valid) {
      const product: IProduct = {
        name: this.productForm.value.name || '',
        price: this.productForm.value.price || 0,
        image: this.productForm.value.image || '',
      }
      this.ProductService.addProduct(product).subscribe(product => {
        this.Router.navigate(['/admin/products'])
      })
    }
  }
}
