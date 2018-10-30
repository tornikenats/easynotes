
def read_secret(name, default=None):
    try:
        with open('/run/secrets/{}'.format(name), 'r') as f:
            return f.read().strip()
    except Exception:
        return default