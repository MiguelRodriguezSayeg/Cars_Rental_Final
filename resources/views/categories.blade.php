<!doctype html>

<html lang="{{ app()->getLocale() }}">
    <head>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
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
    <form method="POST" action="http://localhost:8000/rental/cars/">
        <div id="displayer" categories="{{ $categories }}"></div>
        <input type="hidden" name="origin" id="origin" value="{{ $reservation['origin'] }}" />
        <input type="hidden" name="destiny" id="destiny" value="{{ $reservation['destiny'] }}" />
        <input type="hidden" name="reservation" id="reservation" value="{{ $reservation['reservation'] }}" />
        <input type="hidden" name="return" id="return" value="{{ $reservation['return'] }}" />
    </form>
    </body>
    <script src="{{asset('js/app.js')}}" ></script>
</html>
