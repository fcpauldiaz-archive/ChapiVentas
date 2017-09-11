import express from 'express';
import userRoutes from './user.route';
import carreraRoutes from './carrera.route';
import promocionRoutes from './promocion.route';
import productRoutes from './product.route';
import carreraFechaRoutes from './carrera_fecha.route';
import ventaRoutes from './venta.route';
const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
// router.use('/users', userRoutes);

// mount post routes at /post
router.use('/carrera', carreraRoutes);
router.use('/promocion', promocionRoutes);
router.use('/product', productRoutes);
router.use('/carrera/fecha', carreraFechaRoutes);
router.use('/ventas', ventaRoutes);


export default router;
