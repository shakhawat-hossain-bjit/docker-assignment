import React from "react";
import "./footer.style.scss";
import {
  SlSocialInstagram,
  SlSocialFacebook,
  SlSocialYoutube,
  SlSocialPintarest,
  SlSocialTwitter,
} from "react-icons/sl";
import BookWormLogo from "../bookWormLogo/bookWormLogo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <hr />
      <div className="container">
        <div className="footer-subscriber">
          <h2>Join Our Newsletter</h2>
          <p>
            Signup to be the first to hear about exclusive deals, special offers
            and upcoming collections
          </p>
          <div className="footer-subscriber-form-container">
            <form>
              <input
                type="text"
                placeholder="Enter email for weekly Newsteller"
              />
              <input type="submit" value="Subscribe" />
            </form>
          </div>
        </div>
        <footer>
          <div className="intro">
            <BookWormLogo />
            <div>
              <p>
                1418 River Drive, Suite 35 Cottonhall, CA 9622 <br />
                <span>United States</span>
              </p>
              <span>
                {" "}
                <small>sale@bookworm.com</small>{" "}
              </span>
              <br />
              <span>
                {" "}
                <small>+1 246-345-0695</small>{" "}
              </span>
            </div>
            <div className="social-link-container">
              <SlSocialInstagram size={22} className="social-link" />
              <SlSocialFacebook size={22} className="social-link" />
              <SlSocialYoutube size={22} className="social-link" />
              <SlSocialTwitter size={22} className="social-link" />
              <SlSocialPintarest size={22} className="social-link" />
            </div>
          </div>
          <div className="footer-link-container">
            <div className="explore">
              <h4 className="footer-link-title">Explore</h4>

              <div className="explore-link-container">
                <Link to="/">About us</Link>
                <Link to="/">Sitemap</Link>
                <Link to="/">Bookmarks</Link>
                <Link to="/">Sign in/Join</Link>
              </div>
            </div>
            <div className="customer-service">
              <h4 className="footer-link-title">Customer Services</h4>
              <div className="explore-link-container">
                <Link to="/"> Help Center</Link>
                <Link to="/">Returns</Link>
                <Link to="/">Product Recalls</Link>
                <Link to="/"> Accessibility</Link>
                <Link to="/"> Contact Us</Link>
                <Link to="/"> Store Pickup</Link>
              </div>
            </div>
            <div className="policy">
              <h4 className="footer-link-title">Policy</h4>
              <div className="policy-link-container">
                <Link to="/"> Return Policy</Link>
                <Link to="/"> Terms Of Use</Link>
                <Link to="/">Product Recalls</Link>
                <Link to="/"> Security</Link>
                <Link to="/"> Privacy</Link>
              </div>
            </div>
            <div className="category">
              <h4 className="footer-link-title">Category</h4>
              <div className="category-link-container">
                <Link to="/">Action</Link>
                <Link to="/"> Comedy</Link>
                <Link to="/">Drama</Link>
                <Link to="/"> Horror</Link>
                <Link to="/"> Kids</Link>
                <Link to="/"> Romantic Comedy</Link>
              </div>
              {/* </div> */}
            </div>
          </div>
        </footer>
      </div>
      <hr />
      <div className="footer-copyright">
        © 2023 Book Worm. All rights reserved
      </div>
    </div>
  );
};

export default Footer;
