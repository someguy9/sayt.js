<?php

$data = '[
    {
        "section": {
            "title": "Pages",
            "num": "1",
            "limit": "1"
        },
        "data": [
            {
                "title": "Andy Feliciottis Portfolio",
                "image": "http://static.drawne.com/assets/img/logo1.png",
                "description": "See more work by Andy",
                "url": "http://drawne.com"
            }
        ]
    },
    {
        "section": {
            "title": "Search Engines",
            "num": "3",
            "limit": "3"
        },
        "data": [
            {
                "title": "Google Search for '.$_GET['query'].'",
                "url": "https://www.google.com/#q='.$_GET['query'].'&fp=1"
            },
            {
                "title": "Bing Search for '.$_GET['query'].'",
                "url": "http://www.bing.com/search?q='.$_GET['query'].'"
            },
            {
                "title": "Yahoo Search for '.$_GET['query'].'",
                "url": "http://search.yahoo.com/search;_ylt=AjjCFSene_qdvfjfH51XBWebvZx4?p='.$_GET['query'].'"
            }
        ]
    },
    {
        "section": {
            "title": "Photos",
            "num": "30",
            "limit": "5"
        },
        "data": [
            {
                "title": "National Cathedral",
                "image": "http://pcdn.500px.net/34356968/77a940b681c9610f6ad4c69a90a77c0693ea0fc6/4.jpg",
                "url": "http://500px.com/photo/34356968"
            },
            {
                "title": "Storm Clouds over Great Falls",
                "image": "http://pcdn.500px.net/33842701/3a8b258e363975b92218f6b4b133ae966dad07be/4.jpg",
                "url": "http://500px.com/photo/33842701"
            },
            {
                "title": "Cherry Blossom Festival at Jefferson Memorial",
                "image": "http://pcdn.500px.net/30778827/d69ef1a1b63f4553e201c1e04c7d78b83965a249/4.jpg",
                "url": "http://500px.com/photo/30778827"
            },
            {
                "title": "Lincoln Sits",
                "image": "http://pcdn.500px.net/29441403/4ca1270c14c2cfd4b441fbd429169317efbc8fde/4.jpg",
                "url": "http://500px.com/photo/29441403"
            },
            {
                "title": "Union Station at Night",
                "image": "http://pcdn.500px.net/28875529/1e75e2a3c9bffb39bcbc3218a942ef025d3ed061/4.jpg",
                "url": "http://500px.com/photo/28875529"
            }
        ]
    }
]'; // json string

if(array_key_exists('callback', $_GET)){

    header('Content-Type: text/javascript; charset=utf8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Max-Age: 3628800');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

    $callback = $_GET['callback'];
    echo $callback.'('.$data.');';

}else{
    // normal JSON string
    header('Content-Type: application/json; charset=utf8');

    echo $data;
}