import "./App.css";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

function Home() {

  const [cryptoCurrencyName, setCryptoCurrencyName] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then((response) => response.json())
      .then((cryptoCurrencyName) => {
        setCryptoCurrencyName(cryptoCurrencyName);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

 
  const searchResult = cryptoCurrencyName.filter(coin => 
    coin.name.toLowerCase().includes(search.toLocaleLowerCase())
    );
     
  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  return (
    <div className="App">
      <div className="title">
       <h1>Cryptocurrency Tracker</h1>
      </div>
      
      <div className="form-container">
        <form>
          <input
            className="search-btn"
            type="text"
            placeholder="Search"
            onChange={handleChange}
          />
        </form>
      </div>
        <div>
          {searchResult.map((coin) => (
            <div className="home-container" key={coin.id}>
            <img className="coin-image" src={coin.image} />
            <h1 className="coin-name">{coin.name}</h1>
              {coin.price_change_24h > 0 ?
                (<h1 className="price-increase">£{coin.current_price.toLocaleString(undefined,
                  {'minimumFractionDigits':2,'maximumFractionDigits':2})}</h1>) :
                (<h1 className="price-decrease">£{coin.current_price.toLocaleString(undefined,
                  {'minimumFractionDigits':2,'maximumFractionDigits':2})}</h1>)
              }
            <h1 className="coindata-container">
              <Link className="link" to = {`/home/${coin.id}`}><Button style={{
                    backgroundColor: "#24a0ed",
                    color: "white",
                    fontSize: "18px"
                }} variant="contained">Full Data</Button></Link>
            </h1>
          </div>
          ))}
        </div>
    </div>
  )
}

export default Home

