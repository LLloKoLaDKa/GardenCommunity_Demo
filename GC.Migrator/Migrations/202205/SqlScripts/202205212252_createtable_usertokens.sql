CREATE TABLE us_usertokens (
	id uuid NOT NULL,
	userid uuid NOT NULL,
	expireddatetime timestamp(0) NOT NULL,
	permissionid uuid NULL,
	lastmodifieddatetime timestamp(0) NOT NULL,
	CONSTRAINT tokens_pk PRIMARY KEY (id)
);