CREATE TABLE ct_emergencycontacts (
	id uuid NOT NULL,
	"type" int4 NOT NULL,
	cityphone varchar NULL,
	mobilephone varchar NULL,
	modifieduserid uuid NOT NULL,
	modifieddatetime timestamp NOT NULL
);