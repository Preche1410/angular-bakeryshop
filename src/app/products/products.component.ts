import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from './product.service';
import { Product } from './product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  form: FormGroup;
  products: Product[] = [];

  constructor(private fb: FormBuilder,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.initForm();
    // define a sorter by price
    this.productService.getProducts().subscribe((products) => {

      let mySort=(a,b)=>a.price-b.price;
      this.products = products.sort(mySort); 
    });
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [''],
      price: [''],
      quantity: [''],
      store: ['']
    });
  }

  checkThreshhold(value) :boolean{
    
    if(value < 3) return true
    else return false;

  }

  addProduct(): void {
    const newProduct: Product = {
      name: this.form.get('name').value,
      price: this.form.get('price').value,
      quantity: this.form.get('quantity').value,
      store: this.form.get('store').value
    };
    this.products.push(newProduct);
    this.initForm();
  }
}
