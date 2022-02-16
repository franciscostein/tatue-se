import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { savePicture, deleteUser } from '../../actions/user';
import { sendForgotPasswordEmail } from '../../actions/auth';
import { removeAlert } from '../../actions/alert';
import ImageUploader from '../fragments/ImageUploader';
import Alert from '../fragments/Alert';
import ConfirmationModal from '../modals/ConfirmationModal';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaTrashAlt } from 'react-icons/fa';

const UserProfile = ({ user: { user: { profilePicture, email }}, savePicture, deleteUser, sendForgotPasswordEmail, removeAlert }) => {
    const history = useHistory();
    const [profilePictureBase64, setProfilePictureBase64] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const handleSavePicture = () => {
        savePicture(profilePictureBase64);
    }

    const handleLinkClick = () => {
        removeAlert();
        sendForgotPasswordEmail(email);
        history.push('/forgot-password');
    }

    const handleUserDeletion = () => {
        deleteUser(history);
        setShowDeleteConfirmation(false);
    }

    return (
        <Container>
            <Form>
                <div className="d-flex solid-bottom-border-secondary mt-5 mb-3">
                    <h1>Profile</h1>
                </div>
                <Alert />
                <ImageUploader
                    image={profilePicture && profilePicture.publicId}
                    onImageChange={imageBase64 => setProfilePictureBase64(imageBase64)}
                    onSave={handleSavePicture}
                />
                <hr />
                <div className="d-flex justify-content-between align-items-center mt-5 pb-4">
                    <div>
                        <h3>Reset password</h3>
                    </div>
                    <div>
                        <Button variant="dark" size="lg" onClick={handleLinkClick}>
                            Send e-mail
                        </Button>
                    </div>
                </div>
                <hr/>
                <h3 className="d-flex pt-3 mb-3">Delete account</h3>
                <p className="font-55">
                    Deleting your tatue-se account will permanently remove your profile, 
                    along with all data you have produced while on tatue-se, 
                    including permanent removal of photos, comments, saved boards, workplace history, 
                    and subscription and billing info, booking history, your account information and settings.
                </p>
                <Button variant="danger" className="d-flex mt-4 mb-5" onClick={() => setShowDeleteConfirmation(true)}>
                    <FaTrashAlt size={19} />
                    <span className="ps-2">Delete my account</span>
                </Button>
                <ConfirmationModal
                    show={showDeleteConfirmation}
                    onClose={() => setShowDeleteConfirmation(false)}
                    title="Are you sure?"
                    bodyText="All information will be lost. This action can't be undone."
                    acceptVariant="danger"
                    onAccept={handleUserDeletion}
                />
            </Form>
        </Container>
    );
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { savePicture, deleteUser, sendForgotPasswordEmail, removeAlert })(UserProfile);