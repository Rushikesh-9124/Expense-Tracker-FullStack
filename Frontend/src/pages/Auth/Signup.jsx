import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validatEmail, validatePassword } from "../../utils/helper";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  
  const {updateUser} = useContext(UserContext)

  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    let profilePicUrl = ""
    if(!fullName){
      setError("Full Name is required!")
      return
    }
    if(!validatEmail(email)){
      setError("Invalid Email!")
      return
    }
    if(!validatePassword(password)){
      setError("Password Min 8 characters!")
      return
    }
    const formData = new FormData()
    formData.append("fullName", fullName)
    formData.append("email", email.toLowerCase())
    formData.append("password", password)
    formData.append("image", profilePic)
    console.log(profilePic)
    try {
      setLoading(true)
      const res = await axiosInstance.post('/api/v1/auth/register', formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        }
      });
      
      console.log(res.data)
      if(res.data && res.data.success){
        localStorage.setItem("token", res.data.data.accessToken)
        navigate('/dashboard')
        updateUser(res.data.data)
      }
    } catch (error) {
      if(error && error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }
    }
    setLoading(false)
  };

  return (
    <AuthLayout loading={loading}>
      <div className="lg:w-[100%] h-auto md:h-full md:mt-0 flex flex-col justify-center">
        <h3 className="text-lg sm:text-lg font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6 ">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignup}>
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 ">
            <div className="col-span-2 ">
              <ProfilePhotoSelector
                image={profilePic}
                setImage={setProfilePic}
              />
            </div>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Full Name: "
              placeholder="john Doe"
              type="text"
            />
            <div className="col-span-2 sm:col-span-1">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email: "
                placeholder="john@example.com"
                type="text"
              />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password: "
                placeholder="password"
                type="password"
              />
            </div>
            {error && <p className="text-xs text-red-500 ">{error}</p>}
            <div className="col-span-2">
              <button type="submit" className="btn-primary">
                Signup
              </button>
            </div>
            <p className="text-[13px] text-slate-800">
              Already have an account?{" "}
              <Link className="font-medium text-primary underlinef" to="/login">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
