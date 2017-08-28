import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import carreraRoutes from './carrera.route';
import serachRoutes from './search.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount post routes at /post
router.use('/carrera', carreraRoutes);

// mount search routes at /search
router.use('/search', serachRoutes);

export default router;
