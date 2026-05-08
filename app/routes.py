from flask import Blueprint, request, render_template, jsonify
from app import db, limiter
from app.libs.fingerprint import process_data_fingerprint, get_last_viewed_item, process_data_last_viewed

routes_bp = Blueprint("routes", __name__)

@routes_bp.route("/submitFP", methods=["POST"])
@limiter.limit("45 per minute")  # 45 requests per minute per IP limit
def submit_FP():
    # Request Size Check
    MAX_SUBMIT_SIZE = 0.03 * 1024 * 1024  # 0.03 MB
    content_length = request.content_length
    if content_length is not None and content_length > MAX_SUBMIT_SIZE:
        return "", 413

    # Data Procession
    data = request.get_json()
    if not data:
        return "", 400

    origin_page = data.get("originPage")
    process_data_fingerprint(data)

    return_data = ""
    if (origin_page == "/" or origin_page == "/index" or origin_page == "/index.html"):
        return_data = {
            "fingerprint": data["fingerprint"],
            "lastItemViewed": get_last_viewed_item(data["fingerprint"])
        }
    elif (origin_page == "/fp-overview" or origin_page == "/fp-overview.html"):
        return_data = data
    
    return return_data, 200

@routes_bp.route("/submitLV", methods=["POST"])
@limiter.limit("45 per minute")  # 45 requests per minute per IP limit
def submit_LV():
    # Request Size Check
    MAX_SUBMIT_SIZE = 0.01 * 1024 * 1024  # 0.01 MB
    content_length = request.content_length
    if content_length is not None and content_length > MAX_SUBMIT_SIZE:
        return "", 413

    # Data Procession
    data = request.get_json()
    if not data:
        return "", 400

    process_data_last_viewed(data)

    return "", 200