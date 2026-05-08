from flask import Blueprint, render_template
from werkzeug.exceptions import HTTPException

errors_bp = Blueprint("errors", __name__)

@errors_bp.app_errorhandler(Exception)
def handle_all_errors(e):
    # HTTPException (404, 403, 405, etc.)
    if isinstance(e, HTTPException):
        return render_template("error.html", ecode=e.code), e.code

    # Regular Python Exception -> Return 500
    return render_template("error.html", ecode=500), 500