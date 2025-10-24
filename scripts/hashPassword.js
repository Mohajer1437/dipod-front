import bcrypt from 'bcrypt';

const password = '123456'; // رمز دلخواه
const saltRounds = 10;

const hash = await bcrypt.hash(password, saltRounds);
console.log(hash);
