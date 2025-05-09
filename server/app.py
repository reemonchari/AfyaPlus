from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import jwt
import pytz
from datetime import datetime, timedelta
from models import db, Patient, Provider, Appointment, Service
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config.from_object("config.Config")
db.init_app(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)

# Home Route
@app.route('/')
def home():
    return jsonify({"message": "Welcome to Afya Plus!"})

# AUTHENTICATION Routes
@app.route("/login/patient", methods=["POST"])
def login_patient():
    data = request.get_json()
    patient = Patient.query.filter_by(email=data['email']).first()
    if patient and patient.check_password(data['password']):
        token = jwt.encode({
            'sub': patient.id,
            'type': 'patient',
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify({"message": "Login successful", "token": token, "id": patient.id, "user_type": "patient"}), 200
    return jsonify({"message": "Invalid credentials"}), 401

@app.route("/login/provider", methods=["POST"])
def login_provider():
    data = request.get_json()
    provider = Provider.query.filter_by(email=data['email']).first()
    if provider and provider.check_password(data['password']):
        token = jwt.encode({
            'sub': provider.id,
            'type': 'provider',
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify({"message": "Login successful", "token": token, "id": provider.id, "user_type": "provider"}), 200
    return jsonify({"message": "Invalid credentials"}), 401

# PATIENT Routes
@app.route("/patients", methods=["POST"])
def register_patient():
    data = request.get_json()
    if Patient.query.filter_by(email=data['email']).first():
        return jsonify({"message": "Patient already exists"}), 400

    new_patient = Patient(
        name=data['name'],
        email=data['email'],
        age=data['age']
    )
    new_patient.set_password(data['password'])
    db.session.add(new_patient)
    db.session.commit()
    return jsonify(new_patient.to_dict()), 201

@app.route("/patients", methods=["GET"])
def get_patients():
    patients = Patient.query.all()
    return jsonify([patient.to_dict() for patient in patients])

@app.route("/patients/<int:id>", methods=["GET"])
def get_patient(id):
    patient = Patient.query.get_or_404(id)
    return jsonify(patient.to_dict())

@app.route("/patients/<int:id>", methods=["PUT"])
def update_patient(id):
    data = request.get_json()
    patient = Patient.query.get_or_404(id)
    patient.name = data['name']
    patient.email = data['email']
    patient.age = data['age']
    db.session.commit()
    return jsonify(patient.to_dict())

@app.route("/patients/<int:id>", methods=["DELETE"])
def delete_patient(id):
    patient = Patient.query.get_or_404(id)
    Appointment.query.filter_by(patient_id=id).delete()
    db.session.delete(patient)
    db.session.commit()
    return jsonify({"message": "Patient deleted successfully"}), 200

# PROVIDER Routes
@app.route("/providers/by-service/<int:service_id>", methods=["GET"])
def get_providers_by_service(service_id):
    providers = Provider.query.filter(Provider.services.any(Service.id == service_id)).all()
    
    return jsonify([provider.to_dict() for provider in providers])

@app.route("/providers/<int:id>", methods=["DELETE"])
def delete_provider(id):
    provider = Provider.query.get_or_404(id)
    Appointment.query.filter_by(provider_id=id).delete()
    db.session.delete(provider)
    db.session.commit()
    return jsonify({"message": "Provider deleted successfully"}), 200


# APPOINTMENT Routes
@app.route("/appointments", methods=["POST"])
def create_appointment():
    data = request.get_json()

    if not all(key in data for key in ['provider_id', 'patient_id', 'service_id', 'appointment_time']):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        utc_time = datetime.fromisoformat(data['appointment_time'].replace('Z', '+00:00'))

        local_tz = pytz.timezone("Africa/Nairobi")
        local_time = utc_time.astimezone(local_tz)

        appointment_dt = local_time.replace(tzinfo=None)

        new_appointment = Appointment(
            provider_id=data['provider_id'],
            patient_id=data['patient_id'],
            service_id=data['service_id'],
            appointment_time=appointment_dt,
            status="Scheduled"
        )
        db.session.add(new_appointment)
        db.session.commit()
        return jsonify(new_appointment.to_dict()), 201

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal server error"}), 500
    
@app.route("/appointments", methods=["GET"])
def get_appointments():
    patient_id = request.args.get("patient_id")
    if patient_id:
        appointments = Appointment.query.filter_by(patient_id=patient_id).all()
    else:
        appointments = Appointment.query.all()
    return jsonify([appointment.to_dict() for appointment in appointments])


@app.route("/appointments/<int:id>", methods=["GET"])
def get_appointment(id):
    appointment = Appointment.query.get_or_404(id)
    return jsonify(appointment.to_dict())

from datetime import datetime

@app.route('/appointments/<int:id>', methods=['PUT'])
def update_appointment(id):
    data = request.get_json()
    appointment_time_str = data['appointment_time'] 
    
    try:
        appointment_time = datetime.strptime(appointment_time_str, '%Y-%m-%dT%H:%M')
    except ValueError:
        return jsonify({"error": "Invalid datetime format"}), 400

    appointment = Appointment.query.get(id)
    if not appointment:
        return jsonify({"error": "Appointment not found"}), 404

    appointment.appointment_time = appointment_time
    appointment.status = data['status']
    appointment.provider_id = data['provider_id']
    
    try:
        db.session.commit()
        return jsonify({"message": "Appointment updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route("/appointments/<int:id>", methods=["DELETE"])
def delete_appointment(id):
    appointment = Appointment.query.get_or_404(id)
    db.session.delete(appointment)
    db.session.commit()
    return jsonify({"message": "Appointment deleted successfully"}), 200


# SERVICE Routes
@app.route("/services", methods=["GET"])
def get_services():
    services = Service.query.all()
    print([service.name for service in services])
    return jsonify([service.to_dict() for service in services])

@app.route("/services/<int:id>", methods=["GET"])
def get_service(id):
    service = Service.query.get_or_404(id)
    return jsonify(service.to_dict())

@app.route("/providers/<int:provider_id>/services", methods=["POST"])
def add_service_to_provider(provider_id):
    data = request.get_json()
    service_id = data.get("service_id")
    provider = Provider.query.get_or_404(provider_id)
    service = Service.query.get_or_404(service_id)
    if service not in provider.services:
        provider.services.append(service)
        db.session.commit()
    return jsonify(provider.to_dict()), 200


if __name__ == "__main__":
    app.run(debug=True)
