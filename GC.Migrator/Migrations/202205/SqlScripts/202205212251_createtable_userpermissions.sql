CREATE TABLE us_userpermissions (
	userid uuid NOT NULL,
	useraccessroleid uuid NOT NULL,
	id uuid NOT NULL,
	lastmodifieddatetime timestamp(0) NOT NULL,
	CONSTRAINT userspermissions_pk PRIMARY KEY (id)
);