CREATE DATABASE botpress_loans;

USE botpress_loans;

CREATE TABLE loans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  botpress_user_id VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  phone VARCHAR(50),
  amount DECIMAL(10,2),
  salary DECIMAL(10,2),
  status ENUM('pending','approved','rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
