CREATE TABLE ct_foreigncontacts (
	id uuid NOT NULL,
	"type" int4 NOT NULL,
	firstname varchar NOT NULL,
	lastname varchar NOT NULL,
	middlename varchar NOT NULL,
	phone varchar NOT NULL,
	modifieduserid uuid NOT NULL,
	modifieddatetime timestamp NOT NULL
);