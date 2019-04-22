import React, { Component } from "react";
import isEmpty from "../../validations/is-Empty";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">
                {profile.status} at{" "}
                {isEmpty(profile.company) ? null : (
                  <span>{profile.company}</span>
                )}
              </p>
              {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
              <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.website}
                    target="_blank"
                  >
                    <i class="fas fa-globe fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.twitter}
                    target="_blank"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.facebook}
                    target="_blank"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.linkedIn) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.linkedIn}
                    target="_blank"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.instagram}
                    target="_blank"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
                {/*
                <Link className="text-white p-2" to={profile.user}>
                  <i className="fas fa-globe fa-2x" />
                </Link>
                <Link className="text-white p-2" to={}>
                  <i className="fab fa-twitter fa-2x" />
                </Link>
                <Link className="text-white p-2" to={}>
                  <i className="fab fa-facebook fa-2x" />
                </Link>
                <Link className="text-white p-2" to={}>
                  <i className="fab fa-linkedin fa-2x" />
                </Link>
                <Link className="text-white p-2" to={}>
                  <i className="fab fa-instagram fa-2x" />
                </Link>
                */}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
