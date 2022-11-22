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
    role: Joi.string()
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
