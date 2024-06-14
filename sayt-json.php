<?php

$query = isset($_GET['query']) ? htmlspecialchars($_GET['query']) : '';
$callback = isset($_GET['callback']) ? htmlspecialchars($_GET['callback']) : '';

$countries = array("Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe");

$searchresults = preg_grep("/.*".$query.".*/i", $countries);

$searchresults2 = [];
foreach ($searchresults as $value) {
    $searchresults2[]['title'] = $value;
    if (count($searchresults2) == 3) {
        break;
    }
}

$searchresults2count = count($searchresults2);

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
                "url": "https://www.bing.com/search?q='.$query.'"
            },
            {
                "title": "Yahoo Search for '.$query.' (onclick example)",
                "onclick": "alert(\"Example onclick event.\")"
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
                "title": "Drone Shot from LA",
                "image": "https://images.unsplash.com/photo-1570658379397-89d15db1b0de?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "url": "https://unsplash.com/photos/birds-eye-view-photography-of-coconut-trees-under-blue-sky-z2fkN9iVg5Y",
                "description": "A stunning drone shot capturing the beauty of Los Angeles from above."
            },
            {
                "title": "U.S. Capitol",
                "image": "https://images.unsplash.com/photo-1574365379583-54937ea00cb8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "url": "https://unsplash.com/photos/high-rise-buildings-EmSWJzRYxG0"
            },
            {
                "title": "Cherry Blossom Trees",
                "image": "https://images.unsplash.com/photo-1618020298919-50f9d16f67b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "url": "https://unsplash.com/photos/trees-near-body-of-water-during-daytime-6dlG3Te05kQ"
            },
            {
                "title": "Night Road Time-Lapse",
                "image": "https://images.unsplash.com/photo-1625672168318-cb3ceb43ea39?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "url": "https://unsplash.com/photos/time-lapse-photography-of-road-during-night-time-1S9-KoIg4l0"
            },
            {
                "title": "iPhone",
                "image": "https://images.unsplash.com/photo-1633029816532-99d4bc2d9f4e?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "url": "https://unsplash.com/photos/Q38BCLg2RIY"
            }
        ]
    }
]';

header('Content-Type: text/javascript; charset=utf8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Max-Age: 3628800');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
echo $data;
