import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '822435983074-c90e86unkjs9mkjpdh4jiod3eefoe6nm.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) =>{
        if (isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();   
    };

    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return (<div className="ui segment">
                        <div className="ui active inverted dimmer">
                        <div className="ui mini text loader">Loading</div>
                        </div>
                        <p></p>
                    </div>
            );
        } else if (this.props.isSignedIn){
            return (
            <button onClick={this.onSignOutClick} type="button" className="btn btn-danger">
                <i className="google plus square icon" />
                Sign Out
            </button>);
        } else {
            return (
            <button onClick={this.onSignInClick} type="button" className="btn btn-success">
                <i className="google plus square icon" />
                Sign in with Google
            </button>);
        }
    }

    render() { 
        return ( <div>{this.renderAuthButton()}</div> );
    }
}
 
const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);