CREATE TABLE cs_configurationsettings (
	"key" varchar NOT NULL,
	value varchar NOT NULL,
	lastmodifieddatetime timestamp(0) NOT NULL,
	lastmodifieduserid uuid NOT NULL,
	isremoved bool NOT NULL DEFAULT false,
	CONSTRAINT cs_configurationsettings_pk PRIMARY KEY (key)
);