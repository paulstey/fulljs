import React from 'react'
import Header from './Header.js'
import ContestList from './ContestList.js'


const pushState = (obj, url) =>
    window.history.pushState(obj, '', url);


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

    fetchContest = (contestId) => {
        pushState(
            {currentContestId: contestId},
            `/contest/${contestId}`
        );
    };
    render() {
        return (
            <div className="App">
                <Header message={this.state.pageHeader}/>
                <ContestList
                    onContestClick={this.fetchContest}
                    contests={this.state.contests}/>
            </div>
        );
    }
};

export default App;
