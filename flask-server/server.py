from flask import Flask, render_template
from flask_cors import CORS
from components.control.recipe_handler import recipe_handler
from components.control.grocery_handler import grocery_handler


app = Flask(__name__)
CORS(app)

app.register_blueprint(recipe_handler)
app.register_blueprint(grocery_handler)

@app.route('/', defaults={'path': ''}, methods=['GET'])
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)