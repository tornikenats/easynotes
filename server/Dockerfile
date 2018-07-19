FROM python:3.6

COPY . /noteapp
COPY autoapp.py autoapp.py
WORKDIR /noteapp

RUN pip install -r requirements.txt

EXPOSE 5000

ENTRYPOINT ["gunicorn"]
CMD ["-w 3", "-b :5000", "autoapp:app"]