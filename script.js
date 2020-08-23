'use strict';

const apiKey = "eVHuMPUDcP6aP0htAUcURBYWGb092xhvs7wbexXw";

function getParks(state, maxResults) {
    fetch('https://developer.nps.gov/api/v1/parks?stateCode='+state+'&api_key='+apiKey+'&limit='+maxResults)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
    console.log(responseJson);

    $("ul").empty();

    if (responseJson.code == 404) {
        $("div").append(`<h2> State is not found. Please try again. </h2>`)
    } else {
        for (let i = 0; i < responseJson.data.length; i++) {
            $("ul").append(`<li> Park Name: ${responseJson.data[i].fullName} <br> Description: ${responseJson.data[i].description} <br> URL: ${responseJson.data[i].url}</li>`)
        }
    }

}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();

        const state = $('#js-state').val();
        const maxResults = $('#js-maxResults').val();

        const responseJson = getParks(state, maxResults);

    });
}

$(function () {
    console.log('App loaded! Waiting for submit!');
    watchForm();

});