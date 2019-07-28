import React from 'react';
import { connect } from 'react-redux';

const Home = props => (
    <div>
       This is home page :)
    </div>
);

export default connect()(Home);