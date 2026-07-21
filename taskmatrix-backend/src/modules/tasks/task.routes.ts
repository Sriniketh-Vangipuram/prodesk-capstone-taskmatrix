import {
  Router,
} from "express";

import {
  taskController,
} from "./task.controller";

import {
  authMiddleware,
} from "../../shared/middleware/auth.middleware";

const router =
  Router();

router.use(
  authMiddleware
);

router.post(
  "/",
  taskController.create
);

router.get(
  "/",
  taskController.getAll
);

router.get(
  "/:id",
  taskController.getOne
);

router.put(
  "/:id",
  taskController.update
);

router.delete(
  "/:id",
  taskController.delete
);

export default router;