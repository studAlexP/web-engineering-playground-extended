import re
import requests
import time

cache = {}


def fetch_image_url(file_name: str) -> str:
    if file_name in cache:
        cached_data = cache[file_name]
        if time.time() - cached_data["timestamp"] < 3600:
            return cached_data["url"]
        else:
            del cache[file_name]

    base_url = "https://en.wikipedia.org/w/api.php"
    image_params = {
        "action": "query",
        "titles": f"File:{file_name}",
        "prop": "imageinfo",
        "iiprop": "url",
        "format": "json",
        "origin": "*",
    }

    try:
        response = requests.get(base_url, params=image_params)
        response.raise_for_status()
        data = response.json()

        if "query" in data and "pages" in data["query"]:
            pages = data["query"]["pages"]
            for page_id in pages:
                image_info = pages[page_id].get("imageinfo", [])
                if image_info:
                    cache[file_name] = {
                        "url": image_info[0]["url"],
                        "timestamp": time.time(),
                    }
                    return image_info[0]["url"]
        else:
            return "media/urban-bear.jpg"

    except Exception as e:
        print(f"Error fetching image URL for {file_name}: {e}")
        return "media/urban-bear.jpg"


def fetch_wikitext(page_title: str) -> str:
    base_url = "https://en.wikipedia.org/w/api.php"
    params = {
        "action": "parse",
        "page": page_title,
        "format": "json",
        "prop": "wikitext",
        "origin": "*",
    }

    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        data = response.json()

        if "parse" in data and "wikitext" in data["parse"]:
            return data["parse"]["wikitext"]["*"]
        else:
            return ""
    except Exception as e:
        print(f"Error fetching wikitext for {page_title}: {e}")
        return ""


def extract_bears_from_wikitext(wikitext: str):
    species_tables = wikitext.split("{{Species table/end}}")
    bears = []

    for table in species_tables:
        rows = table.split("{{Species table/row")

        for row in rows:
            name_match = re.search(r"\|name=\[\[(.*?)]]", row)
            binomial_match = re.search(r"\|binomial=(.*?)\n", row)
            image_match = re.search(r"\|image=(.*?)\n", row)
            range_match = re.search(r"\|range=(.*?)([|\n])", row)

            if name_match and binomial_match and image_match:
                file_name = image_match.group(1).strip().replace("File:", "")
                range_value = (
                    range_match.group(1).strip()
                    if range_match
                    else "Range not available"
                )

                image_url = fetch_image_url(file_name)

                bear = {
                    "name": name_match.group(1),
                    "binomial": binomial_match.group(1),
                    "image": image_url,
                    "range": range_value,
                }
                bears.append(bear)

    return bears
