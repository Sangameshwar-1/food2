from mongoengine import Document, StringField, DateTimeField, signals
from datetime import datetime
import pytz

class Student(Document):
    name = StringField(required=True)
    age = StringField()
    branch = StringField()
    timeanddate = DateTimeField()  # Automatically updated on save

    @classmethod
    def pre_save(cls, sender, document, **kwargs):
        """Update the timeanddate field before saving with Indian timezone."""
        india_tz = pytz.timezone('Asia/Kolkata')
        document.timeanddate = datetime.now(india_tz)

# Connect the pre_save signal to the Student model
signals.pre_save.connect(Student.pre_save, sender=Student)