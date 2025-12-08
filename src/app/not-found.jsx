"use client";

import React from "react";
import Link from "next/link";
import "./error.css";

const Errorpage = ({ error }) => {
  {console.log(error)}
  return (
    <>
      <section className="error-container">
        <div className="error-heading">
          <h3 className="error-main-heading_fnt">Page Not Found!!!!</h3>
        </div>

        <div className="error-main-container">
          <div>
            <h3 className="error-main-fnt">404</h3>
            <p>{error || 'Opps there seems a error'}</p>
          </div>

          <div>
            <p className="error-heading-fnt">
              It looks like the page you're looking for doesn't exist or has
              been moved.
            </p>
            <ul>
              <li className="error-heading-fnt">
                Check the URL for any errors.
              </li>
              <li className="error-heading-fnt">
                Use the navigation menu to find what you need.
              </li>
              <li className="error-heading-fnt">
                Or, click here to return to the{" "}
                <Link href="/dashboard">homepage.</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Errorpage;
