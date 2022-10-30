import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Item } from './components/Item';
import { useState, useEffect } from 'react';
import { default as Axios } from 'axios';


function App() {

  const [items, setItems] = useState<Item[]>([]);
  const [category, setCategory] = useState("all");


  let changeCategory = (type: string) => {
    setCategory(type);
  }

  useEffect(() => {
    if (category === "all") {
      Axios.get('http://localhost:3001/items')
        .then(res => {
          setItems(res.data);
        })
        .catch(err => console.log(err))

    } else if (category === "Breakfast") {
      Axios.get('http://localhost:3001/items').then(res => {
        let arr = res.data.filter(function (item: Item) { return item.type == "Breakfast" })
        setItems(arr)
      })
    } else if (category === "Lunch") {
      Axios.get('http://localhost:3001/items')
        .then(res => {
          let arr = res.data.filter(function (item: Item) { return item.type == "Lunch" })
          setItems(arr)
        })

    } else if (category === "Shakes") {
      Axios.get('http://localhost:3001/items')
        .then(res => {
          let arr = res.data.filter(function (item: Item) { return item.type == "Shakes" })
          setItems(arr)
        })
    }

  }, [category])


  return (
    <React.Fragment>

      <div className="heading">
        <h2>Our Menu</h2>
        <hr color='goldenrod' />
      </div>
      <ul className="nav-justify-content-center">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" onClick={() => changeCategory("all")}>All</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={() => changeCategory("Breakfast")}>Breakfast</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={() => changeCategory("Lunch")}>Lunch</a>
        </li>
        <li className="nav-item">
          <a className="nav-link " onClick={() => changeCategory("Shakes")}>Shakes</a>
        </li>
      </ul>

      <div className="row">
        {items.slice(0,).map((i) => {
          return (
            <>
            <img src={i.image} className="image" />
            <div className="card" >
              <div className='nameandprice'>
                <h4 className="card-title">{i.name}</h4>
                <span className="price">{i.price}</span>
              </div>
              <hr className='card-head' />
              <h5 className='card-desc'>{i.description}</h5>
            </div>
            </>


          )
        })
        }
      </div>
    </React.Fragment>
  );
}

export default App;
