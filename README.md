# Countries Code Challenge

## Description

This app takes in input of a country name, fullname, or country code and outputs information regarding that country. It is built with ReactJS, Javascript, PHP, and MaterializeCSS.

### A/C:

- Use the REST Countries api as your data source (https://restcountries.eu/). 
- An HTML form input will accept the string of a country name or code. 
- An error message will be emitted if users submit the form without input or if the search yields no results. 
- The form data must be submitted via Javascript to a PHP server that then will retrieve data from the REST Countries api and return it to the frontend. Do not attempt to cache results from the REST Countries api. 
- The PHP endpoint you build should return JSON and include all the data necessary to render the view as described. 
- Search is possible by country name, full name, or code. 
- On the server sort the countries returned by population in descending order. The page should not reload. 
- The search results should be displayed on an HTML page. 
- For each country displayed include: the full name, alpha code 2, alpha code 3, flag image, region, subregion, population, and a list of its languages. 
- At the bottom of the page, show the total number of countries and list all regions and subregions contained in the results with the number of times it appeared. 


## How to use

To start the server open a terminal window on unix/linux based systems and change
directory to the project root. Then execute this command:

```
  ./server
```

The command assumes you have a PHP binary in your system path. If you don't you
will get an error and the server will not start.

After starting the server go to:

```
http://localhost:8765/index.html  
```

If you setup the http server differently, please provide direction on how to start it
in your submitted project's readme file.

## Learnings and Future Directions

I really enjoyed doing this project. In the future, I would like to break the app file up into manageable chunks. I think there is way too much code in the app file.

I would also like to add tests to the application-- specifically integration tests. Tests would make it a lot easier to prove that the code meets the acceptance criteria.

Through doing this project, I got to explore a lot of resources about PHP. Sources are listed below.

There is a warning about keys that remains in the app. This, while not causing any harm to the running of the app, is still something I would like to tackle.

## Choices

In the interest of having a nice layout, while also keeping the app simple, I chose to use materialize for styling. 

I intended to try out using webpack, but chose not to for the same reason.

I chose to use fetch() because I wanted the function to return even if the status was not 200 for sake of ease of error reporting.

## Sources

[PHP Documentation](https://www.php.net/manual/en/)

[Materialize CSS Documentation](https://materializecss.com/)

[React JS Documentation](https://reactjs.org/)

[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

[Rest Countries API](https://restcountries.eu/)
