-- init.sql
-- Ensure the role 'custom_user' is created with the specified password
DO
$do$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'user') THEN
      CREATE ROLE user WITH LOGIN PASSWORD 'pass';
   END IF;
END
$do$;

-- Optionally, create another role and grant it privileges
-- DO
-- $do$
-- BEGIN
--    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'custom_role') THEN
--       CREATE ROLE custom_role WITH LOGIN PASSWORD 'role_password';
--    END IF;
-- END
-- $do$;

-- Grant all privileges on the database to 'custom_user'
GRANT ALL PRIVILEGES ON DATABASE db TO user;

-- Optionally, grant privileges to another role
-- GRANT ALL PRIVILEGES ON DATABASE custom_db TO custom_role;
