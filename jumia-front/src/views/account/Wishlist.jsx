import React, { Component, lazy } from "react";
import { data } from "../../data";
const CardProductList2 = lazy(() =>
  import("../../components/card/CardProductList2")
);
const ProfileSiderBar = lazy(() =>
  import("../../components/account/ProfileForm")
);

class WishlistView extends Component {
  constructor(props) {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-4">
            <ProfileSiderBar />
          </div>

          <div className="col-md-8">
            <div className="container mb-3">
              <h4 className="my-3">Wishlists</h4>
              <div className="row g-3">
                {data.products.map((product, idx) => {
                  return (
                    <div key={idx} className="col-md-6">
                      <CardProductList2 data={product} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WishlistView;
