from app import db
from app.models import Fingerprints
import xxhash
import json
import re

def hash_object(obj):
    if isinstance(obj, bytes):
        data = obj
    elif isinstance(obj, str):
        data = obj.encode()
    elif isinstance(obj, (int, float)):
        data = str(obj).encode()
    else: # Complex Objects (dict, list, tuple, etc.)
        json_text = json.dumps(obj, sort_keys=True, separators=(',', ':'))
        data = json_text.encode()
    return xxhash.xxh128(data).hexdigest()

def process_data_fingerprint(data):
    # Exctract Fingerprint Attributes
    audio = data.get("audio")
    canvas = data.get("canvas")
    js_attributes = data.get("jsAttributes")
    screen_resolution = data.get("screenResolution")
    webgl_image = data.get("webglImage")  
    webgl_data = data.get("webglData")

    # Hash Fingerprint Attributes (Logic Groups)
    hash_audio = hash_object(audio)
    hash_canvas = hash_object(canvas)
    hash_js_attributes = hash_object(js_attributes)
    hash_screen_resolution = hash_object(screen_resolution)
    hash_webgl_image = hash_object(webgl_image)
    hash_webgl_data = hash_object(webgl_data)

    # Additional Hashes
    hash_webgl = hash_object([webgl_image, webgl_data]) # WebGL = WebGL Image + WebGL Data;
    hash_main = hash_object({ # Main = User Fingerprint (Combination of All Fingerprint Attributes)
        "hash_audio": hash_audio,
        "hash_canvas": hash_canvas,
        "hash_js_attributes": hash_js_attributes,
        "hash_creen_resolution": hash_screen_resolution,
        "hash_webgl_image": hash_webgl_image,
        "hash_webgl_data": hash_webgl_data
    })

    # Fingerprint Linking Algorithm
    # 1) Does the Newly Computed Fingerprint (hash_main) Already Exist in the Database?
    #     / Yes => Exit Alghorithm
    #     / No => Continue
    # 2) Do the Stable Attributes (Audio, Canvas, and WebGL) of the Newly Computed Fingerprint Exist in the Database?
    #     / Setup => New Fingerprint (Computed Hashes) Is Saved to the Database
    #     / Yes => New Fingerprint Is Declared Known and Matched to the Oldest Similar Existing One
    #     / No => Exit Alghorithm
    
    # (1)
    return_fingerprint = hash_main

    new_fp = Fingerprints.query.filter_by(main_fp=hash_main).first()
    if new_fp:
        if new_fp.origin_fp:
            return_fingerprint = new_fp.origin_fp
    # (2)
    else:
        known_fingerprints = Fingerprints.query.filter(
            Fingerprints.audio == hash_audio,
            Fingerprints.canvas == hash_canvas,
            Fingerprints.webgl == hash_webgl
        ).all()

        db_data = Fingerprints (
            main_fp = hash_main,
            canvas = hash_canvas,
            webgl = hash_webgl,
            audio = hash_audio,
            js_attributes = hash_js_attributes,
            screen_resolution = hash_screen_resolution
        )
        db.session.add(db_data)
        db.session.commit()

        # (2) Yes
        if known_fingerprints: 
            best_match = None
            best_score = -1

            for fp in known_fingerprints:
                score = 0
                if fp.js_attributes == hash_js_attributes:
                    score += 1
                if fp.screen_resolution == hash_screen_resolution:
                    score += 1

                if score > best_score:
                    best_score = score
                    best_match = fp                
                elif score == best_score:
                    if fp.id < best_match.id:
                        best_match = fp

            db.session.query(Fingerprints).filter_by(main_fp=hash_main).update({"origin_fp": best_match.main_fp})
            db.session.commit()
            return_fingerprint = best_match.main_fp

    # Edit (Format) "data" Object
    data.pop("originPage", None)
    data["fingerprint"] = return_fingerprint
    if ("canvas" in data):
        data["canvas"] = hash_canvas
    if ("webglImage" in data):
        data["webglImage"] = hash_webgl_image    
    return

def get_last_viewed_item(fingerprint):
    result = Fingerprints.query.filter_by(main_fp=fingerprint).first()
    if result:
        return result.last_viewed_item
    return "None"

def process_data_last_viewed(data):
    fingerprint = data.get("fingerprint")
    last_viewed_link = data.get("href")

    match = re.search(r"item(\d+)", last_viewed_link)
    if match:
        last_viewed_item_number = int(match.group(1))
        db.session.query(Fingerprints).filter_by(main_fp=fingerprint).update({"last_viewed_item": last_viewed_item_number})
        db.session.commit()

    return