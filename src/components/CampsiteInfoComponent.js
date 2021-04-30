import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Label, 
    Modal, ModalHeader, ModalBody} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    } 
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>                    
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments 
                        comments={props.comments} 
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments, addComment, campsiteId}) {
    if(comments) {
        return(
            <div className="col-md-5 md-1">
                <h4>Comments</h4>
                {comments.map(comment => 
                    <div key={comment.id}>
                        <p>{comment.text} <br />
                        -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </div>
                )}
                <CommentForm campsiteId={campsiteId} addComment={addComment} />
            </div>
        );
    }
    return(
        <div></div>
    );
}

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
const isNumber = val => !isNaN(+val);

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    } 

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    render() {
        return (
            <>
            <div className="form-group">
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" aria-hidden="true" /> Submit Comment
                </Button>
            </div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={values => this.handleSubmit(values)}>
                    <div className="form-group">
                        <Label htmlFor="rating">Rating</Label>
                        <Control.select model=".rating" name="rating"
                                className="form-control"
                                validators={{
                                    required,
                                    isNumber
                                }}>
                            <option value="">Rate It</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Control.select>
                        <Errors
                            className="text-danger"
                            model=".rating"
                            show="touched"
                            component="div"
                            messages={{
                                required: 'Required: You have to select a rating.',
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <Label htmlFor="author">Your Name</Label>
                        <Control.text model=".author" id="author" name="author"
                            placeholder="Your Name"
                            className="form-control"
                            validators={{
                                required,
                                minLength: minLength(2),
                                maxLength: maxLength(15),
                            }} />
                            <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                component="div"
                                messages={{
                                    minLength: 'Required: Must be at least 2 letters.',
                                    maxLength: 'Required: Must be 15 letters or less.',
                                }}
                            />
                    </div>
                    <div className="form-group">
                        <Label htmlFor="text">Comment</Label>
                        <Control.textarea model=".text" id="text" name="text"
                            rows="6"
                            className="form-control"
                            validators={{
                                required,
                            }} />            
                        <Errors
                            className="text-danger"
                            model=".text"
                            show="touched"
                            component="div"
                            messages={{
                                required: 'Required: A comment is required.',
                            }}
                        />
                    </div>
                    <div className="form-group">        
                        <Button type="submit" value="submit" color="primary">Submit</Button>
                    </div>
                </LocalForm>
            </ModalBody>
        </Modal>
        </>
        );
    }
}




/*
const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
const isNumber = val => !isNaN(+val);

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    } 

    handleSubmit(values) {
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(values));
    }

    render() {
        return (
            <>
            <div className="form-group">
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" aria-hidden="true" /> Submit Comment
                </Button>
            </div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                        <div className="form-group">
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select model=".rating" name="rating"
                                    className="form-control"
                                    validators={{
                                        required,
                                        isNumber
                                    }}>
                                <option value="">Rate It</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Control.select>
                            <Errors
                                className="text-danger"
                                model=".rating"
                                show="touched"
                                component="div"
                                messages={{
                                    required: 'Required: You have to select a rating.',
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <Label htmlFor="author">Your Name</Label>
                            <Control.text model=".author" id="author" name="author"
                                placeholder="Your Name"
                                className="form-control"
                                validators={{
                                    required,
                                    minLength: minLength(2),
                                    maxLength: maxLength(15),
                                }} />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        minLength: 'Required: Must be at least 2 letters.',
                                        maxLength: 'Required: Must be 15 letters or less.',
                                    }}
                                />
                        </div>
                        <div className="form-group">
                            <Label htmlFor="text">Comment</Label>
                            <Control.textarea model=".text" id="text" name="text"
                                rows="6"
                                className="form-control"
                                validators={{
                                    required,
                                }} />            
                            <Errors
                                className="text-danger"
                                model=".text"
                                show="touched"
                                component="div"
                                messages={{
                                    required: 'Required: A comment is required.',
                                }}
                            />
                        </div>
                        <div className="form-group">        
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </div>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </>
        );
    }
}

class CampsiteInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCampsite: null
        }       
    }

    renderCampsite(campsite) {
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    
    renderComments(comments) {
        if(comments) {
            return(
                <div className="col-md-5 md-1">
                    <h4>Comments</h4>
                    {comments.map(comment => 
                        <div key={comment.id}>
                            <p>{comment.text} <br />
                            -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </div>
                    )}
                     <CommentForm />
                </div>
            );
        }
        return(
            <div></div>
        );
    }

    render() {
        if (this.props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{this.props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{this.props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>                    
                    <div className="row">
                        {this.renderCampsite(this.props.campsite)}
                        {this.renderComments(this.props.comments)}
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}

*/

export default CampsiteInfo;