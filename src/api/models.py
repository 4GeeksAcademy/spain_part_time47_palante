from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), unique=False, nullable=False)
    last_name = db.Column(db.String(60), unique=False, nullable=False)
    user_name = db.Column(db.String(40), unique=True, nullable=True)
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
            "user_name": self.user_name,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Admin(db.Model):
    __tablename__ = 'admin'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), unique=False, nullable=False)
    last_name = db.Column(db.String(60), unique=False, nullable=False)
    user_name = db.Column(db.String(40), unique=True, nullable=True)
    phone_number = db.Column(db.Integer, unique=True, nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    registration_date = db.Column(DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<Admin %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "user_name": self.user_name,
            "phone_number": self.phone_number,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Freelancer(db.Model):
    __tablename__ = 'freelancer'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), unique=False, nullable=False)
    last_name = db.Column(db.String(60), unique=False, nullable=False)
    user_name = db.Column(db.String(40), unique=True, nullable=True)
    phone_number = db.Column(db.Integer, unique=True, nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    registration_date = db.Column(DateTime, default=datetime.utcnow)
    hourly_rate = db.Column(db.Integer, unique=False, nullable=True)
    available = db.Column(db.Boolean(), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<Freelancer %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "user_name": self.user_name,
            "phone_number": self.phone_number,
            "email": self.email,
            "hourly_rate": self.hourly_rate,
            "available": self.available,
            # do not serialize the password, its a security breach
        }
    
class Volunteer(db.Model):
    __tablename__ = 'volunteer'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), nullable=False)
    last_name = db.Column(db.String(60), nullable=False)
    user_name = db.Column(db.String(40), unique=True, nullable=True)
    phone_number = db.Column(db.Integer, unique=True, nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    registration_date = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<Volunteer %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "user_name": self.user_name,
            "phone_number": self.phone_number,
            "email": self.email,
            # do not serialize the password, it's a security breach
        }

    
class Skills(db.Model):
    __tablename__ = 'skills'
    id = db.Column(db.Integer, primary_key=True)
    skill = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(100), nullable=True)
    proficiency = db.Column(db.String(20), nullable=True)
    experience_years = db.Column(db.Integer, nullable=True)
    freelancer_id = db.Column(db.Integer, db.ForeignKey(Freelancer.id))
    freelancer = db.relationship(Freelancer, back_populates="skills")
    volunteer_id = db.Column(db.Integer, db.Foreignkey(Volunteer.id))
    volunteer = db.relationship(Volunteer, back_populates="skills ")
    def __repr__(self):
        return '<Skills %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "skill": self.skill,
            "description": self.description,
            "proficiency": self.proficiency,
            "experience_years": self.experience_years,
        }    

class Project(db.Model):
    __tablename__ = 'project'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(250), nullable=False)
    freelancer_id = db.Column(db.Integer, db.ForeignKey(Freelancer.id))
    freelancer = db.relationship(Freelancer, back_populates="project")    

    def __repr__(self):
        return '<Project %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
        }
    
