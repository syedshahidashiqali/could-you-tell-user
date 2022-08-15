import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import Validator from "validatorjs";
import useFileReader from "../../Hooks/useFileReader";
import useMessagePopup from "../../Hooks/useMessagePopup";
import routes from "../../routes/routes";
import { updateAccount, updatePassword } from "../../Services/Auth";

export default function ChangePassword() {
    const [validation, setValidation] = useState({});
    const navigate = useNavigate();
    let { user } = useSelector(state => state);
    const { getThumbnail } = useFileReader();
    const [fakePath, setFakePath] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        file: '',
    });
    const { successPopup, errorPopup } = useMessagePopup();
    // submit form handler
    const submit = async (e) => {
        e.preventDefault();
        let validator = new Validator(formData, {
            current_password: 'required',
            password: 'required|confirmed',
        });
        setValidation(validator);
        if (validator.fails()) return;
        try {

            let { status, message } = await updatePassword(formData);
            if (status) {
                successPopup({
                    message,
                });
                navigate(routes.account);
            }
        } catch (error) {
            
            errorPopup({
                message: error?.message,
            });
        }

    };

    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                <div className="row py-5 align-items-center">
                    <div className="col-lg-6 col-md-7 col-sm-8 col-11 mx-auto text-start">
                        <form onSubmit={(e) => submit(e)} id="cut-form">
                            <h1 className="heading-lvl-one mb-4 d-flex align-items-center">
                                <Link to={routes.account} className="back-link">
                                    <i className="fas fa-chevron-left text-white" />
                                </Link>
                                Change Password
                            </h1>
                            <div className="profile-details mt-4">
                                <div className="row">
                                    <div className="col-lg-12">
                                        {/* Full Name */}
                                        <div className="form-group mb-4">
                                            <label htmlFor="currentPassword" className="ps-md-4">
                                                Current Password
                                            </label>
                                            <input
                                                value={formData.current_password}
                                                onChange={(e) => setFormData({ ...formData, current_password: e.target.value })}
                                                type="password"
                                                className="form-control mt-2 form-field"
                                                id="currentPassword"
                                                placeholder="*******"
                                            />
                                            <span>{validation?.errors?.first('current_password')}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        {/* Phone Number */}
                                        <div className="form-group mb-4">
                                            <label htmlFor="password" className="ps-md-4">
                                                New Password
                                            </label>
                                            <input
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                type="password"
                                                className="form-control mt-2 form-field"
                                                id="password"
                                                placeholder="*******"
                                            />
                                            <span>{validation?.errors?.first('password')}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        {/* Phone Number */}
                                        <div className="form-group mb-4">
                                            <label htmlFor="confirmPassowrd" className="ps-md-4">
                                                Password Confirmation
                                            </label>
                                            <input
                                                value={formData.password_confirmation}
                                                onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                                                type="password"
                                                className="form-control mt-2 form-field"
                                                id="confirmPassowrd"
                                                placeholder="*******"
                                            />
                                            <span>{validation?.errors?.first('password_confirmation')}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="gold-btn-solid d-inline-block my-4 eq-width-btn me-3"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    className="grey-btn-outline d-inline-block my-4 eq-width-btn"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-6 col-md-8 col-sm-10 mx-auto">
                        <div id="profileAnim" />
                    </div>
                </div>
            </div>
        </section>
    )
}
