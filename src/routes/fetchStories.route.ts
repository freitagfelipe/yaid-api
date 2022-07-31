import express, { Router } from "express";
import { get } from "../controllers/fetchStories.controller";
import { validator } from "../middlewares/validator.middleware";

export const router: Router = express.Router();

router.use(validator);
router.get("", get);
