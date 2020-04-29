
-- TABLE USER
-- all pasword wil be encrypted using SHA1
  CREATE TABLE users (
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
  );

  ALTER TABLE users
    ADD PRIMARY KEY (id);

  ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;


  INSERT INTO users (id, username, password, fullname) 
    VALUES (1, 'john', 'password1', 'John Carter');

-- LINKS TABLE
CREATE TABLE links (
  id INT(11) NOT NULL,
  nameProduct VARCHAR(150) NOT NULL,
  tipo VARCHAR(255) NOT NULL,
  unidadMedida VARCHAR(250),
  initCantd INT(255),
  updateCantd INT(255),
  cost DECIMAL(4,2),
  iva DECIMAL(5,2),
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE links
  ADD PRIMARY KEY (id);

ALTER TABLE links
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

