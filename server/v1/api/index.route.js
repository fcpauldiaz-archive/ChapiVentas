import express from 'express';
import userRoutes from './user.route';
import carreraRoutes from './carrera.route';
import promocionRoutes from './promocion.route';

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


export default router;
