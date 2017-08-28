import { Producto } from './producto.model';
export class ReporteVenta {

  fechaVenta: Date;
  productos: Producto[];
  totalVenta: number;

  calcularCantidadProductos(): number {
    return this.productos.length;
  }

}
