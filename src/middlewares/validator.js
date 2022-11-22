const Joi = require('joi');

exports.userCreateValidate = (req, res, next) => {
  const createSchema = Joi.object({
    username: Joi.string()
      .trim()
      .lowercase()
      .alphanum()
      .min(4)
      .max(25)
      .required(),
    name: Joi.string()
      .trim()
      .min(10)
      .max(255)
      .required(),
    password: Joi.string()
      .min(8)
      .max(255)
      .required(),
    confirm_password: Joi.ref('password'),
    role_id: Joi.string()
      .pattern(/^\d+$/)
      .required(),
  }).with('password', 'confirm_password');

  if (!req.body) {
    return res.status(400).json({ message: 'Provide a Information' });
  }

  // const {
  //   username, name, password, confirm_password, role_id,
  // } = req.body;

  const { value, error } = createSchema.validate({
    ...req.body,
  });

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  req.body = { ...req.body, ...value };
  next();
};

exports.userUpdateValidate = (req, res, next) => {
  const updateSchema = Joi.object({
    id: Joi.string()
      .trim()
      .pattern(/^\d+$/)
      .required(),
    name: Joi.string()
      .trim()
      .min(10)
      .max(255),
    password: Joi.string()
      .min(8)
      .max(255),
    confirm_password: Joi.ref('password'),
    role_id: Joi.string()
      .pattern(/^\d+$/),
  }).with('password', 'confirm_password');

  if (!req.body) return res.status(400).json({ message: 'Provide a Information' });

  // const {
  //   name, password, confirm_password, role,
  // } = req.body;

  const { id } = req.params;

  const { value, error } = updateSchema.validate({
    id, ...req.body,
  });
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  req.body = { ...req.body, ...value };
  next();
};

exports.billByCardIdValidate = (req, res, next) => {
  const cardIdSchema = Joi.object({
    card_id: Joi.string()
      .trim()
      .guid({ version: ['uuidv4'] })
      .required(),
  });

  let { card_id } = req.params;
  if (!card_id) card_id = req.body.card_id;

  const { value, error } = cardIdSchema.validate({
    card_id,
  });

  if (error) return res.status(400).json({ message: error.message });

  req.body = { ...req.body, ...value };
  next();
};
exports.getCardValidator = async (req, res, next) => {
  const getSchema = Joi.object({
    id: Joi.string()
      .trim()
      .guid({ version: ['uuidv4'] })
      .required(),
  });

  const { id } = req.params;
  const { error, value } = getSchema.validate({ id });
  if (error) return res.status(400).json({ message: 'Provide a valid Id' });

  req.body = { ...req.body, ...value };
  next();
};

exports.updateCardValidator = async (req, res, next) => {
  const updateSchema = Joi.object({
    id: Joi.string()
      .trim()
      .guid({ version: ['uuidv4'] })
      .required(),
    active: Joi.boolean(),
  });

  if (!req.body) {
    return res.status(400).json({ message: 'Provide a Information' });
  }
  // const {
  //   active,
  // } = req.body;

  // const { id } = req.params;

  const { value, error } = updateSchema.validate({
    ...req.body, ...req.params,
  });
  if (error) return res.status(400).json({ message: error.message });

  req.body = { ...req.body, ...value };
  next();
};

exports.categoryCreateValidator = async (req, res, next) => {
  const createSchema = Joi.object({
    name: Joi.string()
      .trim()
      .lowercase()
      .alphanum()
      .min(4)
      .max(25)
      .required(),
    description: Joi.string()
      .trim()
      .max(255),
  });

  if (!req.body) return res.status(400).json({ message: 'Provide a Information' });

  // const {
  //   name, description,
  // } = req.body;

  const { value, error } = createSchema.validate({
    ...req.body,
  });

  if (error) return res.status(400).json({ message: error.message });

  req.body = { ...req.body, ...value };
  next();
};

exports.categoryUpdateValidator = async (req, res, next) => {
  const updateSchema = Joi.object({
    id: Joi.string()
      .trim()
      .pattern(/^\d+$/)
      .required(),
    name: Joi.string()
      .trim()
      .lowercase()
      .alphanum()
      .min(4)
      .max(25),
    description: Joi.string()
      .trim()
      .max(255),
  });

  if (!req.body) {
    return res.status(400).json({ message: 'Provide a Information' });
  }
  // const {
  //   name, description,
  // } = req.body;

  // const { id } = req.params;

  const { value, error } = updateSchema.validate({
    ...req.body, ...req.params,
  });
  if (error) return res.status(400).json({ message: error.message });

  req.body = { ...req.body, ...value };
  next();
};

