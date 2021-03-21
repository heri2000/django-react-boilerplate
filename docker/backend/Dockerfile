# docker/backend/Dockerfile

FROM python:3.8.5

WORKDIR /app
ADD ./backend/requirements.txt /app/backend/


RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt

ADD ./docker /app/docker
ADD ./backend /app/backend

RUN python /app/backend/server/manage.py migrate





# docker/backend/Dockerfile

# FROM python:3.8.5

# WORKDIR /app
# ADD ./backend/requirements.txt /app/backend/


# RUN pip install --upgrade pip
# RUN pip install gunicorn
# RUN pip install -r backend/requirements.txt

# ADD ./docker /app/docker
# ADD ./backend /app/backend




# docker/backend/Dockerfile

# FROM python:3.8.5

# WORKDIR /app
# ADD ./backend/requirements.txt /app/backend/

# ADD ./docker /app/docker
# ADD ./backend /app/backend

#####
# RUN pip install virtualenv && virtualenv -p python /app/venv
#####

# RUN /app/venv/bin/pip install --upgrade pip
# RUN /app/venv/bin/pip install gunicorn
# RUN /app/venv/bin/pip install -r backend/requirements.txt

#####
# RUN /app/venv/bin/python /app/backend/server/manage.py makemigrations
# RUN /app/venv/bin/python /app/backend/server/manage.py migrate
#####
