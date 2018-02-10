import React from 'react';
import fire from '../../firebase.js';
import 'semantic-ui-css/semantic.min.css';
import './Apprating.css';

class AppRating extends React.Component {

    maxStars = 5;

    state = {
        rating: this.props.rating,
        ratingOnHover: null
    }

    // if voted, stores the id internally so it can be changed
    ratingDbKey = null;


    render() {
        var stars = [];
        var clear = [];
        for (let i = 1; i <= this.maxStars; i++) {
            // hover overwrites the state of the stored rating from the database
            const currentRating = (this.state.ratingOnHover !== null ? this.state.ratingOnHover : this.state.rating);
            const starShine = (i <= currentRating);
            stars.push(
                <Star
                    key={i}
                    rating={i}
                    shine={starShine}
                    setRating={(rating) => this._setRating(rating)}
                    changeRatingOnHover={(rating) => this._changeRatingOnHover(rating)} />
            );
        }
        // add a button to clear the rating completely
        if (this.state.rating !== 0) {
            clear.push(
                <i
                    key={this.state.rating}
                    className='remove circle icon'
                    onClick={(rating) => this._setRating(0)}>
                </i>
            )
        }
        return (
            <div>
                {clear}
                <div
                    className='ui star rating'
                    onMouseLeave={() => this._clearRatingOnHover()}>
                    {stars}
                </div>
            </div>
        )
    }

    _setRating = (rating) => {
        this.setState({
            rating
        });
        this._updateRating(rating);
    }

    _changeRatingOnHover = (rating) => {
        this.setState({
            ratingOnHover: rating
        });
    }

    _clearRatingOnHover = () => {
        this.setState({
            ratingOnHover: null
        });
    }

    // updates the rating in the database
    _updateRating = (rating) => {
        const ratingsPath = `/accounts/${this.props.accountId}/apps/${this.props.appId}/ratings/`;
        if (this.ratingDbKey === null) {
            // add a new key each time a user votes within the current lifespan of the app
            // This gives them the ability to change their mind
            this.ratingDbKey = fire.database().ref(ratingsPath).push({ rating }).key;
        } else {
            // set the value in the firebase database
            fire.database().ref(ratingsPath + this.ratingDbKey).set({ rating });
        }
    }

}

const Star = (props) => {
    const _handleHover = (event) => {
        event.stopPropagation();
        props.changeRatingOnHover(props.rating);
    }

    const _handleClick = (event) => {
        event.stopPropagation();
        props.setRating(props.rating);
    }

    const stateClassSuffix = (props.shine === true ? ' active' : '');

    return (
        <i
            rating={props.rating}
            onClick={_handleClick}
            onMouseEnter={_handleHover}
            className={'icon' + stateClassSuffix}>
        </i>
    )
}

export default AppRating;