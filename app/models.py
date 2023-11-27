from django.db import models

class Graf20(models.Model):
    name = models.CharField(max_length=200)
    indods = models.CharField(max_length=50)
    indicadorinterno = models.CharField(max_length=50) 
    program = models.CharField(max_length=50)
    estudio = models.CharField(max_length=50)
    tema = models.CharField(max_length=200)
    perfil = models.CharField(max_length=50)
    start_date= models.DateField()

    class Meta:
        db_table = 'graf20'
        
