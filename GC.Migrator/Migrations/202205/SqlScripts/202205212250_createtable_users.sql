CREATE TABLE us_users (
	id uuid NOT NULL,
	login varchar NOT NULL,
	passwordhash varchar NOT NULL,
	lastmodifieddatetime timestamp(0) NOT NULL,
	lastmodifieduserid uuid NOT NULL,
	isremoved bool NOT NULL DEFAULT false,
	CONSTRAINT users_pk PRIMARY KEY (id)
);