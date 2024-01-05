CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- create ENUM type
CREATE TYPE RoleEnum AS ENUM('customer','admin','manager');

create table if not exists users (
	"id" uuid primary key DEFAULT uuid_generate_v4 (),
    "name" varchar(100) not null,
    "email" varchar(50) not null,
    "password" varchar(100) not null,
    "role" RoleEnum default null,
	"createdAt" timestamp not null default current_timestamp,
    "updatedAt" timestamp not null default current_timestamp,

     constraint email_unique unique (email)
);

insert into users (email, name, password, role)
values ('vinnie@gmail.com', 'vinnie', '123321asd', 'admin');