import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const adminUserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

adminUserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id },
    "6474b13e42fd0f0c680c18ab4afa9fbca5e6e9584d98b3bc68617f0b5c8f4249",
    {
      expiresIn: "7d",
    }
  );
  return token;
};

const AdminUser = mongoose.model("AdminUser", adminUserSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

const validatePass = (data) => {
  const schema = Joi.object({
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

export { AdminUser, validate, validatePass };
