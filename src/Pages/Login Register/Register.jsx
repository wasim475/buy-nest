
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { AuthContex } from '../../../Auth provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form"
import { BsFillEyeFill } from "react-icons/bs";
import { RiEyeCloseFill } from "react-icons/ri";
import { AuthContex } from '../../Provider/Auth Provider/AuthProvider';

const Register = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

    const {createUser, updateUserProfile}= useContext(AuthContex)
    const Navigate = useNavigate()



    let handleCreate = (e)=>{
        e.preventDefault();
        let form = e.target;
        let fullName = form.fullName.value;
        let email = form.email.value;
        let password = form.password.value;

        createUser(email,password)
        .then(result=>{
            updateUserProfile(fullName, email)
            .then(()=>{
                if(result.user){
                    toast("Create account successfully!");
                    setTimeout(()=>{
                        
                        Navigate(location?.state ? location.state : '/')
                    },900)
                }
            })
          
          
        }).catch(error=>{
            toast("An error occur.")
        })
        
    }

   

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
            Create a Buy Nest account
        </h2>
        <form onSubmit={handleCreate}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullName"
              type="text"
              name='fullName'
              placeholder="Full Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name='email'
              placeholder="Email"
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name='password'
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="focus:outline-none flex items-center mt-4"
              >
                {passwordVisible ?
                  <RiEyeCloseFill/>
                 : 
                 <BsFillEyeFill/>
                 }
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <input
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              value="Create"
            />
              
            
            <span>
            Already have an account?
                <Link
                className=" ml-2 inline-block font-bold text-sm text-blue-500 hover:text-blue-800"
                to="/login"
                >
                Login
                </Link>
            </span>
            <ToastContainer></ToastContainer>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Register