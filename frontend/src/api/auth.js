const BASE_URL="http://127.0.0.1:8000";

export const registerUser=async(email,password)=>{
    const res=await fetch(
        `${BASE_URL}/auth/register?email=${email}&password=${password}`,
        {
            method:"POST",
        }
    );
    return res.json();
}


export const loginUser = async (email, password) => {
    const res = await fetch(
      `${BASE_URL}/auth/login?email=${email}&password=${password}`,
      {
        method: "POST",
      }
    );
    return res.json();
  };