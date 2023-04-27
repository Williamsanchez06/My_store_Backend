
const CustomerService = require('../services/customerService');

const service = new CustomerService();

const getCustomers = async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
}

const createCustomer = async (req, res, next) => {
  try {
    const body = req.body;
    res.status(201).json(await service.create(body));
  } catch (error) {
    next(error);
  }
}

const updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    res.status(201).json(await service.update(id, body));
  } catch (error) {
    next(error);
  }
}

const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    res.status(200).json(await service.delete(id));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer
}
