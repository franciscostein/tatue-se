import { Fragment } from 'react';
import { FaInstagram, FaFacebook, FaGlobe, FaPhone, FaRegEnvelope } from 'react-icons/fa';

const Social = ({ social: { instagram, facebook, website, phone, email }}) => {
    return (
        <Fragment>
            {
                (!instagram && !facebook && !website && !phone && !email) && (
                    <hr />
                )
            }
            {
                instagram && (
                    <div className={`p-2 ${(facebook || website || phone || email) && 'solid-bottom-border-secondary'}`}>
                        <a href={instagram} className="d-flex justify-content-between align-items-center font-55">
                            <span className="pe-1">Instagram</span> <FaInstagram size={20} />
                        </a>
                    </div>
                )
            }
            {
                facebook && (
                    <div className={`p-2 ${(website || phone || email) && 'solid-bottom-border-secondary'}`}>
                        <a href={facebook} className="d-flex justify-content-between align-items-center font-55">
                            <span className="pe-1">Facebook</span> <FaFacebook size={20} />
                        </a>
                    </div>
                )
            }
            {
                website && (
                    <div className={`p-2 ${(phone || email) && 'solid-bottom-border-secondary'}`}>
                        <a href={website} className="d-flex justify-content-between align-items-center font-55">
                            <span className="pe-1">{website}</span> <FaGlobe size={20} />
                        </a>
                    </div>
                )
            }
            {
                phone && (
                    <div className={`d-flex justify-content-between align-items-center p-2 font-55 ${email && 'solid-bottom-border-secondary'}`}>
                        <span className="pe-1">{phone}</span> <FaPhone size={20} />
                    </div>
                )
            }
            {
                email && (
                    <div className="d-flex justify-content-between align-items-center p-2 font-55">
                        <span className="pe-1">{email}</span> <FaRegEnvelope size={20} />
                    </div>
                )
            }
        </Fragment>
    );
}

export default Social;