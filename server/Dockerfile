FROM python:3.7-slim

COPY . /noteapp
COPY autoapp.py autoapp.py
WORKDIR /noteapp

RUN pip install -r requirements.txt

EXPOSE 5000

ENTRYPOINT ["gunicorn"]
CMD ["-c", "gunicorn.conf", "autoapp:app"]