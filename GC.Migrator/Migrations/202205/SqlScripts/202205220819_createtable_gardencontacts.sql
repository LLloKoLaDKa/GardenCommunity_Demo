CREATE TABLE ct_gardencontacts (
	id uuid NOT NULL,
	gardenerid uuid NOT NULL,
	phone varchar NOT NULL,
	"type" int4 NOT NULL,
	modifieduserid uuid NOT NULL,
	modifieddatetime timestamp NULL
);