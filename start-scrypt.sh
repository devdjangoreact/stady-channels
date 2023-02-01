#!/bin/bash
# django
echo "server create and chenge dir to server"
mkdir server && cd server 

echo "initialision python venv"
python3 -m venv venv
echo "Activate venv"
source venv/bin/activate
echo "create requirements.txt"
touch requirements.txt
echo "write requirements"
echo "
Django==3.2.6
dj-database-url==0.5.0
djangorestframework==3.13.1
gunicorn==20.1.0
psycopg2-binary==2.9.2
whitenoise==5.3.0
coreapi==2.3.3
drf-yasg==1.21.4
djangorestframework-simplejwt==5.2.1
django-cors-headers==3.13.0
channels==4.0.0
channels-redis==4.0.0
daphne==4.0.0
Pillow==9.3.0
pytest-asyncio==0.20.1
pytest-django==4.5.2
"  >> requirements.txt 
echo "install requirements"
pip3 install -r requirements.txt
echo "create django, app - users, first migrate"
django-admin startproject core .
python3 manage.py startapp users
python3 manage.py migrate

# react
cd ..
npx create-react-app client --template typescript
yarn add axios==^1.2.6 dotenv==^16.0.3 react-icons==^4.7.1 react-redux==^8.0.2
@reduxjs/toolkit==^1.8.3 react-router-dom==^6.3.0
