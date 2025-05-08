import secrets

# Generate a secure random hexadecimal string (16 bytes = 32 characters)
secret_key = secrets.token_hex(16)
print(secret_key)
