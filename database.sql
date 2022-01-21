CREATE DATABASE file_upload;

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    image_type VARCHAR(10) NOT NULL,
    image_value TEXT NOT NULL
);

SELECT * FROM images;

-- INSERT INTO images (image_type, image_value) VALUES ('type', 'value');