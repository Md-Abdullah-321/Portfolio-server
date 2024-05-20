const bcrypt = require("bcryptjs");
const Auth = require("../model/authSchema");
const { successResponse, errorResponse } = require("./responseControllers");

const handleUserLogin = async (req, res, next) => {
    try {
       const {email, password} = req.body;
       if(!email || !password){
        return  errorResponse(res, {
            statusCode: 204,
            message: "Plese fill all the input field."
        })
   }
       const user = await Auth.find({});
    //    const salt = bcrypt.genSaltSync(10);
    //    const hashedPassword = bcrypt.hashSync(password, salt);
    //    await Auth.create({email, password:hashedPassword});
       
       
       const isMatched = bcrypt.compareSync(password, user[0]["password"]);
       if(isMatched){
        return successResponse(res, {
            statusCode: 200,
            message: "Logged in successfully"
        })
       }else{
        return errorResponse(res, {
            statusCode: 401,
            message: "Wrong password, please try again"
        })
       }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    handleUserLogin,
}