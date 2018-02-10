import React from 'react';
import User from '../user';
import './Dashboard.css';

class Dashboard extends React.Component {
    // Making use of transform-class-properties property initializers here
    // No need to bind `this` to the updateSearch arrow function
    // Constructor also not needed

    state = {
        search: ''
    };

    updateSearch = (e) => {
        const value = e.target.value;
        this.setState({ search: value.toLowerCase() })
    };

    render() {
        if (!this.props.loaded) {
            return (
                <div class="ui segment">
                    <div class="ui active inverted dimmer">
                        <div class="ui text loader">Loading</div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='dashboard'>
                    <div class="ui search">
                        <div class="ui icon input">
                            <input
                                className="prompt"
                                placeholder="Search users..."
                                autoComplete="off"
                                onChange={this.updateSearch} />
                            <i class="search icon"></i>
                        </div>
                        <div class="results"></div>
                        <img src={'/img/bolt.png'} className='bolt' alt='' />
                    </div>
                    
                    <div className='ui items'>
                        {
                            this.props.results.map((user, index) => {
                                if (!user.name.toLowerCase().includes(this.state.search)) {
                                    return null;
                                }
                                return (
                                    <User
                                        key={index}
                                        id={index}
                                        user={user}
                                    />
                                )
                            })
                        }

                    </div>
                </div>
            );
        }
    }
}

export default Dashboard;