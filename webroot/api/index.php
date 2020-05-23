<?php
/**
 * This is a template php file for your countries search.
 * Use as you will, or start over. It's up to you.
 */
 

// Retrieves and sorts the data from the restcountries.eu endpoints
function getData() {
     // urls
    $URL_NAME = 'https://restcountries.eu/rest/v2/name/';
    $URL_CODE = 'https://restcountries.eu/rest/v2/alpha/';

    // url add-ons
    $FILTERS = '?fields=name;alpha2Code;alpha3Code;flag;region;subregion;population;languages';
    $FULLNAME = '?fullText=true&';


    $searchBy = $_REQUEST['by'];
    $keyword = $_REQUEST['keyword'];

   // return [$searchBy, $keyword];

    if(empty($keyword) || empty($searchBy)) {
        return ['null'];
    }

    if ($searchBy == 'name') {
        // return ['name'];
       $url = $URL_NAME.$keyword.$FILTERS;
    }
    if ($searchBy == 'fullname') {
        // return ['full'];
        $url = $URL_NAME.$keyword.$FULLNAME.$FILTERS;
    }
    if ($searchBy == 'code') {
        // return ['code'];
        $url = $URL_CODE.$keyword.$FILTERS;
    }

    if ($url) { 
        return ['url', $url];

    };

}

$data = getData();

header('Content-Type: application/json');
echo json_encode($data);