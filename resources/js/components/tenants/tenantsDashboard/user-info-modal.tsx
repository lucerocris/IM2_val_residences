import Modal from "@/components/main/ui/Modal";
import UserInfoForm from "./user-info-form/user-info-form";

const UserInfoModal = () => {
    return(
        <>
            <Modal
                trigger = {<button className = "hover:underline">USER INFO</button>}
                title = "User Information"
                description = "View your personal information"
            >
                <UserInfoForm></UserInfoForm>
            </Modal>
        </>
    );
}

export default UserInfoModal;