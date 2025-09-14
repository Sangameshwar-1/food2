from flask_bcrypt import generate_password_hash, check_password_hash
from mongoengine import Document, StringField, DateTimeField
from datetime import datetime
import pytz

class User(Document):
    email = StringField(required=True, unique=True)
    password = StringField(required=True)
    name = StringField()
    contact = StringField()
    address = StringField()
    timeanddate = DateTimeField()
    
    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')
    
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def save(self, *args, **kwargs):
        """Override save to automatically set timeanddate if not set"""
        if not self.timeanddate:
            india_tz = pytz.timezone('Asia/Kolkata')
            self.timeanddate = datetime.now(india_tz)
        super(User, self).save(*args, **kwargs)
    
    def to_json(self):
        return {
            "id": str(self.id),
            "email": self.email,
            "name": self.name,
            "contact": self.contact,
            "address": self.address,
            "timeanddate": self.timeanddate.isoformat() if self.timeanddate else None
        }