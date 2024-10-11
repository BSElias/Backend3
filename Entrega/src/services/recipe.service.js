import RecipeRepository from "../repositories/recipe.repository.js";
import { ERROR_NOT_FOUND_INDEX } from "../constants/messages.constant.js";

export default class RecipeService {
    #recipeRepository;

    constructor() {
        this.#recipeRepository = new RecipeRepository();
    }

    // Obtener todas las recetas aplicando filtros
    async findAll(paramFilters) {
        const $and = [];

        if (paramFilters?.name) $and.push({ name: { $regex: paramFilters.name, $options: "i" } });
        const filters = $and.length > 0 ? { $and } : {};

        return await this.#recipeRepository.findAll(filters);
    }

    // Obtener una receta por su ID
    async findOneById(id) {
        return await this.#recipeRepository.findOneById(id);
    }

    // Crear una nueva receta
    async insertOne(data) {
        return await this.#recipeRepository.save(data);
    }

    // Actualizar una receta existente
    async updateOneById(id, data) {
        const recipe = await this.#recipeRepository.findOneById(id);
        const newValues = { ...recipe, ...data };
        return await this.#recipeRepository.save(newValues);
    }

    // Eliminar una receta por su ID
    async deleteOneById(id) {
        return await this.#recipeRepository.deleteOneById(id);
    }

    // Agregar una ingrediente a un receta o incrementar la cantidad de un ingrediente existente
    async addOneIngredient(id, ingredientId, quantity = 0) {
        const recipe = await this.#recipeRepository.findOneById(id);

        const ingredientIndex = recipe.ingredients.findIndex((item) => item.ingredient.toString() === ingredientId);

        if (ingredientIndex >= 0) {
            recipe.ingredients[ingredientIndex].quantity += quantity;
        } else {
            recipe.ingredients.push({ ingredient: ingredientId, quantity });
        }

        return await this.#recipeRepository.save(recipe);
    }

    // Elimina un ingrediente de una receta o decrementa la cantidad de un ingrediente existente
    async removeOneIngredient(id, ingredientId, quantity = 0) {
        const recipe = await this.#recipeRepository.findOneById(id);

        const ingredientIndex = recipe.ingredients.findIndex((item) => item.ingredient.toString() === ingredientId);
        if (ingredientIndex < 0) {
            throw new Error(ERROR_NOT_FOUND_INDEX);
        }

        if (recipe.ingredients[ingredientIndex].quantity > quantity) {
            recipe.ingredients[ingredientIndex].quantity -= quantity;
        } else {
            recipe.ingredients.splice(ingredientIndex, 1);
        }

        return await this.#recipeRepository.save(recipe);
    }

    // Elimina todos los ingredientes de una receta por su ID
    async removeAllIngredients(id) {
        const recipe = await this.#recipeRepository.findOneById(id);
        recipe.ingredients = [];

        return await this.#recipeRepository.save(recipe);
    }
}