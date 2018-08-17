import json
from urllib.request import urlopen

def create_json():
    # Open JSON from ucampus API
    json_link = "https://ucampus.uchile.cl/b/fcfm_catalogo/cursos"
    json_data = urlopen(json_link)
    data = json.loads(json_data.read().decode())
    new_data = [] # Data with the new json
    # Init primary key for each model
    pk_semester = 1
    pk_subject = 1
    pk_teacher = 1
    pk_course = 1
    # Init parser API ucampus
    for age in data.keys():
        for semester in data[age].keys():
            # Create semester model
            semester_data = {'model': 'subject.Semester', 'pk': pk_semester, 'fields': {
                'name': semester.title(),
                'year': int(age)
            }}
            new_data.append(semester_data) # Add model to json file
            for department in data[age][semester].keys():
                for code in data[age][semester][department].keys():
                    name_course = data[age][semester][department][code]['nombre'] # course's name
                    # Create subject model
                    subject_data = {'model': 'subject.Subject', 'pk': pk_subject, 'fields': {
                        'code': code,
                        'department': department.capitalize(),
                        'name': name_course,
                        'note': 0
                    }}
                    new_data.append(subject_data) # Add model to json file
                    for section in data[age][semester][department][code]['secciones'].keys():
                        for teacher in data[age][semester][department][code]['secciones'][section]['profesores']:
                            # Create Teacher model
                            teacher_data = {'model': 'teacher.Teacher', 'pk': pk_teacher, 'fields': {
                                'name': teacher.title(),
                                'note': 0
                            }}
                            new_data.append(teacher_data) # Add model to json file
                            # Create Course model
                            course_data = {'model': 'subject.Course', 'pk': pk_course, 'fields': {
                                'subject': code,
                                'semester': pk_semester,
                                'teacher': teacher.title(),
                                'section': int(section)
                            }}
                            new_data.append(course_data) # Add model to json file
                            # Actualice primary key of each model
                            pk_teacher += 1
                            pk_course += 1
                    pk_subject += 1
            pk_semester += 1
    # Create new json to load data base
    json_name = "ParserCursos.json"
    with open(json_name, 'w') as file_json:
        json.dump(new_data,file_json)

create_json()

# python manage.py makemigrations
# python manage.py migrate --run-syncdb
# Can you run python manage.py loaddata ParserCursos.json
