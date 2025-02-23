from flask import Blueprint, jsonify, request
from flask_cors import cross_origin

recipe_handler = Blueprint('recipe_handler', __name__)

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://daniafernandezpurchase:imQV9IYBZzf4P5i0@cluster0.jsaz2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


@recipe_handler.route("/recipes")
@cross_origin()
def recipes():
    db = client.meal_planner
    my_collection = db['recipe_book']
    result = my_collection.find()

    if result:
        recipe_book = []
        for doc in result:
            name = doc['name']
            serves = doc['serves']
            ingredients = doc['ingredients']
            recipe_book.append({"name": name, "serves": serves, "ingredients": ingredients})

    return recipe_book

@recipe_handler.route("/insertRecipe", methods=["POST"])
@cross_origin()
def insert_recipe():
    data = request.get_json()

    if not data or "name" not in data or "serves" not in data or "ingredients" not in data:
        return jsonify({"error": "Missing required fields"}), 400

    name = data["name"]
    serves = data["serves"]
    ingredient_items = data["ingredients"]

    existing_recipe = db.recipe_book.find_one({"name": name})

    if existing_recipe:
        return jsonify({"message": "A recipe with this name already exists."}), 409

    ingredient_ids = []

    for ingredient_item in ingredient_items:
        ingredient_name = ingredient_item["name"]
        ingredient_units = ingredient_item["units"]
        ingredient_quantity = ingredient_item["quantity"]

        ingredient = db.ingredient_store.find_one({"name": ingredient_name})
        if not ingredient:
            new_ingredient = {
                "name": ingredient_name,
                "units": ingredient_units
            }
            ingredient_inserted = db.ingredient_store.insert_one(new_ingredient)
            ingredient_id = ingredient_inserted.inserted_id
        else:
            ingredient_id = ingredient["_id"]

        ingredient_ids.append({"ingredient_id": ingredient_id, "quantity": ingredient_quantity})

    db.recipe_book.insert_one({
        "name": name,
        "serves": serves,
        "ingredients": ingredient_ids
    })

    return jsonify({"message": "Recipe added successfully!"}), 201

db = client.meal_planner
