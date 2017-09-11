import { CalendarDate } from './calendar_date.model';
import { Producto } from './producto.model';
import { ValorMonetario } from './valor_monetario.model';
export class ReporteVenta {

  fecha: CalendarDate;
  producto: Producto;
  totalVenta: ValorMonetario;
  cantidad: number;

  constructor(fecha: string, producto: Producto, valor: number, cantidad: number ) {
    this.fecha = new CalendarDate(new Date(fecha));
    this.producto = producto;
    this.totalVenta = new ValorMonetario('GTQ', valor);
    this.cantidad = cantidad;
  }


}
