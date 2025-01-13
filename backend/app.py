from flask import Flask, request, jsonify
from flask_cors import CORS
from services.wikipediaService.bear_service import (
    fetch_wikitext,
    extract_bears_from_wikitext,
)

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/bears", methods=["GET"])
def get_bears():
    page_title = request.args.get("page_title", "")

    if not page_title:
        return jsonify({"error": "Page title is required"}), 400
    wikitext = fetch_wikitext(page_title)

    if not wikitext:
        return jsonify({"error": "Failed to fetch wikitext"}), 500

    bears = extract_bears_from_wikitext(wikitext)
    return jsonify(bears)


if __name__ == "__main__":
    app.run(debug=False)
