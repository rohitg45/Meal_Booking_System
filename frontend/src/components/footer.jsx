import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="footer-block">
                    <p>Copyright © 2022 Rishabh Software. All Rights Reserved.</p>
                    <div className="social">
                        <Link to="#" aria-label="Facebook"><i className="icon-facebook"></i></Link>
                        <Link to="#" aria-label="Instagram"><i className="icon-instagram"></i></Link>
                        <Link to="#" aria-label="Linkedin"><i className="icon-linkedin"></i></Link>
                        <Link to="#" aria-label="Twitter"><i className="icon-twitter"></i></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer