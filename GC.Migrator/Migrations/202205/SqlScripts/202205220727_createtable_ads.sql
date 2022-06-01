CREATE TABLE public.rd_ads (
	id uuid NOT NULL,
	title varchar NOT NULL,
	description varchar NOT NULL,
	firstname varchar NOT NULL,
	middlename varchar NULL,
	lastname varchar NOT NULL,
	phonenumber varchar NOT NULL,
	publishdate timestamp NULL,
	image varchar NULL,
	modifieduserid uuid NULL,
	modifieddatetime timestamp NOT NULL,
	isremoved bool NOT NULL DEFAULT false,
	"type" int4 NOT NULL
);