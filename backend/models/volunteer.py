from mongoengine import Document, StringField, DateTimeField, signals
from datetime import datetime
import pytz

class Volunteer(Document):
    name = StringField(required=True)
    contact = StringField()
    address = StringField()
    district = StringField()
    timeanddate = DateTimeField()  # Automatically updated on save

    @classmethod
    def pre_save(cls, sender, document, **kwargs):
        """Update the timeanddate field before saving with Indian timezone."""
        india_tz = pytz.timezone('Asia/Kolkata')
        document.timeanddate = datetime.now(india_tz)

signals.pre_save.connect(Volunteer.pre_save, sender=Volunteer)