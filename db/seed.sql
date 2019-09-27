CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    password VARCHAR(255),
    profile_pic text
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    title varchar(45),
    img text,
    content text,
    author_id INT references users (id)
);

SELECT * FROM posts;

INSERT INTO users(username, password, profile_pic)
VALUES('ZachIsCool2', 'aisasdifasdifgashdf', 'http://digitalimagemakerworld.com/images/random-picture/36902872-random-picture.jpg');
('DevMountain8', 'sdhasdfhasdfhasdh223b', 'https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg');

INSERT INTO posts(title, img, content, author_id)
VALUES('Hello World', 'https://cdn.motor1.com/images/mgl/17XG3/s1/bugatti-la-voiture-noire-leaves-geneva.jpg', 'This is the text of my first post. I hope it comes out alright!', 1)
('Post Numba 2', 'https://gvpcertvideos.att.com/att-videos/2018/gvp_Apple-iPhone-XR-CoralBlackCoral_5000961/gvp_Apple-iPhone-XR-CoralBlackCoral_5000961_360.jpg', 'The new iphone is so cool. Here is my review about it.', 2)