import { Component } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss']
})
export class ProductAdminComponent {
  products!: IProduct[];
  constructor(
    private ProductService: ProductService
  ) {
    this.ProductService.getProducts().subscribe(data => {
      this.products = data
    }, error => {
      console.log(error.message);
    })
  }
  removeItem(id: any) {
    if (window.confirm("Bạn chắc chắn chứ?") == true) {
      this.ProductService.removeProduct(id).subscribe(product => {
        const newProducts = this.products.filter((product) => product.id != id);
        this.products = newProducts
      })
    }
  }
}
