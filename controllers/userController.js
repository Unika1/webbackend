import User from '../model/User';
import { sign } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';

const registerUser = async(req, res)=>{
    const {username,fullname, email, password, isRole} = req.body;
    //validate username and password
    if(!username || !password ||!email||!fullname){
        return res.status(400).json({
            error: "Please Insert username and password"
        })
    }
    try{
        const checkExistingUser = await User.findOne({where: {username}})
        if(checkExistingUser){
        
            return res.status(400).json({
                error: "New user required"
            })
           
        }
        const saltRound = 10;
        const hashpassword = await hash(password, saltRound)

        const newUser = await User.create({username, password: hashpassword});
        res.status(200).json({message: "Registartion Successful....."});

    }
    catch(error){
        console.log(error)
        res.status(500).json({error: "Something went Wrong"});
    }

}

const loginUser = async(req, res) =>{
    const {username, password} = req.body;
     //validate username and password
    if(!username || !password){
        return res.status(400).json({
            error: "Please Insert username and password"
        })
    }
    try{
        const user = await User.findOne({where: {username}})
        if(!user){
            return res.status(400).json({
                error: "New user required"
            })
        }
        const isMatch = await compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                error: "Insert proper password!!!!"
            })
        }
        const token = sign(
            {id: user.id, username: user.username},
            process.env.JWT_SECRET || 'FVHJAFJHSFVBSFBSSFJSF',
            {expiresIn: '24h'}

        )
        res.status(200).json({message: "Successfully Logged in", token},
            

        )
    }
    catch(error){
        res.status(500).json({error: "Something went Wrong"});
        console.log(error)
    
    }

}
export default {registerUser, loginUser}
