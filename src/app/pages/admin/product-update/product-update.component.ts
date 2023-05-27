import { Component } from '@angular/core';
import { ProductService } from "src/app/pages/services/product.service"
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { IProduct } from 'src/app/interfaces/product';
@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent {
  product!: IProduct
  productForm = this.FormBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    price: [0],
    image: ['']
  })
  constructor(
    private FormBuilder: FormBuilder,
    private ProductService: ProductService,
    private Router: Router,
    private ActivatedRoute: ActivatedRoute
  ) {
    this.ActivatedRoute.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.ProductService.getProductById(id).subscribe(product => {
        this.product = product;
        this.productForm.patchValue({
          name: this.product.name,
          price: this.product.price,
          image: this.product.image
        })
      })
    })
  }
  onHandeUpdate() {
    if (this.productForm.valid) {
      const product: IProduct = {
        id: this.product.id,
        name: this.productForm.value.name || '',
        price: this.productForm.value.price || 0,
        image: this.productForm.value.image || '',
      }
      this.ProductService.updateProduct(product).subscribe(product => {
        this.Router.navigate(['/admin/products'])
      })
    }
  }
}
