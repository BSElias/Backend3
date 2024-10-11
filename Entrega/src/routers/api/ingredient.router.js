import BaseRouter from "../base.router.js";
import IngredientController from "../../controllers/ingredient.controller.js";
import { ADMIN, STANDARD } from "../../constants/roles.constant.js";
import uploader from "../../utils/uploader.js";

export default class IngredientRouter extends BaseRouter {
    #ingredientController;

    constructor() {
        super();
        this.#ingredientController = new IngredientController();
    }

    initialize() {
        const router = this.getRouter();

        // Define las rutas y asocia las funciones correspondientes
        this.addGetRoute("/", [STANDARD], (req, res) => this.#ingredientController.getAll(req, res));
        this.addGetRoute("/:id", [STANDARD], (req, res) => this.#ingredientController.getById(req, res));
        this.addPostRoute("/", [STANDARD], uploader.single("file"), (req, res) => this.#ingredientController.create(req, res));
        this.addPutRoute("/:id", [STANDARD], uploader.single("file"), (req, res) => this.#ingredientController.update(req, res));
        this.addDeleteRoute("/:id", [ADMIN], (req, res) => this.#ingredientController.delete(req, res));

        // Middleware para manejar errores
        // eslint-disable-next-line no-unused-vars
        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }
}