import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {
  id: number;
  nombre: string;
  marca: string;
  categoria: string;
  precio: number;
  existencia: number;

  constructor(private productosService: ProductosService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let producto = this.productosService.getProducto(this.id);
        this.id = Number(params.id);
        this.nombre = producto.nombre;
        this.marca = producto.marca;
        this.categoria = producto.categoria;
        this.precio = producto.precio;
        this.existencia = producto.existencia;
      }
    );
  }


}
