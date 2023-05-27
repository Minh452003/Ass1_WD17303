import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  product!: IProduct
  constructor(
    private ProductService: ProductService,
    private ActivatedRoute: ActivatedRoute
  ) {
    this.ActivatedRoute.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.ProductService.getProductById(id).subscribe(product => {
        this.product = product;
      })
    }, error => {
      console.log(error.message);
    })
  }
}
