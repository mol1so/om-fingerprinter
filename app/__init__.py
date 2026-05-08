import mimetypes
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

db = SQLAlchemy()
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=[],
    storage_uri="memory://"
)

def create_app():
    app = Flask(
        __name__,
        template_folder="../resources/templates",
        static_folder="../resources/static"
    )

    # MIME Types 
    mimetypes.add_type("text/javascript", ".mjs")

    # SQLite Config
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Extensions Binding
    db.init_app(app)
    limiter.init_app(app)
        
    # Blueprints Registration
    from app.errors import errors_bp
    from app.views import views_bp
    from app.routes import routes_bp
    app.register_blueprint(errors_bp)
    app.register_blueprint(views_bp)
    app.register_blueprint(routes_bp)

    # Database Table "Fingerprints" Creation (if it doesn't exist)
    with app.app_context():
        from app.models import Fingerprints
        db.create_all()

    return app