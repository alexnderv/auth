create table auth_user
(
    id         bigint       not null,
    email      varchar(100) not null,
    username   varchar(100) not null,
    first_name varchar(100) not null,
    last_name  varchar(100) not null,

    primary key (id)
);

create table phone_number
(
    number  varchar(100) not null,
    user_id bigint       not null,

    constraint fk_number_user foreign key (user_id) references auth_user (id)
);

create sequence auth_user_id_seq start with 2 increment by 1;
