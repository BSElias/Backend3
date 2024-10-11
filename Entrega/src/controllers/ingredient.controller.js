import IngredientService from "../services/ingredient.service.js";
import { deleteFile } from "../utils/fileSystem.js";
import paths from "../utils/paths.js";

export default class IngredientController {
    #ingredientService;

    constructor() {
        this.#ingredientService = new IngredientService();
    }

    // Obtener todos los ingredientes
    async getAll(req, res) {
        try {
            const ingredients = await this.#ingredientService.findAll(req.query);
            res.sendSuccess200(ingredients);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Obtener un ingrediente por su ID
    async getById(req, res) {
        try {
            const ingredient = await this.#ingredientService.findOneById(req.params.id);
            res.sendSuccess200(ingredient);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Crear un nuevo ingrediente
    async create(req, res) {
        try {
            const ingredient = await this.#ingredientService.insertOne(req.body, req.file?.filename);
            res.sendSuccess201(ingredient);
        } catch (error) {
            if (req.file?.filename) await deleteFile(paths.images, req.file.filename);
            res.sendError(error);
        }
    }

    // Actualizar un ingrediente existente
    async update(req, res) {
        try {
            const ingredient = await this.#ingredientService.updateOneById(req.params.id, req.body, req.file?.filename);
            res.sendSuccess200(ingredient);
        } catch (error) {
            if (req.file?.filename) await deleteFile(paths.images, req.file.filename);
            res.sendError(error);
        }
    }

    // Eliminar un ingrediente por su ID
    async delete(req, res) {
        try {
            const ingredient = await this.#ingredientService.deleteOneById(req.params.id);
            res.sendSuccess200(ingredient);
        } catch (error) {
            res.sendError(error);
        }
    }
}