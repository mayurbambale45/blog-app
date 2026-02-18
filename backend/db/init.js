const { Client } = require('pg');
const path = require('path');
const fs = require('fs');

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const dbName = process.env.DB_NAME || 'blogapp';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 5432;

console.log('Using config:', { dbName, dbUser, dbHost, dbPort, hasPassword: !!dbPassword });

const createDatabase = async () => {
    const client = new Client({
        user: dbUser,
        password: dbPassword,
        host: dbHost,
        port: dbPort,
        database: 'postgres', // Connect to default database
    });

    try {
        await client.connect();

        // Check if database exists
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);

        if (res.rowCount === 0) {
            console.log(`Database ${dbName} not found. Creating...`);
            // CREATE DATABASE cannot run in a transaction block
            await client.query(`CREATE DATABASE "${dbName}"`);
            console.log(`Database ${dbName} created successfully.`);
        } else {
            console.log(`Database ${dbName} already exists.`);
        }
    } catch (err) {
        if (err.code === '42P04') { // Duplicate database
            console.log(`Database ${dbName} already exists (error code).`);
        } else {
            console.error('Error creating database:', err);
            fs.writeFileSync('db_error.txt', err.stack || err.message);
            throw err;
        }
    } finally {
        await client.end();
    }
};

const createTables = async () => {
    const client = new Client({
        user: dbUser,
        password: dbPassword,
        host: dbHost,
        port: dbPort,
        database: dbName, // Connect to target database
    });

    const usersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;

    const postsTable = `
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

    const commentsTable = `
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

    try {
        await client.connect();
        console.log('Connected to new database. Creating tables...');

        await client.query(usersTable);
        console.log('Users table checked/created.');

        await client.query(postsTable);
        console.log('Posts table checked/created.');

        await client.query(commentsTable);
        console.log('Comments table checked/created.');

    } catch (err) {
        console.error('Error creating tables:', err);
        fs.writeFileSync('db_error.txt', err.stack || err.message);
        throw err;
    } finally {
        await client.end();
    }
};

const init = async () => {
    try {
        await createDatabase();
        await createTables();
        console.log('Database initialization completed successfully.');
    } catch (err) {
        console.error('Initialization failed:', err);
        process.exit(1);
    }
};

init();
