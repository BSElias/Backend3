export default class RecipeDTO {
    fromModel(model) {
        return {
            id: model.id,
            ingredients: model.ingredients,
        };
    }

    fromData(data) {
        return {
            id: data.id || null,
            ingredients: data.ingredients,
        };
    }
}