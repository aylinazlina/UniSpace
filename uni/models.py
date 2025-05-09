from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid


# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=120)
    u_id = models.CharField(max_length=8, blank=True, null=True)
    picture = models.ImageField(upload_to='images/', blank=True, null=True, default='images/Default_pic.jpg')
    about_myself = models.TextField(blank=True, null=True, default='will add later')
    address = models.CharField(max_length=255)
    contact_no = models.CharField(max_length=20, blank=True, null=True, default='+880')

    def __str__(self):
        return self.name


class Rooms(models.Model):
    Room_Choices = [

        ('Lecture Hall', 'Lecture Hall'),
        ('Lab', 'Lab'),
        ('Auditorium', 'Auditorium'),
        ('Office', 'Office'),
        ('Seminar Room', 'Seminar Room'),

    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    room_no = models.IntegerField(blank=True, null=True, default=707)
    room_type = models.CharField(max_length=30, choices=Room_Choices, default='Lecture Hall', blank=True, null=True)
    building_name = models.CharField(max_length=200)
    room_description = models.TextField(blank=True, null=True)
    room_pic = models.ImageField(upload_to='images/', null=True, blank=True, default='images/Default_pic.jpg')
    room_category = models.CharField(max_length=200)
    room_capacity = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(500)])

    def __str__(self):
        return self.room_type



class Booking(models.Model):
    room = models.ForeignKey(Rooms, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    purpose = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.room} booked by {self.user} on {self.date} from {self.start_time} to {self.end_time}"


class Routine(models.Model):
    DAYS = [
        ('Monday', 'Monday'),
        ('Tuesday', 'Tuesday'),
        ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'),
        ('Friday', 'Friday'),
        ('Saturday', 'Saturday'),
        ('Sunday', 'Sunday'),
    ]

    room = models.ForeignKey("Rooms", on_delete=models.CASCADE, related_name='routines')
    day = models.CharField(max_length=10, choices=DAYS)
    start_time = models.TimeField()
    end_time = models.TimeField()
    subject_or_purpose = models.CharField(max_length=200, blank=True, null=True)


def __str__(self):
    return f"{self.room.room_no} - {self.day} {self.start_time}-{self.end_time}"
