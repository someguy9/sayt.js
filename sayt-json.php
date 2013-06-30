<?php

$query = htmlspecialchars($_GET['query']);
$callback = htmlspecialchars($_GET['callback']);

$countries = array("Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe");
 
$searchresults = preg_grep("/.*".$query.".*/i",$countries);

$i = 0;
while (list($key, $value) = each($searchresults)) {
	$i++;
	$searchresults2[]['title'] = $value;
	
	if($i == 3 ){break;};
}
$searchresults2count = 0;
$searchresults2count = count($searchresults);
if($searchresults2count == 0){$searchresults2 = array();};

$data = '[
    {
        "section": {
            "title": "Countries (dynamic)",
            "num": "'.$searchresults2count.'",
            "limit": "3"
        },
        "data": '.json_encode($searchresults2).'
    },
    {
        "section": {
            "title": "Search Engines (semi dynamic)",
            "num": "3",
            "limit": "3"
        },
        "data": [
            {
                "title": "Google Search for '.$query.'",
                "url": "https://www.google.com/#q='.$query.'&fp=1",
                "description": "Open a google search for this term"
            },
            {
                "title": "Bing Search for '.$query.'",
                "url": "http://www.bing.com/search?q='.$query.'"
            },
            {
                "title": "Yahoo Search for '.$query.' (onclick example)",
                "onclick": "alert(\"Why would you want to Yahoo '.$query.'?\")"
            }
        ]
    },
    {
        "section": {
            "title": "Photos (static example)",
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

    $callback = $callback;
    echo $callback.'('.$data.');';

}else{
    // normal JSON string
    header('Content-Type: application/json; charset=utf8');

    echo $data;
}