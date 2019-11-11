import React from 'react';
import Major from "./hoc/Major/Major";
import Quiz from "./containers/Quiz/Quiz";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Auth from "./containers/Auth/Auth";
import QuizList from "./containers/QuizList/QuizList";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {autoLog} from "./store/actions/auth";


class App extends React.Component {

    componentDidMount() {
        this.props.autoLog();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={Auth}/>
                <Route path="/quiz/:id" component={Quiz}/>
                <Route path="/" exact component={QuizList}/>
                <Redirect to={'/'}/>
            </Switch>
        );

        if (this.props.isUserLogIn) {
            routes = (
                <Switch>
                    <Route path="/quiz-creator" component={QuizCreator}/>
                    <Route path="/quiz/:id" component={Quiz}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/" exact component={QuizList}/>
                    <Redirect to={'/'}/>
                </Switch>
            )
        }
        return (
            <Major>
                {routes}
            </Major>
        )
    }
}

const mapStateToProps = state => {
    return {
        isUserLogIn: !!state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        autoLog: () => dispatch(autoLog())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
