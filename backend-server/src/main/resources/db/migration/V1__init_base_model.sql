create sequence auth_user_id_seq start with 2 increment by 1;
create sequence time_log_id_seq start with 2 increment by 1;
create sequence auth_source_id_seq start with 2 increment by 1;

create table auth_user
(
    id         bigint       not null,
    email      varchar(100) not null,
    username   varchar(100) not null,
    password   varchar(255) not null,
    first_name varchar(100) not null,
    last_name  varchar(100) not null,
    photo      varchar,
    age        int,
    job        varchar,
    bio        text,
    country    varchar,
    city       varchar,
    quote      text,
    rate       bigint,
    role       varchar,

    primary key (id)
);

create table phone_number
(
    number  varchar(100) not null,
    user_id bigint       not null,

    constraint fk_number_user foreign key (user_id) references auth_user (id)
);

create table time_log
(
    id               bigint NOT NULL,
    time_count_hours bigint NOT NULL,
    user_id          bigint NOT NULL,
    updated_at       date   not null,
    primary key (id),

    constraint user_timelog_fk foreign key (user_id) references auth_user (id)
);