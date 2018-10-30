# EasyNotes
![Demo gif](docs/Demo.gif)

## Features
- [x] Save notes
- [x] Tag notes
- [x] Filter by tags
- [x] Login based
- [x] HTTPS

## Requirements
* Python 3
* MongoDB
* Docker
* Flask
* React/React-redux

## Install

```git clone https://github.com/TornikeNatsvlishvili/easynotes.git```

### Set unique properties
#### Set ssl certs
```
# notes.nginx
ssl_certificate <your-fullchain.pem>;
ssl_certificate_key <your-privkey.pem>;
```

#### Set app secret and first user credentials with Docker Secrets

* APP_SECRET
  * default: CHANGE_ME
* FIRST_USER
  * default: CHANGE_ME
* FIRST_USER_PASSWORD
  * default: CHAN
* PYOTP_SECRET_KEY
  * default: CHANGEMEbase3232

#### Building
Use the supplied makefile.

## License

MIT
