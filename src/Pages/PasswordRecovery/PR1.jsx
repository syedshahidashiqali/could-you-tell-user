import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {getUser, login, recoverPassword} from '../../Services/Auth';
import { getAccessToken, notification } from "../../Util/helpers";
import * as Validator from 'validatorjs';
export default function PR1() {
    const  navigate = useNavigate();
    const [validation,setValidation] = useState({});
    let form = useRef({
        email : null,
    });
    // on submit call login service
    const submit = useCallback(async (e)=> {
      e.preventDefault();
      const validator = new Validator(form.current,{
        email : 'required|email',
      });
      setValidation(validator);
      if(validator.fails()) return;
            
      let {status} = await recoverPassword(form.current);        
      if(status){
        localStorage.setItem('pr_email',form.current.email);
        navigate('/password-recovery/verify/code')
      }
    });
    
    return (
        <>
            <section className="virtual-events text-white">
                <div className="container py-5">
                    <div className="row py-5 align-items-center">
                        <div className="col-lg-6 col-md-7 col-sm-8 col-11 mx-auto text-start">
                            <h1 className="heading-lvl-one">Password Recovery</h1>
                            <p>Verify yourself!</p>
                            <form onInput={()=> setValidation({})} onSubmit={(e)=>submit(e)} id="cut-form" className="my-md-5 my-3">
                                {/* email */}
                                <div className="form-group mb-5">
                                    <label className="ps-sm-4 ps-2" htmlFor="loginEmail">Email Address <span className="red">*</span></label>
                                    <input type="email" name="email" value={form.email} onChange={(e)=>form.current.email = e.target.value} className="form-control mt-2 form-field" id="loginEmail" placeholder="Enter Email Address" />
                                    <span>{validation?.errors?.first('email')}</span>
                                </div>
                                <button type="submit" className="gold-btn-solid d-inline-block mt-4 eq-width-btn text-center">Verify Email</button>
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