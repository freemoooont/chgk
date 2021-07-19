import express from "express";
import apikey from "../../auth/apikey";
import signup from "./access/signup";
import signin from "./access/signin";
import user from "./profile/user";
import token from "./access/token";
import logout from "./access/logout";
import teamRoutes from "./team/teamRoutes";
import eventProfile from "./event/eventProfile";

import admin from "./admin/adminRoutes";

const router = express.Router();

router.use('/', apikey);

//access and profiles
router.use('/signup', signup);
router.use('/login', signin);
router.use('/profile', user);
router.use('/token', token);
router.use('/logout', logout);

//team
router.use('/team', teamRoutes);

//events
router.use('/event', eventProfile);

//admins
router.use('/admin', admin);

export default router;