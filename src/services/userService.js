const User = require("../models/user");
const bcrypt = require('bcrypt')
const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {
        //hash user password
        const hashPassword = await bcrypt.hash(password, saltRounds)
        //save user to database
        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: "GialoC"
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const loginService = async (email, password) => {
    try {
        //fetch user by email???
        const user = await User.findOne({ email: email })
        if (user) {
            //compare password using bcrypt
            console.log(">>>CHECK USER:")
            const isMatchPassword = await bcrypt.compare(password, user.password);
            if (!isMatchPassword) {
                return {
                    EC: 2,
                    EM: "EMAIL PASS khong hop le"
                }
            } else {
                //create an access 

                return "create an access token"
            }
        }

        return result;

    } catch (error) {
        console.log(error);
        return {
            EC: 1,
            EM: "EMAIL PASS khong hop le"
        }
    }
}


module.exports = {
    createUserService,
    loginService
}