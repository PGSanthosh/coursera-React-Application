import React, {Component} from "react";
import {Button, Card, CardImg, CardText, CardBody, CardTitle , Breadcrumb, BreadcrumbItem, Col, Row, Label, Modal, ModalHeader, ModalBody} from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Link} from 'react-router-dom';


function RenderDish({ dish }) {
  if (dish != null) {
    return (
    <div>
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

function RenderComments({ comments, postComment, dishId }) {
  if (comments != null)
      var commentList = comments.map(comment => {
            return (
              <li key={comment.id}>
                {comment.comment}
                <br/> <br/>
                  -- {comment.author},
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(comment.date))}
              </li>
            );
          })

    return (
          <div>
              <h4>Comments</h4>
              <ul className="list-unstyled">
                  <div>
                      {commentList}
                  </div>
              </ul>
              <CommentForm dishId={dishId} postComment={postComment} />
          </div>
      );
}

const DishDetail = (props) => {
  if (props.dish != null) {
    return (
      <div className="container">
      <div className="row">
        <Breadcrumb>
        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
    <h3>{props.dish.name}</h3>
    <hr/>
        </div>
        </div>
        <div className = "row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
           <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
        </div>
      </div>
      </div>
    );
  } else return <div></div>;
};

export default DishDetail;

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

export class CommentForm extends Component {
constructor(props){
  super(props)
  
  this.state = {
    isModalOpen:false
  };
  this.toggleModal = this.toggleModal.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

toggleModal() {
  this.setState({ isModalOpen: !this.state.isModalOpen });
}

handleSubmit(values) {
  this.toggleModal();
  this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
}


render(){
return(
  <div>
  <Button outline onClick={this.toggleModal}>
      <span className="fa fa-pencil fa-lg"> Submit comment</span>
  </Button>

      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}> Submit comment</ModalHeader>
          <ModalBody>
                  <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                      <Row className="form-group">
                          <Label htmlFor="rating" md={12}>Rating</Label>
                          <Col md={{size:12}}>
                              <Control.select model=".rating" name="rating" className="form-control" >
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                              </Control.select>
                          </Col>
                      </Row>

                      <Row className="form-group">
                          <Label htmlFor="author" md={12}>Your Name</Label>
                          <Col md={12}>
                              <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control" validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }} />
                              <Errors className="text-danger" model=".author" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 2 characters', maxLength: 'Must be 15 charaters or less' }} />
                          </Col>
                      </Row>

                      <Row className="form-group">
                          <Label htmlFor="Comment" md={12}>Comment</Label>
                          <Col md={12}>
                              <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" validators={{ required }} />
                              <Errors className="text-danger" model=".comment" show="touched" messages={{ required: 'Required' }} />
                          </Col>
                      </Row>

                      <Button type="submit" value="submit" color="primary">Submit</Button>
                  </LocalForm>
          </ModalBody>
      </Modal>
</div>
    )
  }
}
