import RecipeService from "../services/recipe.service.js";

export default class RecipeController {
    #recipeService;

    constructor() {
        this.#recipeService = new RecipeService();
    }

    // Obtener todas las recetas
    async getAll(req, res) {
        try {
            const recipes = await this.#recipeService.findAll(req.query);
            res.sendSuccess200(recipes);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Obtener una receta por su ID
    async getById(req, res) {
        try {
            const recipe = await this.#recipeService.findOneById(req.params.id);
            res.sendSuccess200(recipe);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Crear una nueva receta
    async create(req, res) {
        try {
            const recipe = await this.#recipeService.insertOne(req.body);
            res.sendSuccess201(recipe);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Actualizar una receta existente
    async update(req, res) {
        try {
            const recipe = await this.#recipeService.updateOneById(req.params.id, req.body);
            res.sendSuccess200(recipe);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Eliminar una receta por su ID
    async delete(req, res) {
        try {
            const recipe = await this.#recipeService.deleteOneById(req.params.id);
            res.sendSuccess200(recipe);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Agrega un ingrediente a una receta específica
    async addOneIngredient(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const recipeUpdated = await this.#recipeService.addOneIngredient(cid, pid, quantity ?? 1);
            res.sendSuccess200(recipeUpdated);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Elimina un ingrediente específico de una receta
    async removeOneIngredient(req, res) {
        try {
            const { cid, pid } = req.params;
            const recipeDeleted = await this.#recipeService.removeOneIngredient(cid, pid, 1);
            res.sendSuccess200(recipeDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Elimina todos los ingredientes de una receta específica
    async removeAllIngredients(req, res) {
        try {
            const recipeDeleted = await this.#recipeService.removeAllIngredients(req.params.cid);
            res.sendSuccess200(recipeDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }

}