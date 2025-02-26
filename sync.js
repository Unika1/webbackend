import { sequelize } from './database/db.js';
import Category from './model/Category.js'; // Import your models here

async function sync() {
  try {
    await sequelize.sync({ force: false }); // Set force: true to drop tables if needed
    console.log('Database synchronized successfully.');

    // Insert default categories if necessary
    const count = await Category.count();
    if (count === 0) {
      await Category.bulkCreate([
        { name: 'Hair Care' },
        { name: 'Body Care' },
        { name: 'Face Care' },
      ]);
      console.log('Default categories added.');
    }
  } catch (error) {
    console.error('Error syncing the database:', error);
  }
}

export {sync};