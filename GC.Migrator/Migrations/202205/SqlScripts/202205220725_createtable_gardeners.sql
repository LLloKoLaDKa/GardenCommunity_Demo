CREATE TABLE gd_gardeners (
	id uuid NOT NULL,
	firstname varchar NOT NULL,
	middlename varchar NULL,
	lastname varchar NOT NULL,
	modifieddatetime timestamp NOT NULL,
	modifieduserid uuid NOT NULL,
	isremoved bool NOT NULL DEFAULT false,
	sectorid uuid NOT NULL
);