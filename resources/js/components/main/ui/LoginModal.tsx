import Modal from "./Modal";
import LoginForm from "./Login";

const LoginModal = () => {
    return(
        <>
            <Modal
                trigger = {<button>Log in </button>}
                title = "Login"
                description = "Enter your credentials to access your account.">
                    <LoginForm></LoginForm>
            </Modal>
        </>
    );
}

export default LoginModal