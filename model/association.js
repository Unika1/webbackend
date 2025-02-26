import User from './User.js';
import Comment from './Comment.js';
import Remedy from './Remedy.js';

// Associations
User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Remedy, { foreignKey: 'userId', onDelete: 'CASCADE' });
Comment.belongsTo(Remedy, { foreignKey: 'remedyId' });
