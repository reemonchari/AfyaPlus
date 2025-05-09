from app import app
from models import db, Service, Provider
from werkzeug.security import generate_password_hash
import random


with app.app_context():
    print("Seeding data...")

    db.drop_all()
    db.create_all()

    services = [
        Service(name="General Consultation", description="Comprehensive primary care for a wide range of health concerns."),
        Service(name="Pediatrics", description="Medical care for infants, children, and adolescents."),
        Service(name="Cardiology", description="Heart-related diagnosis and treatment."),
        Service(name="Dermatology", description="Skin, hair, and nail health and treatments."),
        Service(name="Gynecology", description="Women’s reproductive health and prenatal care."),
        Service(name="Dentistry", description="Oral health and dental procedures."),
        Service(name="Orthopedics", description="Bone, joint, and muscle care."),
        Service(name="Mental Health", description="Counseling and psychiatric support services."),
    ]
    db.session.add_all(services)
    db.session.commit()

    provider_map = {
        "General Consultation": [
            ("Dr. Achieng", "achieng@afiaplus.com"),
            ("Dr. Kiptoo", "kiptoo@afiaplus.com"),
            ("Dr. Karanja", "karanja@afiaplus.com"),
            ("Dr. Mwenda", "mwenda@afiaplus.com"),
            ("Dr. Njiru", "njiru@afiaplus.com"),
            ("Dr. Kamau", "kamau@afiaplus.com"),
            ("Dr. Otieno", "otieno@afiaplus.com"),
            ("Dr. Wambui", "wambui@afiaplus.com"),
        ],
        "Pediatrics": [
            ("Dr. Mumbi", "mumbi@afiaplus.com"),
            ("Dr. Omondi", "omondi@afiaplus.com"),
            ("Dr. Wanjiku", "wanjiku@afiaplus.com"),
            ("Dr. Njenga", "njenga@afiaplus.com"),
            ("Dr. Kiragu", "kiragu@afiaplus.com"),
            ("Dr. Njeri", "njeri@afiaplus.com"),
            ("Dr. Kibet", "kibet@afiaplus.com"),
        ],
        "Cardiology": [
            ("Dr. Wanjala", "wanjala@afiaplus.com"),
            ("Dr. Naliaka", "naliaka@afiaplus.com"),
            ("Dr. Kamotho", "kamotho@afiaplus.com"),
            ("Dr. Otieno", "otieno@afiaplus.com"),
            ("Dr. Gitau", "gitau@afiaplus.com"),
            ("Dr. Ngugi", "ngugi@afiaplus.com"),
            ("Dr. Mburu", "mburu@afiaplus.com"),
            ("Dr. Cheruiyot", "cheruiyot@afiaplus.com"),
        ],
        "Dermatology": [
            ("Dr. Mwangi", "mwangi@afiaplus.com"),
            ("Dr. Atieno", "atieno@afiaplus.com"),
            ("Dr. Wambui", "wambui@afiaplus.com"),
            ("Dr. Kamau", "kamau@afiaplus.com"),
            ("Dr. Kinyanjui", "kinyanjui@afiaplus.com"),
            ("Dr. Ndungu", "ndungu@afiaplus.com"),
            ("Dr. Mwai", "mwai@afiaplus.com"),
        ],
        "Gynecology": [
            ("Dr. Kilonzo", "kilonzo@afiaplus.com"),
            ("Dr. Chebet", "chebet@afiaplus.com"),
            ("Dr. Mumbi", "mumbi@afiaplus.com"),
            ("Dr. Njoroge", "njoroge@afiaplus.com"),
            ("Dr. Wanjiru", "wanjiru@afiaplus.com"),
            ("Dr. Limo", "limo@afiaplus.com"),
        ],
        "Dentistry": [
            ("Dr. Barasa", "barasa@afiaplus.com"),
            ("Dr. Kamau", "kamau@afiaplus.com"),
            ("Dr. Njiru", "njiru@afiaplus.com"),
            ("Dr. Otieno", "otieno@afiaplus.com"),
            ("Dr. Cheruiyot", "cheruiyot@afiaplus.com"),
            ("Dr. Mwangi", "mwangi@afiaplus.com"),
            ("Dr. Kiragu", "kiragu@afiaplus.com"),
            ("Dr. Waweru", "waweru@afiaplus.com"),
        ],
        "Orthopedics": [
            ("Dr. Otieno", "otieno@afiaplus.com"),
            ("Dr. Cheruiyot", "cheruiyot@afiaplus.com"),
            ("Dr. Mutua", "mutua@afiaplus.com"),
            ("Dr. Mwenda", "mwenda@afiaplus.com"),
            ("Dr. Karanja", "karanja@afiaplus.com"),
            ("Dr. Kimani", "kimani@afiaplus.com"),
            ("Dr. Ngugi", "ngugi@afiaplus.com"),
        ],
        "Mental Health": [
            ("Dr. Waceke", "waceke@afiaplus.com"),
            ("Dr. Njuguna", "njuguna@afiaplus.com"),
            ("Dr. Kibe", "kibe@afiaplus.com"),
            ("Dr. Gikonyo", "gikonyo@afiaplus.com"),
            ("Dr. Mwendwa", "mwendwa@afiaplus.com"),
            ("Dr. Nyambura", "nyambura@afiaplus.com"),
            ("Dr. Njeri", "njeri@afiaplus.com"),
            ("Dr. Kibwana", "kibwana@afiaplus.com"),
        ],
    }

    locations = [
    "Nairobi", "Mombasa", "Kisumu", "Eldoret", "Nakuru", 
    "Thika", "Meru", "Kakamega", "Kericho", "Nyeri", 
    "Machakos", "Embu", "Kitale", "Narok", "Naivasha"
    ]

    providers = []
    for service_name, provider_list in provider_map.items():
        service = Service.query.filter_by(name=service_name).first()
        for name, email in provider_list:
            provider = Provider.query.filter_by(email=email).first()
            if not provider:
                provider = Provider(
                    name=name,
                    email=email,
                    specialty=service_name,
                    location=random.choice(locations),
                    password_hash=generate_password_hash("password123")
                )
                db.session.add(provider)

            if service not in provider.services:
                provider.services.append(service)

    db.session.commit()

    print("✅ Done seeding!")
