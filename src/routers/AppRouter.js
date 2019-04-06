import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Login from '../components/Login';
import AppRoot from '../components/AppRoot';
import GameRoom from '../components/GameRoom';
import AdminHome from '../components/AdminHome';
import Dashboard from '../components/Dashboard';
import requireAuth from '../components/requireAuth';
import {connect} from 'react-redux';

class AppRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    checkIfLoggedIn = () => {
        console.log(this.props.userType);

        if (!this.props.userType == 'user') {
            alert('NOT LOGGED IN');
        }
    }

    render() {
        return (
            <div>
                <Switch>

                    <Route path='/' component={Login} exact={true}/>
                    <Route path='/login' component={Login} exact={true}/>
                    <Route path='/Game' component={requireAuth(GameRoom, false)} exact={true}/>
                    <Route
                        path='/Dashboard'
                        component={requireAuth(Dashboard, false)}
                        exact={true}/>
                    <Route path='/Admin' component={requireAuth(AdminHome, true)} exact={true}/>

                    <UserRoute
                        path="/:type"
                        component={AppRoot}
                        auth={{
                        status: 'LoggedIn'
                    }}
                        exact={true}/>

                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {userType: state.userType};
};

const UserRoute = ({
    component: Component,
    auth,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={(props) => {
            return (!!auth && (auth.status === 'LoggedIn'))
                ? (<Component {...props}/>)
                : (<Redirect
                    to={{
                    pathname: '/login',
                    state: {
                        from: props.location
                    }
                }}/>);
        }}/>
    );
};

export default connect(mapStateToProps)(AppRouter);
