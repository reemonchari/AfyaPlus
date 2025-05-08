from flask_sqlalchemy import SQLAlchemy

# Initialize db
db = SQLAlchemy()

provider_services = db.Table('provider_services',
    db.Column('provider_id', db.Integer, db.ForeignKey('providers.id'), primary_key=True),
    db.Column('service_id', db.Integer, db.ForeignKey('services.id'), primary_key=True)
)
# Import models after db initialization
from models.patient import Patient
from models.provider import Provider
from models.appointment import Appointment
from models.service import Service
from models.user import User
