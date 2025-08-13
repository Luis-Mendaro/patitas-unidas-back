function validateFieldsCreatePet(fields) {
    const required = ["name", "description", "sex", "size", "color", "age", "shelterUserId", "categoryId"];
    const missing = required.filter((key) => !fields[key]);
    return missing.length ? missing : null;
}

module.exports = { validateFieldsCreatePet }