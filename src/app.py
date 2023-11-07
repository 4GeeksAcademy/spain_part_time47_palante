"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, Readings, Meditations, Podcast
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
import random

#from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

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

#Readings
#endpoint para ver todos los Readings
@app.route('/readings', methods=['GET'])
def get_readings():
    readings_all = Readings.query.all()  
    readings_list = list(map(lambda readings: readings.serialize(), readings_all))
    return jsonify(readings_list), 200

#endpoint para ver cada Readings
@app.route('/readings/<int:reading_id>', methods=['GET'])
def get_reading_id(reading_id):
    reading = Readings.query.get(reading_id)
    if reading is None:
        return jsonify({'msg':'Reading not found'}), 400
    else:
        return jsonify({'msg':'ok','inf':reading.serialize()})
    
# endpoint para ingresar Readings en la tabla
@app.route('/readings', methods=['POST'])
def create_readings():
    body = request.get_json(silent=True)
    print(body)
    if body is None:
        return jsonify({'msg': 'Debes enviar informacion en el body'}), 400
    if 'title' not in body:
        return jsonify({'msg': 'Debes enviar un title en el body'}), 400
    if 'review' not in body:
        return jsonify({'msg': 'Debes enviar un review en el body'}), 400
    if 'URLPhoto' not in body:
        return jsonify({'msg': 'Debes enviar una URL en el body'}), 400
    if 'download' not in body:
        return jsonify({'msg': 'Debes enviar una URL de en el body'}), 400
    
        # Generar un id aleatorio si no se proporciona
    id_reading = random.randint(1, 1000000)
    
    new_reading = Readings(title=body['title'], review=body['review'], URLPhoto=body['URLPhoto'], download=body['download'], id=id_reading)
    
    db.session.add(new_reading)
    db.session.commit()

    return jsonify({'msg': 'ok'}),200

# endpoint para actualizar en la tabla de Readings
@app.route('/readings/<int:reading_id>', methods=['PUT'])
def update_reading(reading_id):
    reading = Readings.query.get(reading_id)
    if reading is None:
        return jsonify({'msg': 'El reading de id:{} no existe'.format(reading_id)})
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Debes enviar informacion en el body'}), 400
    if 'title' in body:
        reading.title = body['title']
    if 'URLPhoto' in body:
        reading.URLPhoto = body['URLPhoto']
    if 'review' in body:
        reading.review = body['review']
    db.session.commit()
    return jsonify({'msg':'ok'}), 200

#endpoint para eliminar en la tabla de Readings
@app.route('/readings/<int:reading_id>', methods=['DELETE'])
def delete_reading(reading_id):
    reading = Readings.query.get(reading_id)
    if reading is None:
        raise APIException('El reading con id {} no existe'.format(reading_id), status_code=400)
    db.session.delete(reading)
    db.session.commit()
    return jsonify({'msg':'ok'}), 200

#Meditations
#endpoint para ver todos los Meditations
@app.route('/meditations', methods=['GET'])
def get_meditations():
    meditations_all = Meditations.query.all()  
    meditations_list = list(map(lambda meditations: meditations.serialize(), meditations_all))
    return jsonify(meditations_list), 200

#endpoint para ver cada Meditations
@app.route('/meditations/<int:meditation_id>', methods=['GET'])
def get_meditation_id(meditation_id):
    meditation = Meditations.query.get(meditation_id)
    if meditation is None:
        return jsonify({'msg':'Meditation not found'}), 400
    else:
        return jsonify({'msg':'ok', 'inf':meditation.serialize()})

#endpoint para agregar Meditations
@app.route('/meditations', methods=['POST'])
def create_meditations():
    body = request.get_json(silent=True)
    print(body)
    if body is None:
        return ({'msg':'Send information in body'})
    if 'title' not in body:
        return ({'msg':'Send tittle in body'})
    if 'URLVideo' is None:
        return ({'msg':'Send URL in body'})
    
    # Generar un id aleatorio si no se proporciona
    id_meditation = random.randint(1, 1000000)
    
    new_meditation = Meditations(title=body['title'], URLVideo=body['URLVideo'], id=id_meditation)
    
    db.session.add(new_meditation)
    db.session.commit()
    return jsonify({'msg': 'ok'}),200

# endpoint para actualizar en la tabla de Meditations
@app.route('/meditations/<int:meditation_id>', methods=['PUT'])
def update_meditation(meditation_id):
    meditation = Meditations.query.get(meditation_id)
    if meditation is None:
        return jsonify({'msg': 'The id of meditation:{} does not exist'.format(meditation_id)})
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Send information in the body'}), 400
    if 'title' in body:
        meditation.title = body['title']
    if 'URLVideo' in body:
        meditation.URLVideo = body['URLVideo']
    
    db.session.commit()
    return jsonify({'msg':'ok'}), 200

#endpoint para eliminar en la tabla de Meditations
@app.route('/meditations/<int:meditation_id>', methods=['DELETE'])
def delete_meditation(meditation_id):
    meditation = Meditations.query.get(meditation_id)
    if meditation is None:
        raise APIException({'The id of meditation:{} does not exist'.format(meditation_id)}, status_code=400)
    db.session.delete(meditation)
    db.session.commit()
    return jsonify({'msg':'ok'}), 200

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
