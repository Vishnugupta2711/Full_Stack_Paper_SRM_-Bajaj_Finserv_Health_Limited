const express = require("express");
const { bfhlHandler } = require("../controllers/bfhl.controller");

const router = express.Router();

router.post("/bfhl", bfhlHandler);

module.exports = router;
