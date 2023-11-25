
CREATE TABLE Papeis (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45)
);

INSERT INTO Papeis (nome) VALUES ("Admin");

CREATE TABLE Estandes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    area FLOAT(10,2),
    medio BOOLEAN
);

CREATE TABLE Usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    senha VARCHAR(255),
    id_papel INT,
    FOREIGN KEY (id_papel) REFERENCES Papeis(id)
);