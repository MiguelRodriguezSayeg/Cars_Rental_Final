<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
    	<!-- Required meta tags -->
    	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    	<!-- Bootstrap CSS -->
    	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
		<meta charset="utf-8"></meta>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <style type="text/css">
      body {
          background-image: url('https://www.drivingtelevision.com/wp-content/uploads/2014/05/driving-television-car-review-ad-background-home.png');
          z-index: -100;
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        html {
            height: 100%
        }
    </style>
    </head>
    <body>
    <div id="navbar"></div>
    <script src="{{asset('js/app.js')}}" ></script>
    <form method="POST" action="http://localhost:8000/rental/my_status/">
      <div id="reservationform"></div>
      <script src="{{asset('js/app.js')}}" ></script>
    </form>
    </body>
</html>
