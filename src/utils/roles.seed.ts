import { Model } from 'mongoose';
import { Role } from 'src/models/role.schema';

export const seedDefaultRoles = async (roleModel: Model<Role>) => {
  const rolesToCreate = [
    { name: 'admin' },
    { name: 'moderator' },
    { name: 'user' },
  ];

  for (const roleData of rolesToCreate) {
    const existingRole = await roleModel.findOne({ name: roleData.name });
    if (!existingRole) {
      await roleModel.create(roleData);
    }
  }
};
