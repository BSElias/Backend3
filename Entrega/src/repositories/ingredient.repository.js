import FactoryDAO from "../daos/factory.dao.js";
import IngredientDTO from "../dtos/ingredient.dto.js";
import { MONGODB } from "../constants/dao.constant.js";
import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";

export default class IngredientRepository {
    #ingredientDAO;
    #ingredientDTO;

    constructor() {
        const factory = new FactoryDAO();
        this.#ingredientDAO = factory.createIngredient(MONGODB);
        this.#ingredientDTO = new IngredientDTO();
    }

    // Obtener todos los ingredientes aplicando filtros
    async findAll(params) {
        const $and = [];

        if (params?.title) $and.push({ title: { $regex: params.title, $options: "i" } });
        const filters = $and.length > 0 ? { $and } : {};

        const ingredients = await this.#ingredientDAO.findAll(filters, params);
        const ingredientsDTO = ingredients?.docs?.map((ingredient) => this.#ingredientDTO.fromModel(ingredient));
        ingredients.docs = ingredientsDTO;

        return ingredients;
    }

    // Obtener un ingrediente por su ID
    async findOneById(id) {
        const ingredient = await this.#ingredientDAO.findOneById(id);
        if (!ingredient) throw new Error(ERROR_NOT_FOUND_ID);

        return this.#ingredientDTO.fromModel(ingredient);
    }

    // Crear o actualizar un ingrediente
    async save(data) {
        const ingredientDTO = this.#ingredientDTO.fromData(data);
        const ingredient = await this.#ingredientDAO.save(ingredientDTO);
        return this.#ingredientDTO.fromModel(ingredient);
    }

    // Eliminar un ingrediente por su ID
    async deleteOneById(id) {
        const ingredient = await this.findOneById(id);
        await this.#ingredientDAO.deleteOneById(id);
        return ingredient;
    }
}