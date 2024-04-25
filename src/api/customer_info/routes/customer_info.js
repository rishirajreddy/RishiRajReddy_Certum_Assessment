import { Router } from "express";
import {
  create,
  find,
  update,
  destroy,
  findOne,
  registerCustomer,
} from "../controllers/customer_info.js";

// Create customer_info
export default {
  api: "Customer_info",
  routes: [
    {
      endpoint: "/api/customers",
      method: "POST",
      name: "Create Customer Info",
      handler: create,
      middlewares: [],
    },
    {
      endpoint: "/api/customers",
      method: "GET",
      name: "List Customer Infos",
      handler: find,
      middlewares: [],
    },
    {
      endpoint: "/api/customers/:id",
      method: "GET",
      name: "List Single Customer Info",
      handler: findOne,
      middlewares: [],
    },
    {
      endpoint: "/api/customers/:id",
      method: "PUT",
      name: "Update Customer Info",
      handler: update,
      middlewares: [],
    },
    {
      endpoint: "/api/customers/:id",
      method: "DELETE",
      name: "Delete Customer Info",
      handler: destroy,
      middlewares: [],
    },
    {
      endpoint: "/api/register/customer",
      method: "POST",
      name: "Register Customer Info",
      handler: registerCustomer,
      middlewares: [],
    },
  ],
};

//Custom Routes
//Register Customer
// router.post("/api/register/customer", [], registerCustomer)

// export default router;
