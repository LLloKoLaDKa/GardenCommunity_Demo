CREATE TABLE rd_novelties (
	id uuid NOT NULL,
	title varchar NOT NULL,
	description varchar NOT NULL,
	publishdate timestamp NULL,
	image varchar NULL,
	modifieduserid uuid NOT NULL,
	modifieddatetime timestamp NOT NULL,
	isremoved bool NOT NULL DEFAULT false
);