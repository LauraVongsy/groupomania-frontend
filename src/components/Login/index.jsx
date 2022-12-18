import React, {useState} from 'react';
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import '../../styles/login.scss';


const Log = () => {
    const [signUpModal, setSignUpModal] = useState(false);
    const [signInModal, setSignInModal] = useState(true);

    const handleModals = (e) => {
        if (e.target.id === "register-tab") {
            setSignInModal(false);
            setSignUpModal(true);
        } else if (e.target.id === "signIn-tab") {
            setSignInModal(true);
            setSignUpModal(false);
        }
    }

    return (
        <div className="login">
            <div className="tab-cells">
                <div onClick={handleModals} id="signIn-tab">
                    Se connecter
                </div>
                <div onClick={handleModals} id="register-tab">
                    S'inscrire
                </div>


            </div>
            <div className="form-container">
                {signUpModal && <SignUpForm/>}
                {signInModal && <SignInForm/>}
            </div>
        </div>
    );
};

export default Log;