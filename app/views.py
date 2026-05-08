from flask import Blueprint, render_template

views_bp = Blueprint("views", __name__)

@views_bp.route("/")
@views_bp.route("/index")
@views_bp.route("/index.html")
def index():
    return render_template("index.html")

@views_bp.route('/fp-overview')
@views_bp.route("/fp-overview.html")
def fpOverview():
    return render_template("fp-overview.html")

# Demo (E-Shop) Items
@views_bp.route("/fp-demo-items/item01")
@views_bp.route("/fp-demo-items/item01.html")
def item01():
    return render_template("/fp-demo-items/item01.html")
        
@views_bp.route("/fp-demo-items/item02")
@views_bp.route("/fp-demo-items/item02.html")
def item02():
    return render_template("/fp-demo-items/item02.html")

@views_bp.route("/fp-demo-items/item03")
@views_bp.route("/fp-demo-items/item03.html")
def item03():
    return render_template("/fp-demo-items/item03.html")

@views_bp.route("/fp-demo-items/item04")
@views_bp.route("/fp-demo-items/item04.html")
def item04():
    return render_template("/fp-demo-items/item04.html")

@views_bp.route("/fp-demo-items/item05")
@views_bp.route("/fp-demo-items/item05.html")
def item05():
    return render_template("/fp-demo-items/item05.html")

@views_bp.route("/fp-demo-items/item06")
@views_bp.route("/fp-demo-items/item06.html")
def item06():
    return render_template("/fp-demo-items/item06.html")

@views_bp.route("/fp-demo-items/item07")
@views_bp.route("/fp-demo-items/item07.html")
def item07():
    return render_template("/fp-demo-items/item07.html")

@views_bp.route("/fp-demo-items/item08")
@views_bp.route("/fp-demo-items/item08.html")
def item08():
    return render_template("/fp-demo-items/item08.html")