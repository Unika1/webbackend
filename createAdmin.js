import bcrypt from 'bcrypt';
import  User  from './model/User.js'; // Adjust the path to your User model

const createAdmin = async () => {
  try {
    const username = "AdminUser1";
    const email = "utnika@gmail.com";
    const plainPassword = "123456"; // Choose a strong password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Check if the admin already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log("Admin already exists.");
      return;
    }

    // Create the admin user
    await User.create({
      username,
      email,
      password: hashedPassword,
      role: "admin", // Explicitly setting the role to admin
    });

    console.log("Admin user created successfully!");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

createAdmin();
