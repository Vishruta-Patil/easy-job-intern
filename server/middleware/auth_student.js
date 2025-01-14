const jwt = require('jsonwebtoken')
const Student = require('../models/student.js')
const {JWT_SECRET} = require('../keys')

const auth_student = async (req,res,next) =>{
    try{
        // Authentication type Bearer
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,JWT_SECRET)
        const user = await Student.findOne({ _id : decoded._id, 'tokens.token':token})
        if(!user){
            throw new Error("error")
        }
        req.token = token
        req.user = user
    }
    catch(e){
        return res.send({error : "Please Authenticate"})
    }
    next()
}

module.exports = auth_student