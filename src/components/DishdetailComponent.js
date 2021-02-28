import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalBody, ModalHeader, Row, Label,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModelOpen: false,
        }
        this.toggleModel = this.toggleModel.bind(this);
        this.handleNewComment = this.handleNewComment.bind(this);
    }

    toggleModel() {
        this.setState({
            isModelOpen: !this.state.isModelOpen
        });
    }

    handleNewComment(values) {
        this.toggleModel();
        this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);
    }

    render() {
        return (

            <>

                <Button outline onClick={this.toggleModel}>
                    <span className="fa fa-edit fa-lg"></span> Submit Comment
                  </Button>

                <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModel} >
                    <ModalHeader toggle={this.toggleModel}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <div className="col-12">
                            <LocalForm onSubmit={(values) => this.handleNewComment(values)}>
                                <Row className="form-group">

                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select
                                        model=".rating" id="rating" name="rating"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}>
                                        <option selected>Please select</option>
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
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />

                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="name">Your name</Label>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />

                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment">Your comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        placeholder="Comment"
                                        className="form-control"
                                        rows={6}
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                        }}
                                    />
                                </Row>



                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </LocalForm>
                        </div>
                    </ModalBody>
                </Modal>

            </>
        )
    }
}


function RenderDish({ dish }) {

    return (
        <div className="col-12 col-md-5 mt-1">
            <Card >
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({ comments, addComment, dishId }) {

    console.log(comments);
    const opt = { month: 'short', day: 'numeric', year: 'numeric' };
    const showComment = comments.map((c) =>



        <div key={c.id}>
            <li className="mb-3">{c.comment}</li>
            <li className="mb-3">-- {c.author}, {new Date(c.date).toLocaleDateString('default', opt)}</li>
        </div >

    );

    if (showComment != null) {
        return (

            <div className="col-12 col-md-5 mt-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {showComment}
                </ul>

                <CommentForm dishId={dishId} addComment={addComment} />
            </div>

        );

    } else {
        return (
            <div></div>
        )
    }

}

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );

    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
        
    } else if (props.dish !== undefined) {
        return (
            <div className="container">

                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}
                    />
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )

    }
}

export default DishDetail;
