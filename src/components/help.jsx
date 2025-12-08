"use client";

import React from "react";
import style from "../styles/help.module.css";
import { useState } from "react";
import { useEffect } from "react";

const Help = () => {
  const [query, setQuery] = useState({
    fullName: "",
    email: "",
    queryRelatedTo: "",
    whatwentwrong: "",
    file: "",
  }); 

  const [querryError, setQuerryError] = useState({
    querryErrorfullName: "",
    querryErroremail: "",
    querryrelatetoerror: "",
    whatwentwrongerror: "",
    fileerror: "",
  });

  const handleinputchange = (e) =>{
    const { name, value } = e.target;

    setQuery((prevState) => ({
        ...prevState,   
        [name]: value,  
    }));

    if(name == 'fullName'){
        validateFullName(value)
    }
  }


  const validateFullName = (data) => {
    if (data == '') {
        setQuerryError((prevState) => ({
            ...prevState, 
            queryError: { 
                ...prevState.queryError, 
                querryErrorfullName: 'Full Name is required', 
            }
        }));
        return false;
    }else if(data.length > 20){
        setQuerryError((prevState) => ({
            ...prevState, 
            queryError: { 
                ...prevState.queryError, 
                querryErrorfullName: 'Full Name Cannot be More than 20 Words', 
            }
        }))  
        return false
    }
    return true;
}

  const handleSubmit = (e) =>{
    e.preventDefault()
    const formData = {
        fullName:query.fullName,
        email:query.email,
        queryRelated:query.queryRelatedTo,
        whatwent:query.whatwentwrong
    }


    const isValidFullName = validateFullName(query.fullName)
    // console.log(formData,'Form Data')
  }


  
  return (
    <section className={style.help_main_container}>
      <div className={style.card}>
        <div className={style.help_card_heading_container}>
          <h3 className={style.help_card_heading_fnt}>Get in touch with us</h3>
          <p className={style.help_Card_para_fnt}>
            Help us with details of your query & our experts will get back with
            an answer
          </p>
        </div>

        <div className={style.help_card_main_container}>
          <div className={style.help_card_form_box}>
            <label htmlFor="fullname" className={style.help_label_container}>
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              className={style.help_input_container}
              value={query.fullName}
              placeholder="Full Name"
              name='fullName'
              onChange={handleinputchange}
              maxLength={120}
            />
         
          </div>
          {/* {console.log(querryError.querryErrorfullName,'Name')} */}

          <div className={style.help_card_form_box}>
            <label htmlFor="email" className={style.help_label_container}>
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              className={style.help_input_container}
              value={query.email}
              name='email'
              onChange={handleinputchange}
            />
          </div>

          <div className={style.help_card_form_box}>
            <label className={style.help_label_container} htmlFor="query">
              Query related to
            </label>
            <input
              type="text"
              id="query"
              placeholder="Query Related To"
              className={style.help_input_container}
              value={query.queryRelatedTo}
              name="queryRelatedTo"
              onChange={handleinputchange}

            />
          </div>

          <div className={style.help_card_form_box}>
            <label className={style.help_label_container} htmlFor="What">
              What went wrong ?
            </label>
            <textarea
              id="What"
              type="text"
              placeholder="What Went Wrong"
              rows={5}
              className={style.help_input_container}
              value={query.whatwentwrong}
              name='whatwentwrong'
              onChange={handleinputchange}
            ></textarea>
          </div>

          <div className={style.help_card_form_box}>
            <label className={style.help_label_container}>
              Attach ScreenShot
            </label>
            <input type="file" value={query.file}  onChnage={handleinputchange}/>
          </div>

          <div className={style.btn_container}>
            <button className={style.help_btn} onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Help;
