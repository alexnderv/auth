CREATE TABLE persistent_user_details
(
    id                  BIGINT PRIMARY KEY,

    username            VARCHAR(255) NOT NULL,
    password            VARCHAR(255) NOT NULL,
    enabled             BOOLEAN      NOT NULL DEFAULT TRUE,
    expired             BOOLEAN      NOT NULL DEFAULT FALSE,
    locked              BOOLEAN      NOT NULL DEFAULT FALSE,
    credentials_expired BOOLEAN      NOT NULL DEFAULT FALSE
);

CREATE TABLE user_role
(
    id        BIGINT PRIMARY KEY,

    user_id   BIGINT NOT NULL,
    role VARCHAR(255) NOT NULL,

    CONSTRAINT fk_role_user_id FOREIGN KEY (user_id) REFERENCES persistent_user_details (id)
);