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

    if(empty($keyword) || empty($searchBy)) {
        return ['null'];
    }

    if ($searchBy == 'name') {
       $url = $URL_NAME.$keyword.$FILTERS;
       return json_decode(file_get_contents($url));

    }
    if ($searchBy == 'fullname') {
        $url = $URL_NAME.$keyword.$FULLNAME.$FILTERS;
        return json_decode(file_get_contents($url));
    }
    if ($searchBy == 'code') {
        $url = $URL_CODE.$keyword.$FILTERS;
        
        return [json_decode(file_get_contents($url))];
    }

}

$data = [getData()];

usort($data[0], function($countryA, $countryB) {
    return $countryA->population < $countryB->population ? 1 : -1;
});

header('Content-Type: application/json');
echo json_encode($data);