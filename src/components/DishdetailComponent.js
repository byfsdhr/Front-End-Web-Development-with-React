import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


function RenderDish({ dish }) {

    return (


        <div className="col-12 col-md-5 mt-1">
            <Card >
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>




    )


}

function RenderComments({ comments }) {
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
            </div>



        );

    } else {
        return (
            <div></div>
        )
    }

}

const DishDetail = (props) => {

    if (props.dish !== undefined) {
        return (
            <div className="container">
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.dish.comments} />
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
