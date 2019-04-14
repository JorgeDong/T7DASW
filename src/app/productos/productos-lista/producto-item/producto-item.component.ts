import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../Producto';

@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.component.html',
  styleUrls: ['./producto-item.component.css']
})
export class ProductoItemComponent implements OnInit {
  @Input() producto: Producto;
  @Input() botonVista: boolean;
  @Output() detalleProducto = new EventEmitter();
  @Output() borrarProducto = new EventEmitter();
  @Output() agregarProducto = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  productoBorrar() {
    this.borrarProducto.emit(this.producto);
  }

  productoAgregar() {
    this.agregarProducto.emit(this.producto);
  }

  productoDetalle() {
    this.detalleProducto.emit(this.producto);
  }
}

