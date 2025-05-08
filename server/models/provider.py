from werkzeug.security import generate_password_hash, check_password_hash
from models import db, provider_services

class Provider(db.Model):
    __tablename__ = 'providers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    specialty = db.Column(db.String(100))
    location = db.Column(db.String(120))
    password_hash = db.Column(db.String(128), nullable=False)

    appointments = db.relationship("Appointment", back_populates="provider")
    services = db.relationship("Service", secondary=provider_services, backref="providers")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "specialty": self.specialty,
            "location": self.location,
            "services": [service.to_dict() for service in self.services],
        }
