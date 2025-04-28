export const checkValidData = (email, password, name) => {

    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPasswordValid = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password);
    const isNameValid = /^[a-zA-Z ]+$/.test(name);

    if (!isEmailValid) return "Email is not valid";
    if (!isPasswordValid) return "Password must be 6-10 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    if (!isNameValid) return "Name must contain only letters and spaces.";
}