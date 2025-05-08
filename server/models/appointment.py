from models import db

class Appointment(db.Model):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    provider_id = db.Column(db.Integer, db.ForeignKey("providers.id"), nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey("patients.id"), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey("services.id"), nullable=False)
    appointment_time = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(50), nullable=False, server_default='Pending')

    provider = db.relationship("Provider", back_populates="appointments")
    patient = db.relationship("Patient", back_populates="appointments")
    service = db.relationship("Service", backref="appointments")

    def to_dict(self):
        return {
            "id": self.id,
            "appointment_time": self.appointment_time.isoformat(),
            "status": self.status,
            "provider": self.provider.to_dict() if self.provider else None,
            "service": self.service.to_dict() if self.service else None
        }
