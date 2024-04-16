create table time_log (
    id bigint NOT NULL,
    time_count_hours bigint NOT NULL,
    user_id bigint NOT NULL,
    updated_at date not null,
    primary key (id),

    constraint user_timelog_fk foreign key (user_id) references auth_user (id)
);

create sequence time_log_id_seq start with 2 increment by 1;

alter table auth_user add column rate bigint;