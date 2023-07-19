import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./Footer.css";
import React from "react";

const Footer = () => {
  return (
    <div className="footer container-fluid">
      <div>
        To-do List made by
        <a href="https://github.com/GTBabata"> GTBabata</a> at Github
      </div>
    </div>
  );
};

export default Footer;
