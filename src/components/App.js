import React from 'react'
import Header from './Header.js'
import ContestList from './ContestList.js'
import Contest from './Contest.js'
import * as api from '../api.js';


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

        api.fetchContest(contestId).then(contest => {
            this.setState({
                pageHeader: contest.contestName,
                currentContestId: contest.id,
                contests: {
                    ...this.state.contests,
                    [contest.id]: contest
                }
            });
        });
    };

    currentContent() {
        if (this.state.currentContestId) {
            return <Contest {...this.state.contests[this.state.currentContestId]}/>;
        } else {
            return <ContestList
                onContestClick={this.fetchContest}
                contests={this.state.contests}/>
        }
    }
    render() {
        return (
            <div className="App">
                <Header message={this.state.pageHeader}/>
                {this.currentContent()}
            </div>
        );
    }
};

export default App;
