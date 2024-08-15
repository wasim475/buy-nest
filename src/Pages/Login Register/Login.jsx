import { useContext, useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { RiEyeCloseFill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { AuthContex } from "../../Provider/Auth Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";


const Login = () => {
    const {signIn}= useContext(AuthContex)
    const {googleLOgin}= useContext(AuthContex)

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const handleLogin =(e)=>{
        e.praventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
        .then((result)=>{
          toast("Login Successfull")
          setTimeout(()=>{
              Navigate(location?.state ? location.state : '/')
            },900)
        })
        .catch(error=>{
            toast("invalid email or password")
        })
    }
    const handleGoogle = ()=>{
        googleLOgin()
        setTimeout(()=>{
            Navigate('/')
             
           },7000)
    }
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        name="email"
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
                        name="password"
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="Password"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="focus:outline-none mt-4"
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
                        value="Login"
                        />
                        <span>Already have an account?
                            <Link
                            className="inline-block font-bold text-sm text-blue-500 hover:text-blue-700 ml-2"
                            to="/register"
                            >
                            Register
                            </Link>
                        </span>
                        <ToastContainer></ToastContainer>
                    </div>
                    <div className="flex items-center justify-center mt-5">
                        <button onClick={handleGoogle}
                        className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        >
                        
                        Login with Google
                        </button>
          </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;