import { ValorMonetario } from './valor_monetario.model';
import { NombreProducto } from './value_objects/nombre_producto.model';
export class Producto {

  nombreProducto: NombreProducto;
  valorMonetario: ValorMonetario;

  constructor(nombre: string, precio: number, moneda: string) {
    this.nombreProducto = new NombreProducto(nombre).nombre;
    this.valorMonetario = new ValorMonetario(moneda, precio);
  }

}
