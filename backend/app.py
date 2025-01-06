from flask import Flask, request, jsonify
from services.wikipediaService.bear_service import extract_bears_from_wikitext

app = Flask(__name__)


@app.route("/bears", methods=["POST"])
def extract_bears():
    wikitext = request.json.get("wikitext", "")

    bears = extract_bears_from_wikitext(wikitext)

    return jsonify(bears)


if __name__ == "__main__":
    app.run(debug=False)
