import Image from 'react-bootstrap/Image';

import logoPlaceholder from '../../../assets/studio/placeholder.png';

const SearchResultStudio = ({ studio: { logo, name, location: { address }}, onClick }) => {
    return (
        <div className="d-flex search-item solid-bottom-border-secondary py-3" onClick={onClick}>
            <Image src={logo.publicId ?? logoPlaceholder} className="studio-avatar-img-mini" roundedCircle />
            <div className="d-flex flex-column ps-3">
                <span className="font-50">{name}</span>
                <span className="font-40">{address}</span>
            </div>
        </div>
    );
}

export default SearchResultStudio;