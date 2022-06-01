CREATE TABLE gd_sectorcredits (
	id uuid NOT NULL,
	sectorid uuid NOT NULL,
	credit int4 NOT NULL,
	modifieddatetime timestamp NOT NULL,
	modifieduserid uuid NOT NULL
);