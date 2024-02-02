
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Function to hash the password using bcrypt
CREATE OR REPLACE FUNCTION hash_password(plain_password VARCHAR(255)) RETURNS VARCHAR(255) AS $$
BEGIN
  RETURN crypt(plain_password, gen_salt('bf'));
END;
$$ LANGUAGE plpgsql;

-- Function to check if the entered password matches the hashed password
CREATE OR REPLACE FUNCTION check_password(plain_password VARCHAR(255), hashed_password VARCHAR(255)) RETURNS BOOLEAN AS $$
BEGIN
  RETURN hashed_password = crypt(plain_password, hashed_password);
END;
$$ LANGUAGE plpgsql;


