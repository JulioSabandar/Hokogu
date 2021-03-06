import React, { useEffect, useState } from "react";
import queryString from "query-string";
import FoodCard from "../components/FoodCard";
import { useSelector, useDispatch } from "react-redux";
import { getRecipies } from "../store/actions/recipeActions";
import { getFavourites } from "../store/actions/favouritesActions";

import { Grid } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { Mic as MicIcon } from "@material-ui/icons";

const SearchResults = ({ location }) => {
  const dispatch = useDispatch();

  let recipies = useSelector(state => state.recipeReducer.recipies);
  let recipiesLoading = useSelector(
    state => state.recipeReducer.recipiesLoading
  );
  let favourites = useSelector(state => state.favouritesReducer.favourites);
  let favouritesLoading = useSelector(
    state => state.favouritesReducer.favouritesLoading
  );

  const [query, setQuery] = useState("");
  const [isOnListening, setIsOnListening] = useState(false);

  const history = useHistory();

  const handleQuery = value => {
    setQuery(value);
  };

  const search = e => {
    e.preventDefault();
    if (query !== "") {
      history.push(`/search?query=${query}`);
    }
  };

  function speechToText() {
    // speech recognition API supported
    var SpeechRecognition =
      window.speechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    // This will run when the speech recognition service returns a result
    recognition.onstart = function() {
      console.log(
        "Voice recognition started. Try speaking into the microphone."
      );
      setIsOnListening(true);
    };

    recognition.onresult = function(event) {
      setIsOnListening(false);
      var transcript = event.results[0][0].transcript;
      if (query !== "" || query !== undefined || query !== null) {
        setQuery(transcript);
        console.log("querrry", query);
        if (transcript !== "") {
          history.push(`/search?query=${transcript}`);
        }
      }
    };
    // start recognition
    recognition.start();
  }

  useEffect(() => {
    const { query } = queryString.parse(location.search);
    setQuery(query);
    dispatch(getFavourites);
    dispatch(getRecipies(query));
  }, [location.search]);

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <div
        style={{
          backgroundImage: `url('https://cutewallpaper.org/21/pastel-backgrounds/Watercolor-Background-Tumblr-Mint-Green-Pastel-Background-.jpg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "200px",
          paddingTop: "60px",
          textAlign: "center"
        }}
      >
        <div className="searchBar2">
          <SearchIcon
            style={{
              fontSize: "40px",
              marginLeft: "8px",
              marginTop: "8px",
              color: "#FF5F6D"
            }}
          />
          <form className="searchForm2" onSubmit={search}>
            <input
              autoFocus
              onChange={e => handleQuery(e.target.value)}
              // placeholder='what are you craving...'
              className="searchInput2"
              value={query}
              type="text"
            />
          </form>
          <IconButton onClick={speechToText}>
            {isOnListening ? (
              <MicIcon
                style={{ fontSize: "30px", right: "3vw" }}
                className="iconColor"
              />
            ) : (
              <MicIcon style={{ fontSize: "30px", right: "3vw" }} />
            )}
          </IconButton>
        </div>
      </div>

      <h1 style={{ textAlign: "center", color: "#fd515c" }}>Search Results</h1>

      <br />
      {recipiesLoading && (
        <div style={{ textAlign: "center" }}>
          <img height="300" width="300" src="loading.gif" alt="loading" />
        </div>
      )}

      {!recipiesLoading && (
        <div style={{padding: '0px 9%'}}> 

        <Grid container lg={12} spacing={3} className={"resultSearch"}>
          {recipies.map((recipe, idx) => {
            return (
              <Grid item lg={6} sm={12} className={"resultDetail"}>
                <div key={idx}>
                  <FoodCard recipe={recipe} />
                </div>
              </Grid>
            );
          })}
        </Grid>
        </div>
      )}
      {!recipiesLoading && recipies.length < 1 && (
        <div style={{ textAlign: "center" }}>
          <img style={{ width: "13vw" }} src="/confused.gif" />
          <p style={{ fontSize: "15px" }}>There's nothing here..</p>
        </div>
      )}

      <br />
      <br />
      <br />
    </div>
  );
};
export default SearchResults;
