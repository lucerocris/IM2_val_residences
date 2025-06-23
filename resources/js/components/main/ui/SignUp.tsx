import { useForm } from '@inertiajs/react'
import Btn from './Button';

const SignUpForm = () => {
    return(
        <>
            <form className = "flex flex-col items-center">
                <div className = "flex justify-around w-full flex-wrap gap-[0.7rem]">
                    <div className = "w-[47%]">
                        <label htmlFor="">First Name</label>
                        <input type="text" placeholder = "Enter your first name" className = "mt-[10px] p-[10px] w-full h-[2.5rem] text-[0.9rem] outline-1 outline-solid outline-[#aeaeae]" required/>

                        <label htmlFor="">Last Name</label>
                        <input type="text" placeholder = "Enter your last name" className = "mt-[10px] p-[10px] w-full h-[2.5rem] text-[0.9rem] outline-1 outline-solid outline-[#aeaeae]" required/>

                        <label htmlFor="">Email</label>
                        <input type="email" placeholder = "Enter your email" className = "mt-[10px] p-[10px] w-full h-[2.5rem] text-[0.9rem] outline-1 outline-solid outline-[#aeaeae]" required/>
                    </div>

                    <div className = "w-[47%]">
                        <label htmlFor="">Password</label>
                        <input type="password" placeholder = "Enter your password" className = "mt-[10px] p-[10px] w-full h-[2.5rem] text-[0.9rem] outline-1 outline-solid outline-[#aeaeae]" required/>

                        <div className = "text-[0.8rem] text-[#aeaeae]">
                            <p>At least 8 characters</p>
                            <p>At least one small letter</p>
                            <p>At least one capital letter</p>
                            <p>At least one number or symbol</p>
                        </div>

                        <label htmlFor="">Confirm Password</label>
                        <input type="password" placeholder = "Confirm your password" className = "mt-[10px] p-[10px] w-full h-[2.5rem] text-[0.9rem] outline-1 outline-solid outline-[#aeaeae]" required/>
                    </div>
                </div>

                <div className = "w-full flex justify-center mt-[20px]">
                    <Btn className = "w-1/2 p-1">SUBMIT</Btn>
                </div>
            </form>
        </>
    );
}

export default SignUpForm;