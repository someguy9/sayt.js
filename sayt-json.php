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
                "url": "http://drawne.com"
            }
        ]
    },
    {
        "section": {
            "title": "Friends",
            "num": "0",
            "limit": "3"
        },
        "data": [
            {
                "title": "",
                "image": "",
                "url": ""
            },
            {
                "title": "",
                "image": "",
                "url": ""
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
                "title": "Lake Artemesia",
                "image": "",
                "url": ""
            },
            {
                "title": "",
                "image": "",
                "url": ""
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