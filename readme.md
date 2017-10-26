## react-simple-read-more

to install:
```
npm install --save react-simple-read-more
```

how to use it:
*   first import it to your file
```
import StringParser from 'react-simple-read-more';
```
* pass your string as a props to library
```
<StringParser text={--your string here--} breakOn='3' charLimit="250"/>
{breakOn=> number of line form which u want to break your string}
{charLimit=> charLimit per line, If no value is given than by default it will take 200 characters per line}
```
and that's it. :D

Compiled jsx using bable:
https://babeljs.io/repl/
