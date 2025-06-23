import { Link } from '@inertiajs/react';
import Modal from './Modal';
import LoginForm from './Login'
import SignUpForm from './SignUp'

const Header = () => {
    return (
        <>
            <div className="flex h-[80px] flex-col justify-center gap-[8px] self-stretch px-[70px]">
                <div className="flex justify-between items-center self-stretch">

                    <div className="flex flex-col">
                        <span>Val</span>
                        <span>Residences</span>
                    </div>
                    {/*Nav bar links*/}
                    <div className="flex items-center gap-[24px]">
                        <Modal
                            trigger = {<button className = "hover:underline">Log in </button>}
                            title = "Login"
                            description = "Enter your credentials to access your account.">
                                <LoginForm></LoginForm>
                        </Modal>
                        <Modal
                            trigger = {<button className = "hover:underline">Sign up</button>}
                            title = "Sign Up"
                            description = "Enter your credentials to make your account.">
                                <SignUpForm></SignUpForm>
                        </Modal>
                        <Link href="/">Home</Link>
                        <Link href="/about">About Us</Link>
                        <Link href="/contact">Contact us</Link>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;
