CREATE TABLE gd_sectorsales (
	id uuid NOT NULL,
	sectorid uuid NOT NULL,
	firstname varchar NOT NULL,
	lastname varchar NOT NULL,
	middlename varchar NULL,
	modifieduserid uuid NOT NULL,
	modifieddatetime timestamp NOT NULL,
	isremoved bool NOT NULL DEFAULT false,
	price int4 NOT NULL,
	phonenumber varchar NOT NULL,
	publishdate timestamp NOT NULL,
	description varchar NULL
);