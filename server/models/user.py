from models import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    user_type = db.Column(db.String(20))

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "user_type": self.user_type,
        }
