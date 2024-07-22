CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(255)) NOT NULL,
	name VARCHAR(50) NOT NULL,
	nick VARCHAR(25) NOT NULL,
	type VARCHAR(25) NOT NULL,
	state VARCHAR(25) NOT NULL
);

CREATE TABLE likes (
	id SERIAL PRIMARY KEY,
	game_id INTEGER REFERENCES games(id),
	post_id INTEGER REFERENCES posts(id),
	value INT NOT NULL
);

CREATE TABLE usersLikes (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES user(id),
	likes_id INTEGER REFERENCES likes(id)
);

CREATE TABLE games (
	id SERIAL PRIMARY KEY,
	tittle VARCHAR(50) UNIQUE NOT NULL,
	genre VARCHAR(50) NOT NULL,
	developer VARCHAR(50) NOT NULL,
	release DATE NOT NULL,
	user_id INTEGER REFERENCES users(id)
);

CREATE TABLE posts (
	id SERIAL PRIMARY KEY,
	type VARCHAR(50) UNIQUE NOT NULL,
	date DATE NOT NULL,
	content TEXT NOT NULL,
	user_id INTEGER REFERENCES users(id),
	game_id INTEGER REFERENCES games(id)
);

INSERT INTO users (email, password, name, nick, type, state) VALUES
('admin@gamefeed.com', '1234', 'admin', 'allmight', 'admin', 'active')

INSERT INTO games (tittle, genre, developer, release, user_id) VALUES
('example1', 'adventure', 'Someone1', '2024-07-22', 1),
('example2', 'fps', 'Someone2', '2024-07-22', 1)
