import User from '../src/user_admin/admin.model.js';

const createAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: "ADMIN_ROLE" });
        if (!adminExists) {
            const adminData = {
                name: "Admin",
                surname: "User",
                username: "admin",
                email: "admin@example.com",
                password: "adminpassword", 
                phone: "12345678",
                role: "ADMIN_ROLE"
            };
            await User.create(adminData);
            console.log("Admin user created successfully");
        } else {
            console.log("Admin user already exists");
        }
    } catch (err) {
        console.error("Error creating admin user or default category:", err);
    }
};

export default createAdmin;