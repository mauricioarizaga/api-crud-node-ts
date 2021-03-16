import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const signUp = async  (_req: NextApiRequest, res: NextApiResponse) => {
    
 const {email,password}=_req.body;
 
 const hashedPassword = await bcrypt.hash(password,10)
 
  try {
    const createUser = await prisma.user.create(
    {
        data: {
          email: email,
          password: hashedPassword,
        },
      })
    res.status(200).json(createUser)
  } catch (err) {
   
    res.status(500).json({message: err.message })
  }
}
export default signUp