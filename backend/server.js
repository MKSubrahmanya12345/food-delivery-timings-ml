const app = require('./src/app');
const { connectDB, sequelize } = require('./src/config/db');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        
        // Sync database models
        // In production, use migrations. For hackathon, force sync is easier but use with caution.
        // await sequelize.sync({ force: false }); 
        await sequelize.sync({ alter: true }); // ??$$$ - Adjust schema without deleting data
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();
