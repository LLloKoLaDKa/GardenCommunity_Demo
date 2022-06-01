CREATE TABLE gd_sectors (
	id uuid NOT NULL,
	sectornumber numeric NOT NULL,
	modifieddatetime timestamp NOT NULL,
	modifieduserid uuid NOT NULL,
	isremoved bool NOT NULL DEFAULT false,
	electricitynumber varchar NOT NULL,
	numberofacres numeric NOT NULL,
	cadastralnumber varchar NOT NULL
);