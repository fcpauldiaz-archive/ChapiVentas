
export interface ReporteVentasInterface {

  getVentasPorFecha(fechaInicio: Date, fechaFinal: Date): Array<string>;
  getVentasMonetariasPorFecha(fechaInicio: Date, fechaFinal: Date): number;
}
