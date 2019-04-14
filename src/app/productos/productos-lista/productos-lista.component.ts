import { Component, OnInit } from '@angular/core';
import { Producto } from '../Producto';
import { Subscription } from 'rxjs';
import { ProductosService } from '../productos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos-lista',
  templateUrl: './productos-lista.component.html',
  styleUrls: ['./productos-lista.component.css']
})
export class ProductosListaComponent implements OnInit {

  aparecer = false;
  productos: Producto[];
  total: number;
  cantidad: number;
  private subscript: Subscription;

  constructor(private productosService: ProductosService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.router.url);
    if (this.router.url === '/carrito') {
      this.aparecer= true;
      this.productos = this.productosService.getCarrito();
    } else {
      this.aparecer = false;
      this.productos = this.productosService.getProductos();
    }
    this.subscript = this.productosService.cambiaDato.subscribe(
        (Productos: Producto[]) => {
          this.productos = Productos;
        }
      );
  }

  ngAfterContentChecked(): void {
    if (this.router.url === '/carrito') {
      this.total = 0;
      this.cantidad = 0;
      for (let producto of this.productos) {
        this.total += producto.precio;
        this.cantidad++;
      }
    }
  }

  detallar(producto: { id: any; }) {
    this.router.navigate([producto.id], { relativeTo: this.route });
  }


  borrarDelCarrito(producto: Producto) {
    this.productosService.borrarProducto(producto.id);
  }

  agregarAlCarrito(producto: Producto) {
    this.productosService.agregarProducto(producto.id);
  }

  
}
