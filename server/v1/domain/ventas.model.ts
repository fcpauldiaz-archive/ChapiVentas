import { ReporteVenta } from './venta.model';
import { ReporteVentasInterface } from './interface/ventas.interface';
export class ReporteVentas implements ReporteVentasInterface {

  ventas: ReporteVenta[];


  getVentasPorMes(fechaInicio: Date, fechaFinal: Date): Array {
    let ventasValidas = [];
    for (let i = 0; i < this.ventas.length; i++) {
      const venta = this.ventas[i];
      if (fechaInicio > venta.fecha && venta.fecha < fechaFinal) {
        ventasValidas.push(venta);
      }
    }
    return ventasValidas;
  }

  getVentasMonetarias(fechaInicio: Date, fechaFinal: Date): number {
    let totalVentas = 0.0
    for (let i = 0; i < this.ventas.length; i++) {
      const venta = this.ventas[i];
      if (fechaInicio > venta.fecha && venta.fecha < fechaFinal) {
        totalVentas = totalVentas + venta.totalVenta;
      }
    }
    return totalVentas;
  }
}
