import React from 'react'

import Header from './Header.js'
import ContestPreview from './ContestPreview.js'


class App extends React.Component {

    // approach below relies on stage 2 being enabled;
    // the not-so-modern approach uses constructor()
    state = {
        pageHeader: "Naming Contests",
        contests: this.props.initialContests
    };
    componentDidMount() {
        // we would put timers and listeners here,
        // also AJAX requests will go here

        // // Use axios for AJAX requests, and
        // // gives us a promise
        // axios.get('/api/contests')
        //     .then(resp => {
        //         this.setState({
        //             contests: resp.data.contests
        //         });
        //     })
        //     .catch(console.error)


    }

    componentWillUnmount() {
        // would clean timers and listeners here
    }

    render() {
        return (
            <div className="App">
                <Header message={this.state.pageHeader}/>
                <div>
                    {this.state.contests.map(contest =>
                        <ContestPreview key={contest.id} {...contest}/>
                    )}
                </div>
            </div>
        );
    }
};

export default App;
