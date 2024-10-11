import BaseRouter from "../base.router.js";
import RecipeController from "../../controllers/recipe.controller.js";
import { ADMIN, STANDARD, PREMIUM } from "../../constants/roles.constant.js";

export default class RecipeRouter extends BaseRouter {
    #recipeController;

    constructor() {
        super();
        this.#recipeController = new RecipeController();
    }

    initialize() {
        const router = this.getRouter();

        // Define las rutas y asocia las funciones correspondientes
        this.addGetRoute("/", [STANDARD], (req, res) => this.#recipeController.getAll(req, res));
        this.addGetRoute("/:id", [STANDARD], (req, res) => this.#recipeController.getById(req, res));
        this.addPostRoute("/", [ PREMIUM, ADMIN ], (req, res) => this.#recipeController.create(req, res));
        this.addPutRoute("/:id", [PREMIUM], (req, res) => this.#recipeController.update(req, res));
        this.addDeleteRoute("/:id", [ADMIN], (req, res) => this.#recipeController.delete(req, res));
        this.addPutRoute("/:cid/ingredients/:pid", [STANDARD], (req, res) => this.#recipeController.addOneIngredient(req, res));
        this.addDeleteRoute("/:cid/ingredients/:pid", [STANDARD], (req, res) => this.#recipeController.removeOneIngredient(req, res));
        this.addDeleteRoute("/:cid/ingredients", [STANDARD], (req, res) => this.#recipeController.removeAllIngredients(req, res));

        // Middleware para manejar errores
        // eslint-disable-next-line no-unused-vars
        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }
}