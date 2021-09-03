import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import userAvatar from '../../assets/user_w.png';

const UserProfile = () => {
    return (
        <Container>
            <Form>
                <div className="d-flex justify-content-between solid-bottom-border-secondary mt-5">
                    <div>
                        <h1>Profile</h1>
                    </div>
                    <div>
                        <Button variant="secondary" className="px-3 mx-2">
                            Cancel
                        </Button>
                        <Button variant="success" className="px-3 mx-2">
                            Save
                        </Button>
                    </div>
                </div>
                <Image src={userAvatar} className="profile-picture my-4" roundedCircle />
                <Form.Group controlId="formProfileName" className="mb-3">
                    <Form.Label className="font-75">Name</Form.Label>
                    <Form.Control type="text" placeholder="Full name" />
                </Form.Group>
                <Form.Group controlId="formProfileLocation" className="mb-5">
                    <Form.Label className="font-75">City</Form.Label>
                    <Form.Control type="text" placeholder="Where do you live?" />
                </Form.Group>
                <hr />
                <div className="d-flex justify-content-between mt-5 pb-4">
                    <div>
                        <h3>Change password</h3>
                    </div>
                    <div>
                        <Button>
                            Change
                        </Button>
                    </div>
                </div>
                <hr/>
                <h3 className="d-flex">Delete account</h3>
                <p className="font-55">
                    Deleting your tatue-se account will permanently remove your profile, 
                    along with all data you have produced while on tatue-se, 
                    including permanent removal of photos, comments, saved boards, workplace history, 
                    and subscription and billing info, booking history, your account information and settings.
                </p>
                <Button variant="danger" className="d-flex mt-3 mb-5">
                    Delete my account
                </Button>
            </Form>
        </Container>
    );
}

export default UserProfile;