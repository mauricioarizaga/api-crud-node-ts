import jwt from 'jsonwebtoken';
const KEY = "jvmhgjkwcezmob:f9ff6b500c0280d3361a8b8c2024657a166046265584fc6fd2616c91c2b25e5b";

const verifyToken=(jwtToken:string) => {
  try {
    return jwt.verify(jwtToken, KEY);
  } catch (e) {
    console.log('e:', e);
    return null;
  }
}
export default verifyToken