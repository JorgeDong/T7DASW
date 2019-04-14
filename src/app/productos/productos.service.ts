import { Injectable } from '@angular/core';
import { Producto } from './Producto';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
 cambiaDato = new Subject<Producto[]>();

  constructor() { }
 
  carrito: Producto[] = [];
  productos: Producto[] = [
    new Producto(1, 'Zbook', 'hp', 'laptop', 15000, 8),
    new Producto(2, 'Toshiba PC', 'Toshiba', 'laptop', 14521, 9),
    new Producto(3, 'CompaqI', 'Compaq', 'laptop',264482, 10),
    new Producto(4, 'Sony PC', 'Sony', 'laptop', 174632, 11),
    new Producto(5, 'Lenovo PC', 'Lenovo', 'laptop', 15675, 12),
    new Producto(6, 'Mac Pro', 'Apple', 'laptop', 20000, 13),
  ];

  getProductos(): Producto[] {
    return this.productos.slice();
  }
  getProducto(id: number): Producto {
    let  i = this.productos.findIndex(producto => producto.id === id);
    return Object.assign({}, 
      this.productos[i]);
  }
  getCarrito(): Producto[] {
    return this.carrito.slice();
  }

  borrarProducto(id: number): boolean {
    let  n = this.carrito.findIndex(producto => producto.id === id);
    if (n >= 0) {
      this.carrito.splice(n, 1);
      this.eliminado();
      return true;
    }
    return false;
  }

  agregarProducto(id: number): boolean {
    if (!this.carrito.find(producto => producto.id === id)) {
      this.carrito.push(this.getProducto(id));
      return true;
    }
    return false;
  }

  eliminado() {
    this.cambiaDato.next(this.carrito.slice());
  }
}
