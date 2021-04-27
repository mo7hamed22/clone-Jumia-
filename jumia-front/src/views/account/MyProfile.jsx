import React, { lazy, Component } from "react";
const ProfileSiderBar = lazy(() =>
  import("../../components/account/ProfileForm")
);
const ChangePasswordForm = lazy(() =>
  import("../../components/account/ChangePasswordForm")
);

class MyProfileView extends Component {
  
  
  render() {
    return (
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-4">
            <ProfileSiderBar />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-md-12">
                    <label>Name *</label>
                    <input
                      name="currentPassword"
                      type="password"                     
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-12">
                    <label>Email *</label>
                    <input
                      name="currentPassword"
                      type="password"                     
                      className="form-control"
                    />
                  </div>
                </div>


               
                <button
                  type="submit"
                  className="btn mt-3 btn-success btn-block"                  
                >
                  Edit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyProfileView;
