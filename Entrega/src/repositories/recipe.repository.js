import FactoryDAO from "../daos/factory.dao.js";
import RecipeDTO from "../dtos/recipe.dto.js";
import { MONGODB } from "../constants/dao.constant.js";
import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";

export default class RecipeRepository {
    #recipeDAO;
    #recipeDTO;

    constructor() {
        const factory = new FactoryDAO();
        this.#recipeDAO = factory.createRecipe(MONGODB);
        this.#recipeDTO = new RecipeDTO();
    }

    // Obtener todas las receta aplicando filtros
    async findAll(params) {
        params.populate = "ingredients.ingredient";

        const recipes = await this.#recipeDAO.findAll({}, params);
        const recipesDTO = recipes?.docs?.map((recipe) => this.#recipeDTO.fromModel(recipe));
        recipes.docs = recipesDTO;

        return recipes;
    }

    // Obtener una receta por su ID
    async findOneById(id) {
        const recipe = await this.#recipeDAO.findOneById(id);
        if (!recipe) throw new Error(ERROR_NOT_FOUND_ID);

        return this.#recipeDTO.fromModel(recipe);
    }

    // Crear o actualizar una receta
    async save(data) {
        const recipeDTO = this.#recipeDTO.fromData(data);
        const recipe = await this.#recipeDAO.save(recipeDTO);
        return this.#recipeDTO.fromModel(recipe);
    }

    // Eliminar una receta por su ID
    async deleteOneById(id) {
        const recipe = await this.findOneById(id);
        await this.#recipeDAO.deleteOneById(id);
        return recipe;
    }
}