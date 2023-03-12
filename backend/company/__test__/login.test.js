const loginCompany = require('../controllers/loginController.js');
const Company = require('../models/companyModel');
const bcrypt = require('bcryptjs');
const generateToken = require('../middlewares/generateToken');

jest.mock('../models/companyModel');
jest.mock('bcryptjs');



describe('loginCompany', () => {
    it('should send a 200 status and company data if login is successful', async () => {
        const company = {
            RC: '10000',
            password: 'hashedPassword',
        };
        Company.findOne.mockResolvedValue(company);
        bcrypt.compare.mockResolvedValue(true);

        const req = {
            body: {
                RC: '10000',
                password: 'password',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await loginCompany(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            name: company.name,
            token: generateToken(company.id),
        });
    });

    it('should send a 400 status and error message if company is not found', async () => {
        Company.findOne.mockResolvedValue(null);

        const req = {
            body: {
                RC: '10000',
                password: 'password',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await loginCompany(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'company not found',
        });
    });

    it('should send a 400 status and error message if password is invalid', async () => {
        const company = {
            RC: '10000',
            password: 'hashedPassword',
          };
        Company.findOne.mockResolvedValue(company);
        bcrypt.compare.mockResolvedValue(false);

        const req = {
            body: {
                RC: '10000',
                password: 'password',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await loginCompany(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'invalid password',
        });
    });
});