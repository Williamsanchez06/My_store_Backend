
const CategoryService = require('./../services/categoryService');

const service = new CategoryService();

const getCategories = async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
}

const getCategoriesId = async (req, res, next) => {

  try {
    const { id } = req.params;
    const category = await service.findOne(id);
    res.json(category);
  } catch (error) {
    next(error);
  }

}

const createCategory =  async (req, res, next) => {
  try {
    const body = req.body;
    const newCategory = await service.create(body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
}

const updateCategory = async (req, res, next) => {

  try {
    const { id } = req.params;
    const body = req.body;
    const category = await service.update(id, body);
    res.json(category);
  } catch (error) {
    next(error);
  }

}

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(201).json({id});
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCategories,
  getCategoriesId,
  createCategory,
  updateCategory,
  deleteCategory
}
