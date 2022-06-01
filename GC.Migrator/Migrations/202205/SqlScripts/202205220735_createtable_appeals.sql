CREATE TABLE gd_appeals (
	id uuid NOT NULL,
	firstname varchar NOT NULL,
	lastname varchar NOT NULL,
	phonenumber varchar NOT NULL,
	message varchar NOT NULL,
	email varchar NULL,
	createddatetime timestamp NULL,
	isviewed bool NOT NULL DEFAULT false,
	title varchar NOT NULL,
	vieweduserid uuid NULL,
	CONSTRAINT gd_appeals_pk PRIMARY KEY (id)
);