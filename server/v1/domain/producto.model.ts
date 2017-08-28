import { ValorMonetario } from './valor_monetario.model';
export class Producto {

  nombreProducto: string;
  valorMonetario: ValorMonetario;

  constructor(nombre: string, precio: number, moneda: string) {
    this.nombreProducto = nombre;
    this.valorMonetario = new ValorMonetario(moneda, precio);
  }

}
