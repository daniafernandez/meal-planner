from flask import Blueprint, request, jsonify
from flask_cors import cross_origin


grocery_handler = Blueprint('grocery_handler', __name__)


@grocery_handler.route("/grocerylist", methods=['POST'])
@cross_origin()
def grocery_list():
    meal_plan = request.json.get("mealPlan")
    recipes = request.json.get("recipes")
    recipe_book = {
        recipe["name"]: (recipe["ingredients"], recipe["serves"])
        for recipe in recipes
    }

    recipes_quantities_dict = {}

    for meal in meal_plan:
        for day in meal_plan[meal]:
            for recipe in meal_plan[meal][day]:
                if recipe != '':
                    if recipe not in recipes_quantities_dict:
                        recipes_quantities_dict[recipe] = 1
                    else:
                        recipes_quantities_dict[recipe] += 1

    ingredients_quantities_dict = {}
    for recipe in recipes_quantities_dict:
        servings_needed = recipes_quantities_dict[recipe]
        recipe_servings = recipe_book[recipe][1]
        recipe_multiplier = servings_needed / recipe_servings

        for ingredient in recipe_book[recipe][0]:
            ingredient_name = ingredient[0]
            ingredient_quantity = ingredient[1]
            if ingredient_name not in ingredients_quantities_dict:
                ingredients_quantities_dict[ingredient_name] = ingredient_quantity * recipe_multiplier
            else:
                ingredients_quantities_dict[ingredient[0]] += ingredient_quantity * recipe_multiplier

    return ingredients_quantities_dict