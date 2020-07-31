import React, { useEffect } from "react";
import { getShops, setDeafultShop } from "../../Redux/Actions/Shops";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../../components/Navigations/NavBar";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";

function ShopsList(props) {
  useEffect(() => {
    props.getShops();
  }, []);

  const changeDefaultShop = (shopid) => {
    props.setDeafultShop(shopid, props);
  };
  console.log(props.currentshop);

  return (
    <div>
      <NavBar titleone="Select a Shop" />
      <Loader fullPage loading={props.shops.loading} />
      <ul className="collection">
        {props.shops.shops.length > 0
          ? props.shops.shops.map((value, index) => (
              <Link
                to="#"
                onClick={() => {
                  changeDefaultShop(value.serialno);
                }}
                className="collection-item avatar"
                key={index}
              >
                <div className="col s10">
                  <i className="material-icons circle">folder</i>
                  <span className="title">{value.shopname}</span>
                  <br />
                  <span>
                    Type: {value.shoptype}, Location: {value.region}
                  </span>
                </div>
                <div className="col s2">
                  <i className="material-icons right ">more_vert</i>
                </div>
              </Link>
            ))
          : ""}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  shops: state.shops,
  currentshop: state.shops.currentshop,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getShops: () => dispatch(getShops()),
    setDeafultShop: (shopid, props) => dispatch(setDeafultShop(shopid, props)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(ShopsList);
