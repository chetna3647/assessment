module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS permissions( 
            id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name varchar(255) NULL,
            action varchar(255) NULL,
            controller varchar(255) NULL,
            created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NULL ON UPDATE CURRENT_TIMESTAMP
        );`,
    "down": `DROP TABLE IF EXISTS permissions`
}