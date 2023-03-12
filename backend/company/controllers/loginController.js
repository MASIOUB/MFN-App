const bcrypt = require('bcryptjs');
const Company = require('../models/companyModel');
const generateToken = require('../middlewares/generateToken');

const loginCompany = async (req, res) => {
    const { ICE, password } = req.body;

    const company = await Company.findOne({ ICE });

    if (!company) {
        return res.status(400).json({
            error: "company not found",
        });
    };

    const validePassword = await bcrypt.compare(password, Company.password);

    if (!validePassword) {
        return res.status(400).json({
            error: "invalid password",
        });
    };

    if (company && validePassword) {
        return res.status(200).json({
            token: generateToken(company.id),
        })
    }
}

module.exports = loginCompany;