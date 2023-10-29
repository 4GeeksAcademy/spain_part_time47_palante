from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), unique=False, nullable=False)
    last_name = db.Column(db.String(60), unique=False, nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Admini(db.Model):
    __tablename__ = 'admini'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), unique=False, nullable=False)
    last_name = db.Column(db.String(60), unique=False, nullable=False)
    phone_number = db.Column(db.Integer, unique=True, nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    registration_date = db.Column(DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<Admini %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "phone_number": self.phone_number,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Freelancer(db.Model):
    __tablename__ = 'freelancer'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), unique=False, nullable=False)
    last_name = db.Column(db.String(60), unique=False, nullable=False)
    age = db.Column(db.Integer, unique=False, nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    registration_date = db.Column(db.DateTime, default=datetime.utcnow)
    professional_registration_number = db.Column(db.Integer, unique=True)
    years_of_experience = db.Column(db.Integer, unique=False)
    education = db.Column(db.String(120), unique=False)
    expertise = db.Column(db.String(200), unique=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<Freelancer %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "age": self.age,
            "email": self.email,
            "professional_registration_number": self.professional_registration_number,
            "years_of_experience": self.years_of_experience,
            "education": self.education,
            "expertise": self.expertise,
            # do not serialize the password, its a security breach
        }
    
class Volunteer(db.Model):
    __tablename__ = 'volunteer'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), nullable=False)
    last_name = db.Column(db.String(60), nullable=False)
    phone_number = db.Column(db.Integer, unique=True, nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    registration_date = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<Volunteer %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "phone_number": self.phone_number,
            "email": self.email,
            # do not serialize the password, it's a security breach
        }