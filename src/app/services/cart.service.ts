import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }

  addToCart(data): void {
    const products = JSON.parse(localStorage.getItem("avct_item")) || [];
    products.push(data);

    // this.toastrService.wait(
    //   "Adding Product to Cart",
    //   "Product Adding to the cart"
    // );
    // setTimeout(() => {
    //   localStorage.setItem("avct_item", JSON.stringify(a));
    // }, 500);

    localStorage.setItem("avct_item", JSON.stringify(products));
  }

  // Removing cart from local
  removeLocalCartProduct(product) {
    const products = JSON.parse(localStorage.getItem("avct_item"));

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === product.id) {
        products.splice(i, 1);
        break;
      }
    }
    // ReAdding the products after remove
    localStorage.setItem("avct_item", JSON.stringify(products));
  }

  // Fetching Locat CartsProducts
  getLocalCartProducts() {
    const products =
      JSON.parse(localStorage.getItem("avct_item")) || [];

    return products;
  }
}
