const express = require("express");
const routes = express();
const BookController = require("../controller/BookController");
const { bookValidator } = require("../middleware/validation");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const upload = require("../utils/file");

routes.get("/all", BookController.getAll);

routes.get("/find-by-id/:bookId", BookController.getBookById);

routes.post(
  "/create",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  // bookValidator.add,
  BookController.create
);

routes.patch(
  "/update/:bookId",
  isAuthenticated,
  isAdmin,
  bookValidator.update,
  BookController.update
);

routes.delete(
  "/delete/:bookId",
  isAuthenticated,
  isAdmin,
  bookValidator.delete,
  BookController.delete
);

module.exports = routes;
