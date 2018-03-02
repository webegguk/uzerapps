import React from 'react';
import AppRating from '../apprating';
import './User.css';

class User extends React.Component {

    setRating = (app) => {
        let appRating = 0;
        if (app.ratings !== undefined) {
            // Using all ratings stored under their own key to get the average of all rating clicks
            const ratingsArr = Object.keys(app.ratings).map(ratingId => app.ratings[ratingId]);
            appRating = Math.round(ratingsArr.reduce((sum, item) => sum + item.rating, 0) / ratingsArr.length, 10);
        }
        return appRating;
    };

    render() {
        return (
            <div className='item'>
                <div className='ui tiny image'>
                    <img src={'/img/' + this.props.user.name.replace(/\s+/g, '-').toLowerCase() + '.png'} alt='' />  {/* TODO:// A dynamic profile image would be nice */}
                </div>
                <div className='content'>
                    <div className='header'>
                        {this.props.user.name}{"'"}s Apps
                        <span className='acc-id right floated'>{this.props.user.account}</span>
                    </div> {/* get user name passed down from <Dashboard /> via prop */}

                    { // iterate through each app within user
                        this.props.user.apps.map((app, index) => (
                            <div className='description' key={index}>
                                <span>
                                    {app.title}
                                </span>
                                <span className='right floated'>
                                    <AppRating
                                        accountId={this.props.user.account}
                                        appId={app.id}
                                        rating={this.setRating(app)} // set the initial rating from firebase via <App /> and internal function
                                    />
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default User;