from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid
# Create your models here.

class UserProfile(models.Model):

    user = models.OneToOneField(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=120)
    u_id = models.CharField(max_length=8,blank=True,null=True)
    picture = models.ImageField(upload_to='images/',blank=True,null=True,default='images/Default_pic.jpg')
    about_myself = models.TextField(blank=True,null=True,default='will add later')
    address = models.CharField(max_length=255)
    contact_no = models.CharField(max_length=20,blank=True,null=True, default='+880')

    def _str_(self):
        return self.name


class Rooms(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    room_no = models.IntegerField(blank=True,null=True,default=707)
    room_name = models.CharField(max_length=200)
    room_description = models.TextField(blank=True, null=True)
    room_pic = models.ImageField(upload_to='images/', null=True, blank=True,default='images/Default_pic.jpg')
    room_category = models.CharField(max_length=200)
    room_capacity = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(500)])

    def __str__(self):
        return self.room_name

