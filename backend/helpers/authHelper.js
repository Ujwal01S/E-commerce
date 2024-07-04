import bcrypt from 'bcrypt';

//Hashing password
export const hashPassword = async(password) => {
    try {
        const saltRounds = 10; //this is no of rounds for hashing higher the number more cpu usage
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};

//Compair password and decrypt
export const comparePassword = async(password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

