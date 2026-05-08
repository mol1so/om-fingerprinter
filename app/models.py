from app import db

class Fingerprints(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    main_fp = db.Column(db.String(32), unique=True, nullable=False, index=True)
    origin_fp = db.Column(db.String(32), nullable=True)
    
    canvas = db.Column(db.String(32), nullable=True, index=True)
    webgl = db.Column(db.String(32), nullable=True, index=True)
    audio = db.Column(db.String(32), nullable=True, index=True)

    js_attributes = db.Column(db.String(32), nullable=True)
    screen_resolution = db.Column(db.String(32), nullable=True)

    last_viewed_item = db.Column(db.Integer, nullable=True)