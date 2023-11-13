create table persistent_user_details
(
    id                  bigint       not null,

    username            varchar(255) not null,
    password            varchar(255) not null,
    enabled             boolean      not null default true,
    expired             boolean      not null default false,
    locked              boolean      not null default false,
    credentials_expired boolean      not null default false,

    primary key (id)
);

create table user_role
(
    user_id bigint       not null,
    role    varchar(255) not null,

    constraint fk_role_user_id foreign key (user_id) references persistent_user_details (id)
);

create sequence user_details_seq start with 2 increment by 1;