const mongoose = require('mongoose');

const companySchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        activity: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        ICE: {
            type: Number,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Company', companySchema);