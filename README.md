# Countries Code Challenge

## Description

This was a code challenge I was required to do when applying for a job.

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
