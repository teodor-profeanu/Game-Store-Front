import React, { useState, useEffect, useRef } from 'react';
import Games from './Games';
import './Store.css';
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { ThemeProvider } from '@mui/material/styles';
import * as utils from './Utils';

export default function Store() {

  const { clickLogin } = utils.useLogin();
  const { clickHome } = utils.useHome();
  const { clickStore } = utils.useStore();

  const [tags, setTags] = useState([]);

  const [games, setGames] = useState([]);

  const [lastPressedButton, setLastPressedButton] = useState(1);
  const [ascending, setAscending] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [page, setPage] = useState(1);

  const gamesPerPage = 10;
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(gamesPerPage);
  const [nrOfPages, setNrOfPages] = useState(0);
  const nextPage = () => {
    setPage(page + 1);
    setStart(start + gamesPerPage);
    setEnd(end + gamesPerPage);
  }
  const prevPage = () => {
    setPage(page - 1);
    setStart(start - gamesPerPage);
    setEnd(end - gamesPerPage);
  }

  useEffect(() => {

    fetch(`${utils.tagsURL}`)
        .then(response => response.json())
        .then(res => {
          setTags(res.object);
        }).catch(error => {
          console.log("Error:", error);
        });

    if (lastPressedButton == 1) {
      fetch(`${utils.featuredURL}?userId=${utils.loggedUser.id}`)
        .then(response => response.json())
        .then(res => {
          setGames(res.object);
          setNrOfPages(Math.ceil(res.object.length / gamesPerPage));
        }).catch(error => {
          console.log("Error:", error);
        });
    }
    else if (lastPressedButton == 2) {
      fetch(`${utils.trendingURL}?userId=${utils.loggedUser.id}`)
        .then(response => response.json())
        .then(res => {
          setGames(res.object);
          setNrOfPages(Math.ceil(res.object.length / gamesPerPage));
        }).catch(error => {
          console.log("Error:", error);
        });
    }
    else if (lastPressedButton == 3) {
      fetch(`${utils.topSellersURL}?userId=${utils.loggedUser.id}`)
        .then(response => response.json())
        .then(res => {
          setGames(res.object);
          setNrOfPages(Math.ceil(res.object.length / gamesPerPage));
        }).catch(error => {
          console.log("Error:", error);
        });
    }
    else {
      fetch(`${utils.newReleasesURL}?userId=${utils.loggedUser.id}`)
        .then(response => response.json())
        .then(res => {
          setGames(res.object);
          setNrOfPages(Math.ceil(res.object.length / gamesPerPage));
        }).catch(error => {
          console.log("Error:", error);
        });
    }
  }, [lastPressedButton]);

  const searchRef = useRef("search");
  const priceMinRef = useRef("priceMin");
  const priceMaxRef = useRef("priceMax");
  const sortRef = useRef("sort");
  const tagRef = useRef("tag");

  const clickSearch = () =>{
    const search = searchRef.current.value;
    let priceMin = priceMinRef.current.value;
    let priceMax = priceMaxRef.current.value;
    const tag = tagRef.current.value;
    const sort = sortRef.current.value;

    if(priceMin == "")
      priceMin = "0";

    if(priceMax == "")
      priceMax = "9999";

    let sortingCriteria = ''
    let sortingValue = '1'
    if(!ascending)
      sortingValue = '2'
    
    if(sort == "sales")
      sortingCriteria = `&popularity=${sortingValue}`;

    if(sort == "rating")
      sortingCriteria = `&rating=${sortingValue}`;

    if(sort == "reviews")
      sortingCriteria = `&reviews=${sortingValue}`;

    if(sort == "date")
      sortingCriteria = `&date=${sortingValue}`;

    if(sort == "price")
      sortingCriteria = `&price=${sortingValue}`;

    console.log(`${utils.searchURL}?userId=${utils.loggedUser.id}&keywords=${search}&priceMin=${priceMin}&priceMax=${priceMax}&discount=${isChecked}&tagId=${tag}${sortingCriteria}`);

    fetch(`${utils.searchURL}?userId=${utils.loggedUser.id}&keywords=${search}&priceMin=${priceMin}&priceMax=${priceMax}&discount=${isChecked}&tagId=${tag}${sortingCriteria}`)
        .then(response => response.json())
        .then(res => {
          setGames(res.object);
          setNrOfPages(Math.ceil(res.object.length / gamesPerPage));
        }).catch(error => {
          console.log("Error:", error);
        });
  }

  return (
    <ThemeProvider theme={utils.theme}>
      <div>
        <div className="ribbon-button-container">
          <button className="logo" onClick={clickHome} />
          <button className="ribbon-button" onClick={clickStore}>Store</button>
          <button className="ribbon-button" onClick={clickLogin}>Profile</button>
        </div>
        <div className="section-button-container">
          <div className="rectangle3"></div>
          <button className={lastPressedButton === 1 ? "section-button-active" : "section-button"} onClick={() => setLastPressedButton(1)}>Featured</button>
          <button className={lastPressedButton === 2 ? "section-button-active" : "section-button"} onClick={() => setLastPressedButton(2)}>Trending</button>
          <button className={lastPressedButton === 3 ? "section-button-active" : "section-button"} onClick={() => setLastPressedButton(3)}>Top sellers</button>
          <button className={lastPressedButton === 4 ? "section-button-active" : "section-button"} onClick={() => setLastPressedButton(4)}>New releases</button>
          <div className="rectangle5"></div>
          <div className="rectangle4"></div>
        </div>
        <div className="rectangle1"></div>
        <div className="rectangle2"></div>
        <div className="search-rect">
          <div className="search-bar-combo">
            <div>
              <input className="search-bar" type="text" placeholder="search" ref={searchRef}/>
              <IconButton aria-label="search" color='secondary' sx={{ '&:hover': { color: 'white' } }} onClick={clickSearch}><SearchIcon /></IconButton>
            </div>
            <div>
              sort by:
              <select className='dropdown' ref={sortRef}>
                <option value="nothing">nothing</option>
                <option value="sales">sales</option>
                <option value="rating">rating</option>
                <option value="reviews">reviews</option>
                <option value="date">date</option>
                <option value="price">price</option>
              </select>
              <IconButton color={ascending ? 'primary' : 'secondary'} onClick={() => setAscending(true)} sx={{ '&:hover': { color: 'white' } }}><NorthEastIcon /></IconButton>
              <IconButton color={!ascending ? 'primary' : 'secondary'} onClick={() => setAscending(false)} sx={{ '&:hover': { color: 'white' } }}><SouthEastIcon /></IconButton>
            </div>
            <div>
              min price:
              <input className="number-field" type="text" placeholder="0" ref={priceMinRef}/>
            </div>
            <div>
              max price:
              <input className="number-field2" type="text" placeholder="9999" ref={priceMaxRef}/>
            </div>
            <div>
              has discount:
              <input className="checkbox" type="checkbox" onChange={(event) => setIsChecked(event.target.checked)} />
            </div>
            <div>
              tag:
              <select className='dropdown2' ref={tagRef}>
                <option value={"0"} key={0} >&lt;nothing&gt;</option>
                {tags.map((tag) =>
                  <option key={tag.id} value={tag.id.toString()}>
                    {tag.name}
                  </option>
                )}
              </select>
            </div>
          </div>
        </div>
        <div className="games-position">
          <Games games={games.slice(start, end)} />
          {nrOfPages > 0 ?
            <div className="page-number">
              {
                (page > 1) ?
                  (<IconButton color='secondary' sx={{ '&:hover': { color: 'white' } }} onClick={prevPage}><NavigateBeforeIcon /></IconButton>) :
                  (<div />)
              }
              {page} / {nrOfPages}
              {
                (page < nrOfPages) ?
                  (<IconButton color='secondary' sx={{ '&:hover': { color: 'white' } }} onClick={nextPage}><NavigateNextIcon /></IconButton>) :
                  (<div />)
              }
            </div> : <div className="page-number">No games found</div>}
        </div>
      </div>
    </ThemeProvider>
  )
}
