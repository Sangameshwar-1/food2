from mongoengine import connect
import os

# This function will initialize the database connection
def initialize_db(app):
    # Get configuration from app config or use defaults
    db_name = app.config.get('MONGODB_DB', 'food2')
    host = app.config.get('MONGODB_URI', 'mongodb://localhost:27017/food2')
    
    connect(db=db_name, host=host)
    print(f"Connected to MongoDB: {db_name} at {host}")

# Import all models here so they can be easily imported from the models package
from .user import User
from .donor import Donor
from .volunteer import Volunteer
from .student import Student

__all__ = ['User', 'Donor', 'Volunteer', 'Student', 'initialize_db']