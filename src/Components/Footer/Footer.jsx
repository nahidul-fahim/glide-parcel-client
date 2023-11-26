import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram   } from "react-icons/fa";
import { Link } from "react-router-dom";


const Footer = () => {


    const logo = "https://i.ibb.co/P9FQM5J/favicon-icon.png";

    const year = new Date().getFullYear();


    return (
        <div className="mt-[50px] md:mt-[70px] lg:mt-[100px] bg-third">
            <footer className="footer footer-center p-10 text-primary-content">
                <aside>
                    <img src={logo} alt="" />
                    <p className="font-bold text-lightgray font-body">
                        Glide Parcel <br />Delivering trust since 2005
                    </p>
                    <p className="text-lightgray font-body">Copyright ©{year} - All rights reserved</p>
                </aside>
                <nav>
                    <div className="grid grid-flow-col gap-4">

                        <Link className="text-2xl text-white"><FaFacebookF /></Link>
                        <Link className="text-2xl text-white"><FaLinkedinIn /></Link>
                        <Link className="text-2xl text-white"><FaTwitter /></Link>
                        <Link className="text-2xl text-white"><FaInstagram /></Link>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;