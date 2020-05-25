# Fullstack evaluation template

## How to use
The files included in this repository are here to get you started by giving
you an idea on how you might start the project.

To start the server open a terminal window on unix/linux based systems and change
directory to the project root. Then execute this command:

```
  ./server
```

The command assumes you have a PHP binary in your system path. If you don't you
will get an error and the server will not start.

After starting the server go to:

```
http://localhost:8765/index.html  
```

If you setup the http server differently, please provide direction on how to start it
in your submitted project's readme file.

## Learnings and Future Directions

I really enjoyed doing this project. In the future, I would like to break the app file up into manageable chunks. I think there is way too much code in the app file.

I would also like to add tests to the application-- specifically integration tests. Tests would make it a lot easier to prove that the code meets the acceptance criteria.

Through doing this project, I got to explore a lot of resources about PHP. Sources are listed below.

There is a warning about keys that remains in the app. This, while not causing any harm to the running of the app, is still something I would like to tackle.

## Choices

In the interest of having a nice layout, while also keeping the app simple, I chose to use materialize for styling. 

I intended to try out using webpack, but chose not to for the same reason.

I chose to use fetch() because I wanted the function to return even if the status was not 200 for sake of ease of error reporting.

## Sources

[PHP Documentation](https://www.php.net/manual/en/)

[Materialize CSS Documentation](https://materializecss.com/)

[React JS Documentation](https://reactjs.org/)

[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

[Rest Countries API](https://restcountries.eu/)
