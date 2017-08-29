import { ReporteVenta } from './venta.model';
import { ReporteVentasInterface } from './interfaces/ventas.interface';

export class ReporteVentas implements ReporteVentasInterface {

  ventas: ReporteVenta[];

  getVentasPorFecha(fechaInicio: Date, fechaFinal: Date): Array<string> {
    let ventasValidas = [];
    for (let i = 0; i < this.ventas.length; i++) {
      const venta = this.ventas[i];
      if (fechaInicio > venta.fecha.fechaEvento && venta.fecha.fechaEvento < fechaFinal) {
        ventasValidas.push(venta);
      }
    }
    return ventasValidas;
  }

  getVentasMonetariasPorFecha(fechaInicio: Date, fechaFinal: Date): number {
    let totalVentas = 0.0
    for (let i = 0; i < this.ventas.length; i++) {
      const venta = this.ventas[i];
      if (fechaInicio > venta.fecha.fechaEvento && venta.fecha.fechaEvento < fechaFinal) {
        totalVentas = totalVentas + venta.totalVenta;
      }
    }
    return totalVentas;
  }
}
