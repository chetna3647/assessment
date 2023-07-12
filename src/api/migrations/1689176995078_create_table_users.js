module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS users( 
            id bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name varchar(255) NULL,
            email varchar(255) NULL,
            password varchar(255) NULL,
            mobile bigint(20) NULL,
            role_id int NULL,
            is_deleted tinyint DEFAULT 0,
            created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NULL ON UPDATE CURRENT_TIMESTAMP
        );`,
    "down": `DROP TABLE IF EXISTS users`
}