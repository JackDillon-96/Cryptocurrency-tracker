import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { AiOutlineHome } from 'react-icons/ai';
import Button from '@material-ui/core/Button';
import "./CoinData.css";

function CoinData ({ match }) {

  const [cryptoCurrencyData, setCryptoCurrencyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory()

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.coingecko.com/api/v3/coins/${match.params.id}`)
      .then((response) => response.json())
      .then((cryptoCurrencyData) => {
        setCryptoCurrencyData(cryptoCurrencyData);
        console.log(match.params.id)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [match.params.id]);


  if (loading) {
    return <p>Loading...</p>;
  }
    return (
        <div>
          <Button onClick={history.goBack}
            style={{
                backgroundColor: "#24a0ed",
                color: "white",
                fontSize: "18px",
              }} variant="contained">
            <AiOutlineHome />
          </Button>

        <div className="title">
            <h1>{cryptoCurrencyData.name}</h1>
        </div>
        
          <div className="main-container">
    
          <div className="row-container">

            <div className="price-container">
              <h1 className="text">Price</h1>
              <h1 className="data">£{cryptoCurrencyData.market_data.current_price.gbp.toLocaleString("en-UK")}</h1>
            </div>

            <div className="price-change-container">
              <h1 className="text">24 hour price change</h1>
              <div className="data">
                {cryptoCurrencyData.market_data.price_change_percentage_24h.gbp > 0 ?
                  (<h1 className="price-increase">{cryptoCurrencyData.market_data.price_change_percentage_24h.toFixed(2)}%</h1>) :
                  (<h1 className="price-decrease">{cryptoCurrencyData.market_data.price_change_percentage_24h.toFixed(2)}%</h1>)
                }
              </div>
            </div>

            <div className="high-price-container">
              <h1 className="text">24 hour high</h1>
              <h1 className="data">£{cryptoCurrencyData.market_data.high_24h.gbp.toLocaleString(undefined,
                  {'minimumFractionDigits':2,'maximumFractionDigits':2})}</h1>
            </div>

            <div className="low-price-container">
              <h1 className="text">24 hour low</h1>
              <h1 className="data">£{cryptoCurrencyData.market_data.low_24h.gbp.toLocaleString(undefined,
                  {'minimumFractionDigits':2,'maximumFractionDigits':2})}</h1>
            </div>
          </div>

          <div className="row-container">

            <div className="market-cap-container">
              <h1 className="text">Market cap rank</h1>
              <h1 className="data">{cryptoCurrencyData.market_cap_rank}</h1>
            </div>

            <div className="year-price-container">
              <h1 className="text">1 year price change</h1>
              <div className="data">
                {cryptoCurrencyData.market_data.price_change_percentage_1y_in_currency.gbp > 0 ?
                  (<h1 className="price-increase">{cryptoCurrencyData.market_data.price_change_percentage_1y_in_currency.gbp.toFixed(2).toLocaleString("en-UK")}%</h1>) : 
                  (<h1 className="price-decrease">{cryptoCurrencyData.market_data.price_change_percentage_1y_in_currency.gbp.toFixed(2).toLocaleString("en-UK")}%</h1>)
                }  
              </div>
            </div>

            <div className="total-supply-container">
              <h1 className="text">Total supply</h1>
              <div className="data">
                {cryptoCurrencyData.market_data.total_supply == null ? 
                  (<h1 className="supply">null</h1>) : (<h1 className="supply">{cryptoCurrencyData.market_data.total_supply.toLocaleString("en-UK")}</h1>)
                  }
              </div> 
            </div> 

            <div className="circulating-supply-container">
              <h1 className="text">Circulating supply</h1>
              <h1 className="data">{cryptoCurrencyData.market_data.circulating_supply.toLocaleString("en-UK")}</h1>
            </div>
            
          </div>
        </div>
       </div>
    )
}

export default CoinData;



 