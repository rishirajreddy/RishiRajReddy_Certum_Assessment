import Role from "../api/role/models/role.js";
import User from "../api/user/models/user.js";
import Customer from "../api/customer_info/models/customer_info.js";
import Client from "../api/client/models/client.js";
import ClientInfo from "../api/client_info/models/client_info.js";
import Restaurant from "../api/restaurant/models/restaurant.js";
import Chef from "../api/chef/models/chef.js";
import Media from "../api/media/models/media.js";

import sequelize from "../../config/database.js";
import Role_permission from "../api/permission/models/Role_permission.js";
import Permission from "../api/permission/models/permission.js";
import Menu_item from "../api/menu_item/models/menu_item.js";
import Menu_category from "../api/menu_category/models/menu_category.js";
import Customization from "../api/customization/models/customization.js";
import RestaurantStatusTracker from "../api/restaurant/models/restaurant_status_tracker.js";
import Foodcourt from "../api/foodcourt/models/foodcourt.js";
import FoodcourtStatusTracker from "../api/foodcourt/models/foodcourt_status_tracker.js";
import Chef_Category from "../api/chef-category/models/chef-category.js";
import Waiter from "../api/waiter/models/waiter.js";
import Order from "../api/order/models/order.js";
import Order_item from "../api/order_item/models/order_item.js";
import Client_Ad from "../api/client_ad/models/client_ad.js";

Role.hasMany(User, { as: "users", foreignKey: "RoleId" });

User.belongsTo(Role, { as: "role", foreignKey: "RoleId" });
Role.belongsToMany(Permission, {
  as: "permissions",
  through: Role_permission,
});
Permission.belongsToMany(Role, {
  through: Role_permission,
  as: "role",
});

Customer.belongsTo(User, { as: "user", foreignKey: "UserId" });
Customer.belongsTo(Media, { as: "avatar", foreignKey: "AvatarId" });

Client.belongsTo(User, { as: "user", foreignKey: "UserId" });
Client.belongsTo(ClientInfo, { as: "client_info", foreignKey: "ClientInfoId" });
// ClientInfo.belongsTo(Client, { as: "client", foreignKey: "ClientId" });

Restaurant.belongsTo(Client, { as: "client", foreignKey: "ClientId" });

Chef.belongsTo(Restaurant, { as: "restaurant", foreignKey: "RestaurantId" });
Chef.belongsTo(User, { as: "user", foreignKey: "UserId" });

Restaurant.belongsTo(Media, { foreignKey: "BrandLogoId", as: "brand_logo" });
Restaurant.belongsToMany(Media, {
  foreignKey: "RestaurantId",
  through: "Restaurant_Gallery",
  as: "gallery",
});
Media.belongsToMany(Restaurant, {
  foreignKey: "MediaId",
  through: "Restaurant_Gallery",
});
Restaurant.belongsTo(Media, {
  foreignKey: "LeaseAgreementId",
  as: "property_ownership_lease_agreement",
});
Restaurant.belongsTo(Media, {
  foreignKey: "FscciCertificateId",
  as: "fscci_certificate",
});
Restaurant.belongsTo(Media, {
  foreignKey: "CancelledChequeId",
  as: "cancelled_cheque_bank_statement",
});
Restaurant.belongsTo(Media, {
  foreignKey: "GstDeclarationId",
  as: "gst_declaration_form",
});
Restaurant.belongsTo(Media, { foreignKey: "NocId", as: "noc_certificate" });

Restaurant.hasMany(Menu_item, { as: "menu_items", foreignKey: "RestaurantId" });
Menu_item.belongsTo(Restaurant, {
  as: "restaurant",
  foreignKey: "RestaurantId",
});
Menu_item.belongsTo(Menu_category, {
  as: "menu_category",
  foreignKey: "MenuCategoryId",
});
Menu_category.hasMany(Menu_item, {
  as: "menu_items",
  foreignKey: "MenuCategoryId",
});

Customization.belongsToMany(Menu_item, {
  as: "menu_item",
  through: "Menu_Item_Customization",
});

Menu_item.belongsToMany(Customization, {
  as: "customizations",
  through: "Menu_Item_Customization",
});

ClientInfo.belongsTo(Media, { as: "avatar", foreignKey: "AvatarId" });
Menu_item.belongsToMany(Media, { as: "gallery", through: "Menu_Item_Gallery" });
Media.belongsToMany(Menu_item, {
  as: "gallery",
  through: "Menu_Item_Gallery",
  foreignKey: "MediaId",
});

RestaurantStatusTracker.belongsTo(Restaurant, {
  as: "restaurant",
  foreignKey: "RestaurantId",
});

Menu_category.belongsTo(Restaurant, {
  as: "restaurant",
  foreignKey: "RestaurantId",
});

Restaurant.belongsTo(Foodcourt, {
  as: "foodcourt",
  foreignKey: "FoodcourtId",
});

Foodcourt.belongsTo(Media, { foreignKey: "BrandLogoId", as: "brand_logo" });
Foodcourt.belongsToMany(Media, {
  foreignKey: "FoodcourtId",
  through: "Foodcourt_Gallery",
  as: "gallery",
});
Media.belongsToMany(Foodcourt, {
  foreignKey: "MediaId",
  through: "Foodcourt_Gallery",
});

Foodcourt.belongsTo(Media, {
  foreignKey: "LeaseAgreementId",
  as: "property_ownership_lease_agreement",
});

Foodcourt.belongsTo(Media, { foreignKey: "NocId", as: "noc_certificate" });
FoodcourtStatusTracker.belongsTo(Foodcourt, {
  as: "foodcourt",
  foreignKey: "FoodcourtId",
});
Foodcourt.belongsTo(Client, { as: "client", foreignKey: "ClientId" });

Chef_Category.belongsTo(Restaurant, {
  as: "restaurant",
  foreignKey: "RestaurantId",
});
Chef.belongsToMany(Chef_Category, {
  as: "chef_categories",
  through: "Chef_Category_Chef",
});
Chef_Category.belongsToMany(Chef, {
  as: "chefs",
  through: "Chef_Category_Chef",
});

Waiter.belongsTo(User, { foreignKey: "UserId", as: "user" });
Waiter.belongsTo(Restaurant, { foreignKey: "RestaurantId", as: "restaurant" });
Waiter.belongsTo(Media, { as: "avatar", foreignKey: "AvatarId" });
Chef.belongsTo(Media, { as: "avatar", foreignKey: "AvatarId" });

Order.belongsTo(Restaurant, { as: "restaurant", foreignKey: "RestaurantId" });
Order.belongsTo(Customer, { as: "customer", foreignKey: "CustomerId" });
Order.hasMany(Order_item, { as: "order_items", foreignKey: "OrderId" });
Order_item.belongsTo(Order, { as: "order", foreignKey: "OrderId" });
Order_item.belongsTo(Menu_item, { as: "menu_item", foreignKey: "MenuItemId" });

Client_Ad.belongsTo(Restaurant, {
  as: "restaurant",
  foreignKey: "RestaurantId",
});
Restaurant.hasMany(Client_Ad, { as: "ads", foreignKey: "RestaurantId" });
Client_Ad.belongsTo(Media, { as: "logo", foreignKey: "LogoId" });
// await sequelize.sync({ alter: true });
