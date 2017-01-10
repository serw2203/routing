'use strict';
import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadIssues } from './../actions';

class Item extends Component {

    blueH1(value) {
        return (<h1>
            <font style={{color: '#00F'}}>{value} {this.props.counter}</font>
        </h1>);
    }

    handleClick() {
       this.props.loadIssues();
    }

    render() {
        return (
            <div>
                {::this.blueH1('ROUTING')}
                <button id="btnLoadIssues" onClick={::this.handleClick}>Load issues</button>
                <ul id="ulLoadedIssues">
                    {this.props.issues.map(it => <li key={it.title}>{it.title}</li>)}
                </ul>
            </div>
        );
    }
}

export default connect(
    state => {
        return {counter: state.counter, issues: state.issues};
    },
    dispatch => bindActionCreators({loadIssues}, dispatch)
)(Item);