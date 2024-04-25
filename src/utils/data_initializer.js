import generator from "../api/permission/services/generator.js";
import Role from "../api/role/models/role.js";
import { roles } from "../api/role/role_constants.js";
import Role_permission from "../api/permission/models/Role_permission.js";
import Permission from "../api/permission/models/permission.js";
import User from "../api/user/models/user.js";
import role_permissions_list from "../constants/role_permissions.js";
import adminUser from "../constants/adminUser.js";
const { permissions } = await generator();
let role_names = Object.values(roles).map((r) => {
  return { name: r };
});

//create roles and admin permissions for all
const createRoles = await Role.bulkCreate(role_names, {
  updateOnDuplicate: ["name"],
});

//create admin user
const createPermissions = await Permission.bulkCreate(permissions, {
  updateOnDuplicate: ["api", , "method", "endpoint", "name"],
});

let admin_role_id =
  createRoles.find((role) => role.name.toLowerCase() == "admin")?.id ?? null;
let public_role_id =
  createRoles.find((role) => role.name.toLowerCase() == "public")?.id ?? null;
let customer_role_id =
  createRoles.find((role) => role.name.toLowerCase() == "customer")?.id ?? null;
let restaurant_owner_role_id =
  createRoles.find((role) => role.name.toLowerCase() == "restaurantowner")
    ?.id ?? null;
let foodcourt_owner_role_id =
  createRoles.find((role) => role.name.toLowerCase() == "foodcourtowner")?.id ??
  null;
let chef_role_id =
  createRoles.find((role) => role.name.toLowerCase() == "chef")?.id ?? null;
let waiter_role_id =
  createRoles.find((role) => role.name.toLowerCase() == "waiter")?.id ?? null;

console.log(
  admin_role_id,
  public_role_id,
  customer_role_id,
  restaurant_owner_role_id,
  foodcourt_owner_role_id,
  chef_role_id,
  waiter_role_id
);
// const admin_user = await User.findOrCreate({
//   where: {
//     email: adminUser.email,
//     phone: adminUser.phone,
//     RoleId: admin_role_id,
//   },
//   defaults: {
//     country_code: adminUser.country_code,
//     name: adminUser.name
//   }
// });

let adminPermissions = createPermissions.map((permission) => {
  return { RoleId: admin_role_id, PermissionId: permission.id };
});
// public role ++++++
let publicPermissions = createPermissions.filter((p) => {
  if (role_permissions_list("public").includes(p.name)) {
    return p;
  }
});

publicPermissions = publicPermissions.map((p) => {
  return { RoleId: public_role_id, PermissionId: p.id };
});
// customer role ++++++
let customerPermissions = createPermissions.filter((p) => {
  if (role_permissions_list("customer").includes(p.name)) {
    return p;
  }
});

customerPermissions = customerPermissions.map((p) => {
  return { RoleId: customer_role_id, PermissionId: p.id };
});
// customer role ++++++
let restaurant_ownerPermissions = createPermissions.filter((p) => {
  if (role_permissions_list("restaurantowner").includes(p.name)) {
    return p;
  }
});

restaurant_ownerPermissions = restaurant_ownerPermissions.map((p) => {
  return { RoleId: restaurant_owner_role_id, PermissionId: p.id };
});

//foodcourt role+++
let foodcourt_ownerPermissions = createPermissions.filter((p) => {
  if (role_permissions_list("foodcourtowner").includes(p.name)) {
    return p;
  }
});

foodcourt_ownerPermissions = foodcourt_ownerPermissions.map((p) => {
  return { RoleId: foodcourt_owner_role_id, PermissionId: p.id };
});

//chef role+++
let chefPermissions = createPermissions.filter((p) => {
  if (role_permissions_list("chef").includes(p.name)) {
    return p;
  }
});

chefPermissions = chefPermissions.map((p) => {
  return { RoleId: chef_role_id, PermissionId: p.id };
});

//waiter role+++
let waiterPermissions = createPermissions.filter((p) => {
  if (role_permissions_list("waiter").includes(p.name)) {
    return p;
  }
});

waiterPermissions = waiterPermissions.map((p) => {
  return { RoleId: waiter_role_id, PermissionId: p.id };
});

//create role_permissions
const createRolePermissions = await Role_permission.bulkCreate(
  adminPermissions,
  { updateOnDuplicate: ["RoleId", "PermissionId"] }
);
const createRolePermissionsPublic = await Role_permission.bulkCreate(
  publicPermissions,
  { updateOnDuplicate: ["RoleId", "PermissionId"] }
);
const createRolePermissionsCustomer = await Role_permission.bulkCreate(
  customerPermissions,
  { updateOnDuplicate: ["RoleId", "PermissionId"] }
);
const createRolePermissionsRestaurantOwner = await Role_permission.bulkCreate(
  restaurant_ownerPermissions,
  { updateOnDuplicate: ["RoleId", "PermissionId"] }
);

const createRolePermissionsFoodcourtOwner = await Role_permission.bulkCreate(
  foodcourt_ownerPermissions,
  { updateOnDuplicate: ["RoleId", "PermissionId"] }
);

const createRolePermissionsChef = await Role_permission.bulkCreate(
  chefPermissions,
  { updateOnDuplicate: ["RoleId", "PermissionId"] }
);

const createRolePermissionsWaiter = await Role_permission.bulkCreate(
  waiterPermissions,
  { updateOnDuplicate: ["RoleId", "PermissionId"] }
);

console.log("Done 🥂");
//create permissions
