from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

import pymongo

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



recipe_book_lst = [
    {
        "name": "Poke Bowl",
        "serves": 2,
        "ingredients": [
            ["Tuna can", 2],
            ["Mayonnaise", 2],
            ["Red Onion", 0.25],
            ["Seaweed", 2],
            ["Everything Bagel Seasoning", 0],
            ["Avocado", 1]
        ]
    },
    {
        "name": "Cod & Cilantro Rice",
        "serves": 2,
        "ingredients": [
            ["Cod filets", 3],
            ["Cilantro", 0.5],
            ["Avocado", 1],
            ["Lime", 1],
            ["Lemon", 0.25],
            ["Pepper", 1],
            ["Butter", 0.125]
        ]
    },
    {
        "name": "Salmon, Sweet Potato, & Asparagus",
        "serves": 3,
        "ingredients": [
            ["Salmon (small pack)", 1],
            ["Sweet Potato", 4],
            ["Asparagus", 1],
            ["Olive Oil", 0],
            ["Lemon", 0.5],
            ["Butter", 0.125]
        ]
    },

    {
        "name": "Chicken Salad Sandwiches",
        "serves": 2,
        "ingredients": [
            ["Chicken Tenderloin Pack", 0.75],
            ["Mayo", 0],
            ["Red Onion", 0.5],
            ["Bread", 0],
            ["Lettuce", 0.125],
            ["Tomato", 0.5]
        ]
    },
    {
        "name": "Mex Ground Beef & Cilantro Rice",
        "serves": 3,
        "ingredients": [
            ["Cilantro", 0.5],
            ["Lime", 1],
            ["Red Onion", 1],
            ["Tomato", 1],
            ["Rice", 0],
            ["Avocado", 0.5],
            ["Shredded Cheese", 0]
        ]
    },
    {
        "name": "Soy Tofu & Sesame Rice",
        "serves": 2,
        "ingredients": [
            ["Tofu", 1],
            ["Soy Sauce", 0],
            ["Rice", 0],
            ["Honey", 0],
            ["Pepper", 1],
            ["Sesame Oil", 0],
        ]
    },
    {
        "name": "Garbanzo Chorizo Stew",
        "serves": 4,
        "ingredients": [
            ["Chorizo", 1],
            ["Garbanzo Can", 1],
            ["Yukon Potatoes", 4],
            ["Tomato Sauce Can", 1],
            ["Pepper", 1],
            ["Chicken Broth", 1],
            ["Parsley", 1],
            ["Onion", 1],
            ["Bread", 0],
        ]
    },
    {
        "name": "Alfredo Pasta & Chicken",
        "serves": 2,
        "ingredients": [
            ["Chicken Tenderloin Pack", 0.25],
            ["Heavy Cream", 0.33],
            ["Garlic", 0],
            ["Chicken Broth", 0.75],
            ["Pasta", 0.75],
            ["Parmesan", 0.5],
            ["Parsley", 1],
        ]
    }
]

@app.route("/recipes")
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

    return recipe_book_lst


if __name__ == "__main__":
    app.run(debug=True)