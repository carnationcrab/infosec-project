<?php
/**
 * This is a template php file for your countries search.
 * Use as you will, or start over. It's up to you.
 */
 
 // urls
 $URL_NAME = 'https://restcountries.eu/rest/v2/name/';
 $URL_CODE = 'https://restcountries.eu/rest/v2/alpha/';

 // url add-ons
 $FILTERS = '?fields=name;alpha2Code;alpha3Code;flag;region;subregion;population;languages';
 $FULLNAME = '?fullText=true&';

 // types of searches
 $byName = 'name';
 $byFullname = 'fullname';
 $byCode = 'code';

// Retrieves and sorts the data from the restcountries.eu endpoints
function getData() {
    $searchBy = $_REQUEST['by'];
    $keyword = $_REQUEST['keyword'];

    return [$searchBy, $keyword];

}

$data = getData();

header('Content-Type: application/json');
echo json_encode($data);