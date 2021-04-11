import React, { useState, useEffect } from 'react';
import { getParamValues, getToken } from '../utils/getToken'
import Axios from 'axios';

function ApiFunctions({setName}) {
    // const [topArtists, setTopArtists] = useState("");
    const url = window.location.href;
    const token = getToken(url)

    const getUserName = (token) => {
        Axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Accept': 'application/JSON',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then((res) => {
            setName(res.data.display_name)
        })
    }

    // const getPlaylists = (token) => {
    //     Axios.get('https://api.spotify.com/v1/me/playlists', {
    //         headers: {
    //             'Accept': 'application/JSON',
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + token
    //         }
    //     })
    //     .then((res) => {
    //         console.log(res.data)
    //     })
    // }

    // const addToPlaylist = (token) => {
    //     Axios.post('https://api.spotify.com/v1/playlists/2OgPMeVjvomcbZdRbdKpUB/tracks?uris=spotify%3Atrack%3A6aR39S1gZYKmu0swOBdQ49', {}, {
    //         headers: {
    //             'Accept': 'application/JSON',
    //             'Content-Type': 'application/json',
    //             'Content-Length': 0,
    //             'Authorization': 'Bearer ' + token
    //         }
    //     }).then((res) => {
    //         console.log("from add Playlist function " + res);
    //     })
    // }

    // to get seed, have to extract the track/artist id from the uri.

    // const getRecommendations = (token, songIds) => {
        
    //     Axios.get(`https://api.spotify.com/v1/recommendations?limit=3&&min_popularity=40&seed_artists=${songIds.join('%2C')}`, {
    //         headers: {
    //             'Accept': 'application/JSON',
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + token
    //         }
    //     })
    //     .then((res) => {
    //         console.log("These are recommended tracks in getRecommendations function" + res.data.tracks)
    //         // Put 3 songs inside of the topRecommendations
    //         setRecommendations(res.data.tracks)
    //     })
    // }

    // const getTopArtists = (token) => {
    //     Axios.get('https://api.spotify.com/v1/me/top/artists?limit=5', {
    //         headers: {
    //             'Accept': 'application/JSON',
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + token
    //         }
    //     })
    //     .then((res) => {
    //         setTopArtists(res.data.items)
    //         const songIds = res.data.items.map((item) => (
    //             item.id
    //         ))
    //         console.log("These are song Ids" + songIds)
    //         getRecommendations(token, songIds)
    //     })
    // }

    useEffect(() => {
        getUserName(token)
        // getPlaylists(token)
        // addToPlaylist(token)
        // getTopArtists(token)
    }, [])

    return (
      <div>
      </div>
    );
  }
  
export default ApiFunctions;