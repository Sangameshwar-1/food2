from mongoengine import Document, StringField, DateTimeField, signals
from datetime import datetime
import pytz

class Donor(Document):
    name = StringField(required=True)
    blood_type = StringField()
    contact = StringField()
    address = StringField()
    district = StringField()
    weight = StringField()
    timeanddate = DateTimeField()  # Automatically updated on save

    @classmethod
    def pre_save(cls, sender, document, **kwargs):
        """Update the timeanddate field before saving with Indian timezone."""
        india_tz = pytz.timezone('Asia/Kolkata')
        document.timeanddate = datetime.now(india_tz)

    def to_json(self):
        return {
            "id": str(self.id),
            "name": self.name,
            "blood_type": self.blood_type,
            "contact": self.contact,
            "address": self.address,
            "district": self.district,
            "weight": self.weight,
            "timeanddate": self.timeanddate.isoformat() if self.timeanddate else None
        }

signals.pre_save.connect(Donor.pre_save, sender=Donor)