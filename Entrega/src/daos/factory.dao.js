import MongoDAO from "./mongodb/mongo.dao.js";
import { MONGODB } from "../constants/dao.constant.js";
import Ingredient from "./mongodb/models/ingredient.model.js";
import Recipe from "./mongodb/models/recipe.model.js";
import User from "./mongodb/models/user.model.js";

export default class FactoryDAO {
    createIngredient(className) {
        if (className === MONGODB) {
            return new MongoDAO(Ingredient);
        }
    }

    createRecipe(className) {
        if (className === MONGODB) {
            return new MongoDAO(Recipe);
        }
    }

    createUser(className) {
        if (className === MONGODB) {
            return new MongoDAO(User);
        }
    }
}