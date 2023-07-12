module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS categories( 
            id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name varchar(255) NULL,
            price double NULL,
            is_deleted tinyint DEFAULT 0,
            created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NULL ON UPDATE CURRENT_TIMESTAMP
        );`,
    "down": `DROP TABLE IF EXISTS categories`
}