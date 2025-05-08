from models import db

class Service(db.Model):
    __tablename__ = 'services'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(300))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "providers": [
                {
                    "id": provider.id,
                    "name": provider.name,
                    "email": provider.email,
                    "specialty": provider.specialty,
                    "location": provider.location,
                }
                for provider in self.providers
            ]
        }
