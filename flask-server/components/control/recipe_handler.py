from flask import Blueprint
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