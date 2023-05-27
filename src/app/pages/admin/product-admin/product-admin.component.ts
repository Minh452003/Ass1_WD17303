import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from "src/app/pages/services/product.service"
@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss']
})
export class ProductAdminComponent {
  products!: IProduct[];
  constructor(
    private ProductService: ProductService,
    private Router: Router
  ) {
    this.ProductService.getProducts().subscribe(data => {
      this.products = data
    }, error => {
      console.log(error.message);

    })
  }
  removeItem(id: any) {
    this.ProductService.removeProduct(id).subscribe(product => {
      const newProducts = this.products.filter((product) => product.id != id);
      this.products = newProducts
    })
  }
}
