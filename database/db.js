import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Initialize Sequelize instance with database credentials from environment variables
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        logging: false,  // Disable logging if not needed
    }
);

// Test connection to the database
async function testConnection() {
    try {
        await sequelize.authenticate(); // Authenticate the sequelize connection
        console.log('DB connection successful............................');
    } catch (error) {
        console.error('Unable to connect to the database...............', error);
    }
}

// Call the testConnection to ensure the DB connection is successful
testConnection();  

// Export sequelize instance for use in other parts of the app
export { sequelize };
