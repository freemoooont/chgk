import express from "express";
import apikey from "../../auth/apikey";
import signup from "./access/signup";
import signin from "./access/signin";
import user from "./profile/user";
import token from "./access/token";
import logout from "./access/logout";
import teamRoutes from "./team/teamRoutes";
import capitan from "./event/capitan";

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
router.use('/capitan/event', capitan);

//admins
router.use('/admin', admin);


export default router;