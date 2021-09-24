import React, { useEffect, useState } from 'react';
import "./CoinData.css";

function CoinData ({match}) {

  const [cryptoCurrencyData, setCryptoCurrencyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.coingecko.com/api/v3/coins/${match.params.id}`)
      .then((response) => response.json())
      .then((cryptoCurrencyData) => {
        setCryptoCurrencyData(cryptoCurrencyData);
        console.log(cryptoCurrencyData.name)
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
    return (
        <div>
        <div className="title">
            <h1>{cryptoCurrencyData.name}</h1>
        </div>
        
          <div className="main-container">
    
          <div className="row-container">

            <div className="price-container">
              <h1 className="text">Price</h1>
              <h1 className="data">£{cryptoCurrencyData.market_data.current_price.gbp}</h1>
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
              <h1 className="data">£{cryptoCurrencyData.market_data.high_24h.gbp}</h1>
            </div>

            <div className="low-price-container">
              <h1 className="text">24 hour low</h1>
              <h1 className="data">£{cryptoCurrencyData.market_data.low_24h.gbp}</h1>
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
                  (<h1 className="price-increase">{cryptoCurrencyData.market_data.price_change_percentage_1y_in_currency.gbp.toFixed(2)}%</h1>) : 
                  (<h1 className="price-decrease">{cryptoCurrencyData.market_data.price_change_percentage_1y_in_currency.gbp.toFixed(2)}%</h1>)
                }  
              </div>
            </div>

            <div className="total-supply-container">
              <h1 className="text">Total supply</h1>
              <div className="data">
                {cryptoCurrencyData.market_data.total_supply == null ? 
                  (<h1>null</h1>) : (<h1>{cryptoCurrencyData.market_data.total_supply}</h1>)
                  }
              </div> 
            </div> 

            <div className="circulating-supply-container">
              <h1 className="text">Circulating supply</h1>
              <h1 className="data">{cryptoCurrencyData.market_data.circulating_supply}</h1>
            </div>
            
          </div>
        </div>
       </div>
    )
}

export default CoinData;


{/* <div>
      {cryptoCurrency.map((coin) => (
          <div key={coin.id}>
            {coin.image}
              <div>
                <Link to={`/home/${coin.id}`}>{coin.name}</Link>
              </div>
          </div>
        )
      )}
    </div> */}


  //   {cryptoCurrencyName.map((coin) => (
  //     <div className="home-container" key={coin.id}>
  //       <img className="coin-img" src={coin.image} />
  //       <h1 className="coin-name">
  //         <Link to = {`/shop/${coin.id}`}>{coin.name}</Link>
  //       </h1>
  //       {coin.price_change_24h > 0 ?
  //         (<h1 className="price-increase">{coin.current_price}</h1>) :
  //         (<h1 className="price-decrease">{coin.current_price}</h1>)
  //       }
  //     </div>
  //  ))}

  // <div>
  //   <form>
  //   <input
  //       type="text"
  //       placeholder="Search"
  //       onChange={handleChange}
  //     />
  //   </form>
  //     <div>
  //       {searchResult.map((coin) => (
  //         <div className="home-container" key={coin.id}>
  //         <img className="coin-img" src={coin.image} />
  //         <h1 className="coin-name">
  //           <Link to = {`/shop/${coin.id}`}>{coin.name}</Link>
  //         </h1>
  //         {coin.price_change_24h > 0 ?
  //           (<h1 className="price-increase">{coin.current_price}</h1>) :
  //           (<h1 className="price-decrease">{coin.current_price}</h1>)
  //         }
  //       </div>
  //       ))}
  //     </div>
  //   </div>



///////Full first page

//   import "./App.css";
// import React, { useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
// import Button from '@material-ui/core/Button';

// function Shop() {

//   const [cryptoCurrencyName, setCryptoCurrencyName] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const fetchCryptoName = async () => {
//       const data = await fetch ("https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=100&page=1&sparkline=false");
//       const cryptoCurrencyName = await data.json();
//       setCryptoCurrencyName(cryptoCurrencyName);
//     }
//     fetchCryptoName();
//   }, []);

 
//   const searchResult = cryptoCurrencyName.filter(coin => 
//     coin.name.toLowerCase().includes(search.toLocaleLowerCase())
//     );
     
//   const handleChange = (event) => {
//     setSearch(event.target.value);
//   }

//   return (
//     <div className="App">
//       <h1 className="title">Cryptocurrency Tracker</h1>
//       <div className="form-container">
//         <form>
//           <input
//             className="search-btn"
//             type="text"
//             placeholder="Search"
//             onChange={handleChange}
//           />
//         </form>
//       </div>
//         <div>
//           {searchResult.map((coin) => (
//             <div className="home-container" key={coin.id}>
//             <img className="coin-image" src={coin.image} />
//             <h1 className="coin-name">{coin.name}</h1>
//               {coin.price_change_24h > 0 ?
//                 (<h1 className="price-increase">£{coin.current_price}</h1>) :
//                 (<h1 className="price-decrease">£{coin.current_price}</h1>)
//               }
//             <h1 className="coindata-container">
//               <Link className="link" to = {`/shop/${coin.id}`}><Button style={{
//                 backgroundColor: "#24a0ed",
//                 color: "white",
//                 fontSize: "18px"
//               }} variant="contained">Full Data</Button></Link>
//             </h1>
//           </div>
//           ))}
//         </div>
//     </div>
//   )
// }

// export default Shop
 