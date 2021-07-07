import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function Search() {
  const { query } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      await axios
        .get(`/api/react/search_products?key=no2$gold&query=${query}`)
        .then((res) => {
          setProducts(res.data);
        });
    };

    fetchProducts();
  }, [query]);

  return (
    <div className="homepage">
      <div className="homepage__products">
        {products.map((item) => (
          <div className="card" style={{ width: "18rem" }}>
            <a href={`/products/view/${item?.url_slug}#show`}>
              <img
                src={item?.picture_url}
                className="card-img-top homepage__product-image"
                alt=""
              />
            </a>
            <div className="card-body">
              <h5 className="card-title">{item?.name}</h5>
              <p className="card-text">₹ {item?.price}</p>
              <h6 className="card-text">Company: {item?.company}</h6>
              <Link
                to={`/products/view/${item?.url_slug}#show`}
                className="btn btn-primary"
              >
                View More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
