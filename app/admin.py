from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import Graf20

@admin.register(Graf20)
class Graf20Admin(ImportExportModelAdmin):
    pass