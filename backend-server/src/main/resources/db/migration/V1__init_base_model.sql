create sequence auth_user_id_seq start with 10 increment by 1;
create sequence time_log_id_seq start with 2 increment by 1;

create table auth_user
(
    id                  bigint       not null,
    email               varchar(100) not null,
    username            varchar(100) not null,
    password            varchar(255) not null,
    first_name          varchar(100) not null,
    last_name           varchar(100) not null,
    photo               varchar,
    age                 int,
    job                 varchar,
    bio                 text,
    country             varchar,
    city                varchar,
    quote               text,
    rate                bigint,
    career_role         varchar,
    phone_number        varchar,

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

    constraint fk_role_user_id foreign key (user_id) references auth_user (id)
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