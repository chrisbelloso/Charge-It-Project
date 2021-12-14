const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { validateFields } = require("../helpers/validateFields")
const { validateJwt } = require("../helpers/processJwt");

const {
    getAllCompanies,
    getCompanyById,
    signUpCompany,
    loginCompany,
    updateComapny,
    deleteCompany,
} = require("../controlller/authController");

router.get("/", getAllCompanies);

router.get("/company/:id", getCompanyById);

router.post(
    "/signup",
    check("name", "A name is required").not().isEmpty(),
    check("email", "A valid email is required").isEmail(),
    check(
        "password",
        "password must be 8 characters log with capital letter & symbol"
    ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
    check("adress", "An address is required").not().isEmpty(),
    
    validateFields,
    signUpCompany
);

router.post("/login", loginCompany);

router.post("/company/:id", validateJwt, updateComapny);

router.delete("/company/:id", validateJwt, deleteCompany);

module.exports = router;