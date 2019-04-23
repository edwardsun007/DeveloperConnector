import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

// no need for redux since all state are within this component only!
class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "197397d88eb09311b58b",
      clientSecret: "0d4169010a08627bc28f63aa27755af4fb115255",
      count: "5",
      sort: "created: asc", // sort by date acending
      repos: []
    };
  }

  componentDidMount() {
    const { githubname } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    // this is browser's fetch method read it on MDN, it returns promise object
    //https://api.github.com/users/edwardsun007/repos?per_page='5'&sort='created: asc'&client_id='197397d88eb09311b58b'&client_secret='0d4169010a08627bc28f63aa27755af4fb115255'
    fetch(
      `https://api.github.com/users/${githubname}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        //
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    // this is originally fetched from Github then we set to state
    const { repos } = this.state;
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  githubname: propTypes.string.isRequired
};

export default ProfileGithub;
