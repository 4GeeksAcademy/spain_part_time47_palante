"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User, Favoritos
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import create_access_token
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_bcrypt import Bcrypt
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required





#from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)


app.url_map.strict_slashes = False
app.config["JWT_SECRET_KEY"] = "nelys"  # Change this in your code!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)


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
CORS(api, supports_credentials=True)

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

@app.route('/signup', methods=['POST'])
def register():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg':'Body must be send'}), 400
    if 'email' not in body:
        return jsonify({'msg':'Email must be send'}),400
    if 'password' not in body:
        return jsonify({'msg':'Password must be send'}), 400
    pw_hash = bcrypt.generate_password_hash(body['password']).decode('utf-8')
    new_user = User()
    new_user.email = body['email']
    new_user.password = pw_hash
    new_user.is_active = True
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': f'User with email {body["email"]} has been created'})



@app.route('/login', methods=['POST'])
def login():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'Mensaje': 'Body must be send'}), 400
    if 'email' not in body:
        return jsonify({'Mensaje': 'Email must be send'}), 400
    if 'password' not in body:
        return jsonify({'Mensaje': 'Password must be send'}), 400

    user = User.query.filter_by(email=body['email']).first()

    if user is None:
        return jsonify({'Mensaje': 'El usuario no existe'}), 400
    if user.password != body['password']:
        return jsonify({'Mensaje': 'La contraseña no es correcta'}), 400

    token = create_access_token(identity=user.email)
    return jsonify({'token': token})

@app.route('/private', methods=['GET'])
@jwt_required()
def private():
    email = get_jwt_identity()
    return jsonify({'Mensaje': 'Metodo privado', 'user': email}), 200

@app.route('/favoritos', methods=['POST'])
@jwt_required()
def agregar_favorito():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    
    if not user:
        return jsonify({'mensaje': 'Usuario no encontrado'}), 404
    
    body = request.get_json(silent=True)
    if 'article_id' not in body:
        return jsonify({'mensaje': 'El ID del artículo debe ser proporcionado'}), 400
    
    article_id = body['article_id']
    
    # Crea una nueva fila en la tabla Favoritos para registrar la relación entre el usuario y el artículo favorito
    favorito = Favoritos(user_id=user.id, article_id=article_id)
    db.session.add(favorito)
    db.session.commit()
    
    return jsonify({'mensaje': 'Artículo marcado como favorito con éxito'}), 200





# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
