import Modal from "./Modal";
import SignUpForm from "./SignUp";

const SignUpModal = () => {
    return(
        <>
            <Modal
                trigger = {<button>Sign up</button>}
                title = "Sign Up"
                description = "Enter your credentials to make your account.">
                    <SignUpForm></SignUpForm>
            </Modal>
        </>
    );
}

export default SignUpModal;