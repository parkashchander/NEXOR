def save_secret(name, value):
    with open("secret.txt", "a") as f:
        f.write(f"{name}:{value}\n")

def get_secret(name):
    try:
        with open("secret.txt") as f:
            for line in f:
                if line.startswith(name + ":"):
                    return line.split(":",1)[1].strip()
    except:
        return None
