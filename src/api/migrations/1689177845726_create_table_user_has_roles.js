module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS user_has_roles( 
            id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_id bigint NULL,
            role_id bigint NULL,
            created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
		    updated_at timestamp NULL ON UPDATE CURRENT_TIMESTAMP
        );`,
    "down": `DROP TABLE IF EXISTS user_has_roles`
}