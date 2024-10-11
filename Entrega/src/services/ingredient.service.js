import IngredientRepository from "../repositories/ingredient.repository.js";
import { deleteFile } from "../utils/fileSystem.js";
import paths from "../utils/paths.js";

export default class IngredientService {
    #ingredientRepository;

    constructor() {
        this.#ingredientRepository = new IngredientRepository();
    }

    // Obtener todos los ingredientes aplicando filtros
    async findAll(params) {
        return await this.#ingredientRepository.findAll(params);
    }

    // Obtener un ingrediente por su ID
    async findOneById(id) {
        return await this.#ingredientRepository.findOneById(id);
    }

    // Crear un nuevo ingrediente
    async insertOne(data, filename) {
        return await this.#ingredientRepository.save({
            ...data,
            thumbnail: filename ?? null,
        });
    }

    // Actualizar un ingrediente existente
    async updateOneById(id, data, filename) {
        const currentIngredient = await this.#ingredientRepository.findOneById(id);
        const currentThumbnail = currentIngredient.thumbnail;
        const newThumbnail = filename;

        const ingredient = await this.#ingredientRepository.save({
            ...currentIngredient,
            ...data,
            thumbnail: newThumbnail ?? currentThumbnail,
        });

        if (filename && newThumbnail !== currentThumbnail) {
            await deleteFile(paths.images, currentThumbnail);
        }

        return ingredient;
    }

    // Eliminar un ingrediente por su ID
    async deleteOneById(id) {
        return await this.#ingredientRepository.deleteOneById(id);
    }
}