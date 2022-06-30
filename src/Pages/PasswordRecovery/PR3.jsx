import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {resetPassword} from '../../Services/Auth';
import { getAccessToken, notification } from "../../Util/helpers";
import * as Validator from 'validatorjs';
export default function PR3() {
    const  navigate = useNavigate();
    const [validation,setValidation] = useState({});
    const [email] = useState(localStorage.getItem('pr_email'));
    const [code] = useState(localStorage.getItem('pr_code'));
    let form = useRef({
        code : null,
    });
    // on submit call login service
    const submit = useCallback(async (e)=> {
      e.preventDefault();
      const validator = new Validator(form.current,{
        password : 'required',
      });
      setValidation(validator);
      if(validator.fails()) return;
            
      let {status} = await resetPassword({...form.current, email, code});        
      if(status){
        navigate('/login');
      }
    });
    
    return (
        <>
            <section className="virtual-events text-white">
                <div className="container py-5">
                    <div className="row py-5 align-items-center">
                        <div className="col-lg-6 col-md-7 col-sm-8 col-11 mx-auto text-start">
                            <h1 className="heading-lvl-one">Password Recovery</h1>
                            <p>Verify the code which is sent on your email address!</p>
                            <form onInput={()=> setValidation({})} onSubmit={(e)=>submit(e)} id="cut-form" className="my-md-5 my-3">
                                {/* email */}
                                <div className="form-group mb-5">
                                    <label className="ps-sm-4 ps-2" htmlFor="password">New Password <span className="red">*</span></label>
                                    <input type="password" name="password" value={form.password} onChange={(e)=>form.current.password = e.target.value} className="form-control mt-2 form-field" id="password" placeholder="Enter New Password" />
                                    <span>{validation?.errors?.first('password')}</span>
                                </div>
                                <div className="form-group mb-5">
                                    <label className="ps-sm-4 ps-2" htmlFor="code">Confirm Password <span className="red">*</span></label>
                                    <input type="password" name="code" value={form.confirm_password} onChange={(e)=>form.current.confirm_password = e.target.value} className="form-control mt-2 form-field" id="code" placeholder="Enter Password again" />
                                    <span>{validation?.errors?.first('confirm_password')}</span>
                                </div>
                                <button type="submit" className="gold-btn-solid d-inline-block mt-4 eq-width-btn text-center">Change Password</button>
                             </form>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div id="loginAnim" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};