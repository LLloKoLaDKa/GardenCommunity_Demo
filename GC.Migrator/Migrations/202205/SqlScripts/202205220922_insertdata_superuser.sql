INSERT INTO us_users
(id, login, passwordhash, lastmodifieddatetime, lastmodifieduserid, isremoved)
VALUES('f2b1cf43-9205-4fd7-a00e-d7dc483772b7'::uuid, 'admin', '5fa285e1bebe0a6623e33afc04a1fbd5', '2022-01-12 17:55:31.000', 'f2b1cf43-9205-4fd7-a00e-d7dc483772b7'::uuid, false);

INSERT INTO us_userpermissions
(userid, useraccessroleid, id, lastmodifieddatetime)
VALUES('f2b1cf43-9205-4fd7-a00e-d7dc483772b7'::uuid, '9b4dd513-7ac6-4ee8-ab3f-8ff0dbd957d0'::uuid, 'c9e99396-7872-46cd-8a66-20ad25114e48'::uuid, '2022-01-12 17:55:31.000');
