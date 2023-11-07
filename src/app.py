"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User, Freelancer
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from flask_bcrypt import Bcrypt
#from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = os.environ.get("SUPER_SECRET")  # Change this!
jwt = JWTManager(app)

bcrypt = Bcrypt(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response

                   ######### USUARIOS #########

##### ruta de registro de usuario #####
@app.route("/user-register", methods=['POST'])
def user_register():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify('body must be sent'), 400
    if 'full_name' not in body:
        return jsonify('full_name is required'), 400
    if 'email' not in body:
        return jsonify('email is required'), 400
    if 'password' not in body:
        return jsonify('password is required'), 400 
       
    pw_hash = bcrypt.generate_password_hash(body['password']).decode('utf-8')
    new_user = User(full_name = body['full_name'], email = body['email'], password = pw_hash, is_active = True)
    
    db.session.add(new_user)
    db.session.commit()
    return jsonify('Successful registration'),200

##### ruta de inicio de sesion de usuario #####
@app.route("/user-login", methods=["POST"])
def user_login():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify('body must be sent'), 400
    if 'email' not in body:
        return jsonify('email is required'), 400
    if 'password' not in body:
        return jsonify('password is required'), 400

    user = User.query.filter_by(email=body['email']).first()
    if user is None or user.email != body['email'] or not bcrypt.check_password_hash(user.password, body['password']):#user.password != body['password']: 
        return jsonify('incorrect email or password'),400

    access_token = create_access_token(identity=body['email'])
    return jsonify(access_token=access_token)

##### ruta privada de usuario #####
@app.route("/user-private", methods=['GET'])
@jwt_required()
def user_private():
    email = get_jwt_identity()
    return jsonify(email = email)

                #########FREELANCERS#########

##### ruta de registro de freelancer #####
@app.route("/freelancer-register", methods=['POST'])
def freelancer_register():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify('body must be sent'), 400
    if 'full_name' not in body:
        return jsonify('full_name is required'), 400
    if 'age' not in body:
        return jsonify('age is required'), 400
    if 'aboutme' not in body:
        return jsonify('aboutme is required'), 400
    if 'email' not in body:
        return jsonify('email is required'), 400
    if 'password' not in body:
        return jsonify('password is required'), 400
    if 'URLphoto' not in body:
        return jsonify('URLphoto is required'), 400
    if 'professional_registration_number' not in body:
        return jsonify('professional_registration_number is required'), 400
    if 'years_of_experience' not in body:
        return jsonify('years_of_experience is required'), 400
    if 'education' not in body:
        return jsonify('education is required'), 400
    if 'expertise' not in body:
        return jsonify('expertise is required'), 400
    if 'availability' not in body:
        return jsonify('availability is required'), 400
       
    pw_hash = bcrypt.generate_password_hash(body['password']).decode('utf-8')
    
    new_freelancer = Freelancer(full_name=body['full_name'], age=body['age'], email=body['email'], password=pw_hash, 
    aboutme=body['aboutme'], URLphoto=body['URLphoto'], professional_registration_number=body['professional_registration_number'], years_of_experience =body['years_of_experience'], education=body['education'], expertise=body['expertise'], availability=body['availability'], is_active=True)
    db.session.add(new_freelancer)
    db.session.commit()
    return jsonify('Successful registration'), 200 

##### ruta de inicio de sesion de freelancer #####
@app.route("/freelancer-login", methods=['POST'])
def freelancer_token():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify('body must be sent'), 400
    if 'email' not in body:
        return jsonify('email is required'), 400
    if 'password' not in body:
        return jsonify('password is required'), 400
    
    freelancer = Freelancer.query.filter_by(email=body['email']).first()
    if freelancer is None or freelancer.email != body['email'] or not bcrypt.check_password_hash(freelancer.password, body['password']): #freelancer.password != body['password']: 
        return jsonify('incorrect email or password'),400
    
    ##### aqui se crea un token que debe ser guardado en el front-end con sessionstorage y se utilizara para hacer las peticiones #####
    access_token = create_access_token(identity=body['email'])
    return jsonify(access_token=access_token)  

##### ruta privada de freelanecer #####
@app.route("/freelancer-private", methods=['GET'])
@jwt_required()
def freelancer_private():
    email = get_jwt_identity()
    return jsonify(email = email)

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
