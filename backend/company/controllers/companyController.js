const Company = require('../models/companyModel');

// @route Get /companies
const getAllCompanies = async (req, res) => {
    const companies = await Company.find();

    res.status(200).json(companies);
}

module.exports = { getAllCompanies };