import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    };

    renderComments(comments) {
        const opt = { month: 'short', day: 'numeric', year: 'numeric' };
        const showComment = comments.map((c) =>
            <div key={c.id}>
                <li className="mb-3">{c.comment}</li>
                <li className="mb-3">-- {c.author}, {new Date(c.date).toLocaleDateString('default', opt)}</li>
            </div >

        );

        if (showComment!=null) {
           return (

            <div>
                <ul className="list-unstyled">
                    {showComment}
                </ul>
            </div>
        ); 
        } else {
            return (
                <div></div>
            )
        }


        
    }

    render() {
        const dish = this.props.dish;
        return (

            <div className="row">
                <div className="col-12 col-md-5 mt-1">
                    <Card >
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-12 col-md-5 mt-1">

                    <h4>Comments</h4>

                    {this.renderComments(dish.comments)}

                </div>



            </div>

        )
    }
}
export default DishDetail;
