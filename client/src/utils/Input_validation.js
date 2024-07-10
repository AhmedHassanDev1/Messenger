
export let Input_validation_fullname={
    required:{
        value:true,
        message:"user name is require"
    },
    maxLength:{
        value:20,
        message:"max length is 20"
    }
}

export let Input_validation_email={
    required:{
        value:true,
        message:"email is require"
    },
   pattern:{
    value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message:"invalid email"
   }
}

export let Input_validation_password={
    required:{
        value:true,
        message:"password is require"
    },
  minLength:{
    value:9,
    message:"The password must be longer than 8 characters"
  }
}