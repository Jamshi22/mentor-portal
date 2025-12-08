"use client";

import React, { useState } from "react";
import style from "../styles/faqquestion.module.css";
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { faqData, FaqDataSuperAdmin } from "../components/faqdata";
import { FcFaq } from "react-icons/fc";

const FaqQuestions = () => {
  const [clicked, setClicked] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [admin, setAdmin] = useState("");

  const handleFilterChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = (id) => {
    setClicked((prevId) => (prevId === id ? null : id));
  };

  const filteredFaqs = faqData.filter((data) => {
    return data.question.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const FilterAdminFaq = FaqDataSuperAdmin.filter((data) => {
    return data.question.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <section className={style.faq_container}>
        <div className={style.faq_heading_container}>
          <p className={style.faq_heading_fnt}>Got a question ? </p>

          <div className={style.faq_search_container}>
            <div className={style.faq_search_icon_container}>
              <IoSearch size={25} />
            </div>

            <input
              type="text"
              className={style.search_input_container}
              placeholder="Search..."
              value={searchTerm}
              onChange={handleFilterChange}
              maxLength={40}
            />
          </div>

          <div className={style.faq_main_container}>
            <div className={style.faq_main_heading_container}>
              <h2 className={style.faq_main_heaidng_fnt_}>FAQ Page</h2>
            </div>
            {admin == "admin" ? (
              <div className={style.faq__container}>
                {FilterAdminFaq.length === 0 ? (
                  <p>No results found</p>
                ) : (
                  FilterAdminFaq.map((data) => {
                    return (
                      <div key={data.id}>
                        <div
                          className={style.faq_answer_list}
                          onClick={() => handleClick(data.id)}
                        >
                          <p className={style.faq_data_fnt}>{data.question}</p>
                          {clicked === data.id ? (
                            <div>
                              <FaMinus />
                            </div>
                          ) : (
                            <div>
                              <FaPlus />{" "}
                            </div>
                          )}
                        </div>

                        {clicked === data.id && (
                          <div className={style.faq_answer}>
                            <p className={style.faq_answer_fnt_}>
                              {data.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              <div className={style.faq__container}>
                {filteredFaqs.length === 0 ? (
                  <p>No results found</p>
                ) : (
                  filteredFaqs.map((data) => {
                    return (
                      <div key={data.id}>
                        <div
                          className={style.faq_answer_list}
                          onClick={() => handleClick(data.id)}
                        >
                          <p className={style.faq_data_fnt}>{data.question}</p>
                          {clicked === data.id ? (
                            <div>
                              <FaMinus />
                            </div>
                          ) : (
                            <div>
                              <FaPlus />{" "}
                            </div>
                          )}
                        </div>

                        {clicked === data.id && (
                          <div className={style.faq_answer}>
                            <p className={style.faq_answer_fnt_}>
                              {data.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqQuestions;
