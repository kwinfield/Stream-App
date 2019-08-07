import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams, editStream, deleteStream } from '../../actions';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
            <div className="float-right">
                <Link to={`/streams/edit/${stream.id}`} className="btn btn-secondary mr-2">Edit</Link>
                <Link to={`/streams/delete/${stream.id}`} className="btn btn-danger">Delete</Link>
            </div>
            );
        }
    }

    renderCreateButton () {
        if (this.props.isSignedIn) {
            return <Link to="/streams/new"><button type="button" className="btn btn-success float-right">Create Stream</button></Link>
        };
    }

    renderList() {
        return this.props.streams.map(stream =>{
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`/streams/${stream.id}`}>
                            {stream.title}
                        </Link>
                        <div className="description">
                            {stream.description}
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() { 
        return ( 
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreateButton()}
            </div>
            );
    };
};      

const mapStateToProps = (state) => {
    return { 
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};
 
 
export default connect(mapStateToProps, { fetchStreams, editStream, deleteStream })(StreamList);