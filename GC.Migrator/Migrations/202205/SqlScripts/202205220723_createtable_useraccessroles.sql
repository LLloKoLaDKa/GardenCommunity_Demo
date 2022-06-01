CREATE TABLE us_useraccessroles (
	id uuid NOT NULL,
	title varchar NOT NULL,
	accesspolicies _varchar NOT NULL,
	lastmodifieddatetime timestamp(0) NOT NULL,
	lastmodifieduserid uuid NOT NULL,
	isremoved bool NOT NULL DEFAULT false,
	CONSTRAINT useraccessroles_pk PRIMARY KEY (id)
);