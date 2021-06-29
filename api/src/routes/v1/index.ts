import express from "express";
import apikey from "../../auth/apikey";
import signup from "./access/signup";
import signin from "./access/signin";
import user from "./profile/user";
import token from "./access/token";
import logout from "./access/logout";

const router = express.Router();

router.use('/', apikey);


router.use('/signup', signup);
router.use('/login', signin);
router.use('/profile', user);
router.use('/token', token);
router.use('/logout', logout);

export default router;