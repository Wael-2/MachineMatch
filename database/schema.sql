CREATE DATABASE IF NOT EXISTS machine_match;

USE machine_match;

CREATE TABLE sellers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(150) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'Germany',
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE machines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    manufacturer VARCHAR(100) NOT NULL,
    model VARCHAR(100),
    category VARCHAR(100) NOT NULL,
    year INT,
    price DECIMAL(12, 2) NOT NULL,
    location VARCHAR(150) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    seller_id INT NOT NULL,
    weight_kg DECIMAL(10, 2),
    working_hours INT,
    width_mm DECIMAL(10, 2),
    machine_condition VARCHAR(150),
    height_mm DECIMAL(10, 2),
    power_kw DECIMAL(10, 2),

    FOREIGN KEY (seller_id)
        REFERENCES sellers(id)
);

CREATE TABLE inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    machine_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (machine_id)
        REFERENCES machines(id)
);