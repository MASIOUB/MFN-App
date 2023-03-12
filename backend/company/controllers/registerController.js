const bcrypt = require('bcryptjs');
const Company = require('../models/companyModel')

const registerCompany = async(req, res) => {
    if(Object.keys(req.body).length > 0) {
        const { name, activity, phone, address, ICE, password } = req.body;

        // check fieilds 
        if ( !name || !activity || !phone || !address || !city || !ICE || !password ) return console.log('all fields are required');

        // check ICE
        const isCompanyExist = await Company.findOne({ ICE });

        // if (isCompanyExist) return console.log('this ICE is already in use');
        if (isCompanyExist) return res.status(422).json({error:'this ICE is already in use'});

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create company
        const company = await Company.create({
            name,
            activity,
            phone,
            address,
            city,
            ICE,
            password: hashedPassword,
        })

        company ? res.status(201).json({
            // name: company.name,
            // password: hashedPassword,
            message : 'company is successfully created'
        })
        : null;
    }
}

module.exports = registerCompany;