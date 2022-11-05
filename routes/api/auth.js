const express = require("express");
const { ctrlWrapper } = require("../../helpers");

const ctrl = require("../../controllers/auth")

const { validateBody, authenticate } = require("../../middlewares")

const { schemas } = require("../../models/user")

const router = express.Router();


router.post("/signup", validateBody(schemas.signupSchema), ctrlWrapper(ctrl.signup))

router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login))

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent))

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout))

module.exports = router;