import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/header';
import Footer from '../common/footer';

const HomeLayout = (props) => {
    return <Fragment>
        <Header {...props}/>
        <Route exact path={props.path} component={props.component} />
        <Footer />
        {/* <a href="javascript:void(0);" id="rocketmeluncur" className="showrocket">
            <i></i>
        </a> */}
    </Fragment>
}

export default HomeLayout;