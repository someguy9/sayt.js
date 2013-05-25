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
                "title": "'.$_GET['query'].'",
                "image": "",
                "url": ""
            },
            {
                "title": "'.$_GET['query'].'",
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
                "image": "http://snap.ihitthebutton.com/wp-content/uploads/2013/05/National-Cathedral-980x653.jpg",
                "url": "http://ihitthebutton.com"
            },
            {
                "title": "Church",
                "image": "http://snap.ihitthebutton.com/wp-content/uploads/2013/05/National-Cathedral-980x653.jpg",
                "url": "http://ihitthebutton.com"
            },
            {
                "title": "House on Hill",
                "image": "http://snap.ihitthebutton.com/wp-content/uploads/2013/05/National-Cathedral-980x653.jpg",
                "url": "http://ihitthebutton.com"
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