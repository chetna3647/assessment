module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS role_has_permissions( 
            id bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
            role_id bigint NOT NULL,
            permission_id bigint NOT NULL,
            created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NULL ON UPDATE CURRENT_TIMESTAMP
        );`,
    "down": `DROP TABLE IF EXISTS role_has_permissions;`,
}