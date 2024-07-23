"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mysql2_1 = __importDefault(require("mysql2"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express_1.default.static(`${__dirname}/app/`));
const access = {
    host: process.env.dbhost,
    user: process.env.dbuser,
    password: process.env.dbpass,
    database: process.env.dbname,
    port: Number(process.env.dbport)
};
const connection = mysql2_1.default.createConnection(access);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
// Define a route to handle incoming requests
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello, Express!');
// });
// Read (GET) all items
app.get('/items/:start/:end', (req, res) => {
    let start_date = req.params.start;
    let end_date = req.params.end;
    connection.connect(function (error) {
        if (error)
            throw error;
        const query = "SELECT * FROM Bills WHERE Date >= ? AND Date <= ? ORDER BY Date;";
        const args = [start_date, end_date];
        connection.query(query, args, (error, result) => {
            if (error) {
                console.error('Error querying: ', error);
                return;
            }
            res.json(result);
        });
    });
});
app.put('/addItem', (req, res) => {
    connection.connect(function (error) {
        if (error) {
            console.error('Error creating connection: ', error);
            return;
        }
        const query = "INSERT INTO Bills (`Description`, `Amount`, `PaymentType`, `Date`) VALUES ( ? , ? , ? , ? );";
        const args = [req.body.description, req.body.amount, req.body.type, req.body.date];
        connection.query(query, args, (error, result) => {
            if (error) {
                console.error('Error querying: ', error);
                return;
            }
            res.json(result);
        });
    });
});
app.use('*', (_req, res) => {
    res.sendFile(`${__dirname}/app/index.html`);
});
