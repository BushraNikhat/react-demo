// email validation
export const validateEmail = (email) => {
  let emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailRegEx.test(email)) {
    return true;
  } else {
    return false;
  }
};

// number validation
export const validateNumber = (number) =>{
  let numberRegex = /^\d{10}$/
  if(numberRegex.test(number)){
    return true
  }else{
    return false
  }
}