import React from 'react'
import Header from './Header.js'
import ContestList from './ContestList.js'
import Contest from './Contest.js'
import * as api from '../api.js';


const pushState = (obj, url) =>
    window.history.pushState(obj, '', url);

const onPopState = handler => {
    window.onpopstate = handler;
};

class App extends React.Component {
    static propTypes = {
        initialData: React.PropTypes.object.isRequired
    }
    // approach below relies on stage 2 being enabled;
    // the not-so-modern approach uses constructor()
    state = this.props.initialData


    componentDidMount() {
        // we would put timers and listeners here,
        // also AJAX requests will go here
        onPopState((event) => {
            this.setState({
                currentContestId: (event.state || {}).currentContestId
            });
        });
    }

    componentWillUnmount() {
        // would clean timers and listeners here
        onPopState(null);
    }

    fetchContest = (contestId) => {
        pushState(
            {currentContestId: contestId},
            `/contest/${contestId}`
        );

        api.fetchContest(contestId).then(contest => {
            this.setState({
                currentContestId: contest.id,
                contests: {
                    ...this.state.contests,
                    [contest.id]: contest
                }
            });
        });
    };

    fetchContestList = () => {
        pushState(
            {currentContestId: null},
            `/`
        );

        api.fetchContestList().then(contests => {
            this.setState({
                currentContestId: null,
                contests
            });
        });
    };

    currentContest() {
        return this.state.contests[this.state.currentContestId];
    }

    pageHeader() {
        if (this.state.currentContestId) {
            return this.currentContest().contestName;
        } else {
            return 'Naming Contests'
        }
    }

    currentContent() {
        if (this.state.currentContestId) {
            return <Contest
                    contestListClick={this.fetchContestList}
                    {...this.currentContest()}/>;
        } else {
            return <ContestList
                    onContestClick={this.fetchContest}
                    contests={this.state.contests}/>
        }
    }
    render() {
        return (
            <div className="App">
                <Header message={this.pageHeader()}/>
                {this.currentContent()}
            </div>
        );
    }
};

export default App;
