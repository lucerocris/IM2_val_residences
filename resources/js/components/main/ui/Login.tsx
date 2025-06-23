import { useForm } from '@inertiajs/react'
import Btn from './Button';

const LoginForm = () => {
    return(
        <>
            <form className = "grid gap-4">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder = "Enter your email" className = "mt-[10px] p-[8px] w-full h-[2.5rem] outline-1 outline-solid outline-[#aeaeae]" required/>          

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder = "Enter your password" className = "mt-[10px] p-[8px] w-full h-[2.5rem] outline-1 outline-solid outline-[#aeaeae]" required/>

                    <a href="" className = "block text-right mt-[5px] mb-[15px] text-[0.8rem] decoration-0 font-semibold">Forgot Password?</a>

                    <Btn className = "w-full py-2">LOGIN</Btn>

                    <p className= "text-center mt-[1rem] text-[0.8rem]">
                        Not Registered?
                        <a href="" className = "text-[#007bff] decoration-0"> Sign up now</a>
                    </p>
                </div>
            </form>
        </>
    );
}

export default LoginForm;