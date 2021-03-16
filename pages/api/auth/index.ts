import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const KEY = "jvmhgjkwcezmob:f9ff6b500c0280d3361a8b8c2024657a166046265584fc6fd2616c91c2b25e5b";

const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const login = async  (_req: NextApiRequest, res: NextApiResponse) => {   
    const {email,password}=_req.body;
    const userFind= await prisma.user.findUnique({
      where: {
        email: email
      }
    })
  if(!userFind){res.status(400).json({ statusCode: 400, message: "El usuario no existe" })
  }else{
    const passwordIsValid = await bcrypt.compareSync(password,userFind.password);
     try {
    if(passwordIsValid) {
     /* Create JWT Payload */
     const payload = {
      id: userFind.id,
      email: userFind.email
    };
    /* Sign token */
    jwt.sign(
      payload,
      KEY,
      {
        expiresIn: 3600, // 1 year in seconds
      },
      (err,token: any) => {
        /* Send succes with token */
        res.status(200).json({
          success: true,
          token: 'Bearer ' + token,
        });
      },
    );
    }else{
      res.status(400).json({ statusCode: 400, message: "La contraseña no es válida" })
    }
       
       } catch (err) {
       res.status(500).json({ statusCode: 500, message: err.message })
     }
   }
  }

  export default login
   
  