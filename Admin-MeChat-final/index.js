const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const cors = require('cors');
const app = express();
var session = require('express-session')

const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth-routes');
const homeRoutes = require('./routes/home-routes');
const reportRoutes = require('./routes/report-routes');
const userRoutes = require('./routes/user-routes');
const adminRoutes = require('./routes/admin-routes');

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));

app.use(homeRoutes.routes);
app.use(authRoutes.routes);
app.use(reportRoutes.routes);
app.use(userRoutes.routes);
app.use(adminRoutes.routes);

app.listen(3000, () => console.log('App is listening on url http://localhost:3000'));