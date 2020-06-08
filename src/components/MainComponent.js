import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Fotter from './FotterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponets';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators'
import {actions} from 'react-redux-form' ;


const mapStateToProps = state =>{
  return {
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders
  }
}

const mapDispatchToProps = dispatch =>({
  addComment:(disId, rating, author, comment) =>dispatch(addComment
    (disId, rating, author, comment)),

    fetchDishes:() =>{dispatch(fetchDishes())},

    resetFeedbackForm:()=>{dispatch(actions.reset('feedback'))}
});


class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchDishes();
  }

  render() {
    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrmsg = {this.props.dishes.errmsg}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }

    

    const AboutusPage = () => {
      return (<About leaders ={this.props.leaders}/>)
    }

    const DishWithId = ({match})=>{
      return (

        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading}
        dishesErrmsg = {this.props.dishes.errmsg}
        comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        addComment={this.props.addComment}
      />
      )
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route       path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route       path="/menu/:dishId" component={DishWithId}/>
          <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>} />
          <Route exact path="/aboutus" component={AboutusPage} />
          <Redirect to="/home" />
        </Switch>
        <Fotter />
      </div>

    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
