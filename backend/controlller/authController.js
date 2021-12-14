const { generateJwt } = require("../helpers/processJwt");
const bcrypt = require("bcrypt");


const Company = require("../models/Company");

const getAllCompanies = async (req, res) => {
    const companies = await Company.find();
    try {
        if (companies.length === 0) {
            return res.status(400).json({ message: "Didn't find any companies" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Couldn't get the companies" });
    }
};

const getCompanyById = async (req, res) => {
    const { id } = req.params;
    const company = await Company.findById(id);
    try {
        return res.status(200).json(company);
    } catch (error) {
        return res.status(500).json({ message: "Please try again later" });
    } 
};

const signUpCompany = async (req, res) => {
    const { email } = req.body;
    const testEmail = await Company.findOne({ email });
    if (testEmail) {
        return res.status(500).json({ message: "Email already in use" });
    }
    const company = new Company(req.body);
    try {
        const salt = bcrypt.genSaltSync();
        company.password = bcrypt.hashSync(req.body.password, salt);
        company.save();
        return res.status(201).json(company);
    } catch (error) {
        return res.status(500).json({ message: "Couldn't create the user" });
    }
};

const loginCompany = async (req, res) => {
    const { email, password } = req.body;
    const company = await Company.findOne({ email });
    if (!company) {
        return res.status(500).json({ message: "Please check credentials" });
    }
    const validPassword = bcrypt.compareSync(password, company.password);
    if (!validPassword) {
        return res.status(500).json({ message: "Please check credentials" });
    }
    const token = await generateJwt(company._id);
};

const updateComapny = async (req, res) => {
    const { id } = req.params;
    const companyToUpdate = await Company.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    try {
        return res.status(202).json(companyToUpdate);
    } catch (error) {
        return res.status(500).json({ message: "Couldn't update the user" });
    }
};

const deleteCompany = async (req, res) => {
    const { id } = req.params;
    await Company.findByIdAndDelete(id);
    try {
        return res.status(203).json({ message: "Succesfully deleted" });
    } catch (error) {
        return res.status(500).json({ message: "Couldn't delete company" });
    }
};

module.exports = {
    getAllCompanies,
    getCompanyById,
    signUpCompany,
    loginCompany,
    updateComapny,
    deleteCompany,
}