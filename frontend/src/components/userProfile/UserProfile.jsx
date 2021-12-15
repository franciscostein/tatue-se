import { useState } from 'react';

import ImageUploader from '../fragments/ImageUploader';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaTrashAlt, FaArrowLeft } from 'react-icons/fa';

const UserProfile = () => {
    const [profilePicture, setProfilePicture] = useState('');
    const [profilePictureBase64, setProfilePictureBase64] = useState('');

    return (
        <Container>
            <Form>
                <div className="d-flex solid-bottom-border-secondary mt-5">
                    <h1>Profile</h1>
                </div>
                <ImageUploader
                    image={profilePicture}
                    setImageBase64={img => setProfilePictureBase64(img)}
                />
                <div>
                    <Button variant="dark" className="m-3">
                        Save picture
                    </Button>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center mt-5 pb-4">
                    <div>
                        <h3>Reset password</h3>
                    </div>
                    <div>
                        <Button variant="dark" size="lg">
                            Send e-mail
                        </Button>
                    </div>
                </div>
                <hr/>
                <h3 className="d-flex mb-3">Delete account</h3>
                <p className="font-55">
                    Deleting your tatue-se account will permanently remove your profile, 
                    along with all data you have produced while on tatue-se, 
                    including permanent removal of photos, comments, saved boards, workplace history, 
                    and subscription and billing info, booking history, your account information and settings.
                </p>
                <Button variant="danger" className="d-flex mt-4 mb-5" onClick={() => alert('deleted')}>
                    <FaTrashAlt size={19} />
                    <span className="ps-2">Delete my account</span>
                </Button>
            </Form>
        </Container>
    );
}

export default UserProfile;