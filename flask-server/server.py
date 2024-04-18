from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(
    app,
    resources={r"/*": {"origins": "http://localhost:5173"}},
    methods=["GET", "POST"],
)


@app.route("/get-file", methods=["GET"])
def getfiles():
    with open("static/bubble-O0.txt", "r") as file:
        file_content = file.read()
    return file_content


if __name__ == "__main__":
    app.run(debug=True, port=8001)