exports.productCreateValidator = async (req, res, next) => {
  const createSchema = Joi.object({
    name: Joi.string()
      .trim()
      .lowercase()
      .alphanum()
      .min(4)
      .max(25)
      .required(),
    description: Joi.string()
      .trim()
      .max(255),
    category_id: Joi.string()
      .trim()
      .pattern(/^\d+$/)
      .required(),
    price: Joi.number()
      .precision(2)
      .sign('positive')
      .required(),
  });

  if (!req.body) return res.status(400).json({ message: 'Provide a Information' });

  // const {
  //   name, description, category_id, price,
  // } = req.body;

  const { value, error } = createSchema.validate({
    ...req.body,
  });

  if (error) return res.status(400).json({ message: error.message });

  req.body = { ...req.body, ...value };
  next();
};

exports.productUpdateValidator = async (req, res, next) => {
  const updateSchema = Joi.object({
    id: Joi.string()
      .trim()
      .pattern(/^\d+$/)
      .required(),
    name: Joi.string()
      .trim()
      .lowercase()
      .alphanum()
      .min(4)
      .max(25),
    description: Joi.string()
      .trim()
      .max(255),
    category_id: Joi.string()
      .trim()
      .pattern(/^\d+$/),
    price: Joi.number()
      .precision(2)
      .sign('positive'),
  });

  if (!req.body) {
    return res.status(400).json({ message: 'Provide a Information' });
  }
  // const {
  //   name, description, category_id, price,
  // } = req.body;

  // const { id } = req.params;

  const { value, error } = updateSchema.validate({
    ...req.params, ...req.body,
  });
  if (error) return res.status(400).json({ message: error.message });

  req.body = { ...req.body, ...value };
  next();
};

exports.roleCreateValidator = async (req, res, next) => {
  const createSchema = Joi.object({
    role_name: Joi.string()
      .trim()
      .lowercase()
      .alphanum()
      .min(4)
      .max(25)
      .required(),
    description: Joi.string()
      .trim()
      .max(255),
  });
  if (!req.body) return res.status(400).json({ message: 'Provide a Information' });

  // const {
  //   role_name, description,
  // } = req.body;

  const { value, error } = createSchema.validate({
    ...req.body,
  });

  if (error) return res.status(400).json({ message: error.message });

  req.body = { ...req.body, ...value };
  next();
};

exports.roleUpdateValidator = async (req, res, next) => {
  const updateSchema = Joi.object({
    id: Joi.string()
      .trim()
      .pattern(/^\d+$/)
      .required(),
    role_name: Joi.string()
      .trim()
      .lowercase()
      .alphanum()
      .min(4)
      .max(25),
    description: Joi.string()
      .trim()
      .max(255),
  });
  if (!req.body) {
    return res.status(400).json({ message: 'Provide a Information' });
  }
  // const {
  //   role_name, description,
  // } = req.body;

  // const { id } = req.params;

  const { value, error } = updateSchema.validate({
    ...req.body, ...req.params,
  });
  if (error) return res.status(400).json({ message: error.message });
  req.body = { ...req.body, ...value };
  next();
};

exports.saleCreateValidator = async (req, res, next) => {
  const createSchema = Joi.object({
    card_id: Joi.string()
      .trim()
      .guid({ version: ['uuidv4'] })
      .required(),
    product_id: Joi.string()
      .pattern(/^\d+$/)
      .required(),
    amount: Joi.string()
      .pattern(/^\d+$/)
      .required(),
  });
  // const {
  //   product_id, amount, card_id,
  // } = req.body;

  const { value, error } = createSchema.validate({
    ...req.body,
  });

  if (error) return res.status(400).json({ message: error.message });
  req.body = { ...req.body, ...value };
  next();
};

exports.saleUpdateValidator = async (req, res, next) => {
  const updateSchema = Joi.object({
    product_id: Joi.string()
      .pattern(/^\d+$/),
    amount: Joi.string()
      .pattern(/^\d+$/),
  });

  if (!req.body) return res.status(400).json({ message: 'Provide a Information' });

  // const {
  //   product_id, amount,
  // } = req.body;

  const { value, error } = updateSchema.validate({
    ...req.body,
  });

  if (error) return res.status(400).json({ message: error.message });

  req.body = { ...req.body, ...value };
  next();
};
