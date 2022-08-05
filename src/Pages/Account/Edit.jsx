import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import Validator from "validatorjs";
import useFileReader from "../../Hooks/useFileReader";
import useMessagePopup from "../../Hooks/useMessagePopup";
import routes from "../../routes/routes";
import { updateAccount } from "../../Services/Auth";

export default function EditAccount() {
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
    useEffect(() => {
        if (user) {
            setFormData({
                name: user?.name,
                email: user?.auth?.email,
                phone: user?.phone,
                file: null,
            });
        }
    }, [user]);
    const { successPopup, errorPopup } = useMessagePopup();
    // submit form handler
    const submit = async (e) => {
        e.preventDefault();
        let validator = new Validator(formData, {
            name: 'required',
            phone: 'required',
        });
        setValidation(validator);
        if (validator.fails()) return;
        try {

            let { status, message } = await updateAccount(formData);
            if (status) {
                successPopup({
                    message,
                });
                navigate(routes.account);
            }
        } catch (error) {
            console.log(error);
            errorPopup({
                message: error.toString(),
            });
        }

    };

    const setFile = async (e) => {
        let file = e.target.files[0];
        let fileThumbnail = await getThumbnail(file);
        setFakePath(fileThumbnail);
        setFormData({...formData,user_image : file});
    };
    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                <div className="row py-5 align-items-center">
                    <div className="col-lg-6 col-md-7 col-sm-8 col-11 mx-auto text-start">
                        <form onSubmit={(e) => submit(e)} id="cut-form">
                            <h1 className="heading-lvl-one mb-4 d-flex align-items-center">
                                <a href="my-profile.php" className="back-link">
                                    <i className="fas fa-chevron-left text-white" />
                                </a>{" "}
                                Edit Profile
                            </h1>
                            <div className="avatar-box">
                                <img src={!fakePath?'images/user-avatar.png':fakePath} alt="" className="img-fluid rounded-avatar" />
                                <label htmlFor="uploadAvatar" className="upload-avatar">
                                    <i className="fas fa-camera text-white" />
                                </label>
                                <input
                                    onChange={(e) => setFile(e)}
                                    type="file"
                                    name=""
                                    id="uploadAvatar"
                                    accept="image/png, image/jpeg, image/svg"
                                />
                            </div>
                            <div className="profile-details mt-4">
                                <div className="row">
                                    <div className="col-lg-6">
                                        {/* Full Name */}
                                        <div className="form-group mb-4">
                                            <label htmlFor="profileFullName" className="ps-md-4">
                                                Full Name
                                            </label>
                                            <input
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                type="text"
                                                className="form-control mt-2 form-field"
                                                id="profileFullName"
                                                placeholder="Elsa Robert"
                                            />
                                            <span>{validation?.errors?.first('name')}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        {/* Phone Number */}
                                        <div className="form-group mb-4">
                                            <label htmlFor="profilePhone" className="ps-md-4">
                                                Phone Number
                                            </label>
                                            <input
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                type="tel"
                                                className="form-control mt-2 form-field"
                                                id="profilePhone"
                                                placeholder="012 345 6789"
                                            />
                                            <span>{validation?.errors?.first('phone')}</span>
                                        </div>
                                    </div>
                                </div>
                                <h5 className="grey-text">Email Address</h5>
                                <p className="silver-text">{formData?.email}</p>
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
