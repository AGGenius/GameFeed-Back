CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	active BOOLEAN NOT NULL,
	email VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	name VARCHAR(50) NOT NULL,
	nick VARCHAR(25) NOT NULL,
	type VARCHAR(25) NOT NULL
)

CREATE TABLE games (
	id SERIAL PRIMARY KEY,
	active BOOLEAN NOT NULL,
	tittle VARCHAR(50) UNIQUE NOT NULL,
	genre VARCHAR(50) NOT NULL,
	developer VARCHAR(50) NOT NULL,
	release DATE NOT NULL,
	user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
)

CREATE TABLE posts (
	id SERIAL PRIMARY KEY,
	active BOOLEAN NOT NULL,
	type VARCHAR(50) UNIQUE NOT NULL,
	date DATE NOT NULL,
	content TEXT NOT NULL,
	user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
	game_id INTEGER REFERENCES games(id) ON DELETE CASCADE
)

CREATE TABLE likes (
	id SERIAL PRIMARY KEY,
	game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
	post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
	value INT NOT NULL
)

CREATE TABLE usersLikes (
	id SERIAL PRIMARY KEY,
	active BOOLEAN NOT NULL,
	user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
	likes_id INTEGER REFERENCES likes(id) ON DELETE CASCADE
)

INSERT INTO users (active, email, password, name, nick, type) VALUES
('true', 'admin@gamefeed.com', '1234', 'admin', 'allmight', 'admin'),
('true', 'pome@gamefeed.com', '1234', 'Pomelo', 'Pome', 'user')

INSERT INTO games (tittle, genre, developer, release, user_id) VALUES
('true', 'Spyro the Dragon', 'adventure', 'Insomniac Games', '1998-09-09', 1),
('true', 'Stuart Little 2', 'platforms', 'Activision', '2000-01-01', 2)
