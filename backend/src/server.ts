import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mysql, { ConnectionOptions, ResultSetHeader, RowDataPacket } from 'mysql2';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000; 

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(`${__dirname}/app/`));

const access: ConnectionOptions = {
  host: process.env.dbhost,
  user: process.env.dbuser,
  password: process.env.dbpass,
  database: process.env.dbname,
  port: Number(process.env.dbport)
};

const connection = mysql.createConnection(access);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


// Read (GET) all items
app.get('/items/:start/:end', (req: Request, res:Response) => {

  let start_date = req.params.start;
  let end_date = req.params.end;

  connection.connect((error) => {

      if(error) 
      {
        console.error('Error querying: ', error);
        return;
      }
      
      const query = "SELECT * FROM Bills WHERE Date >= ? AND Date <= ? ORDER BY Date;";
      const args: String[] = [start_date, end_date];

      connection.query<RowDataPacket[]>(query, args, (error, result) => {
          if(error) 
          {
            console.error('Error querying: ', error);
            return;
          }

          res.json(result);
      });
  });
});

app.put('/addItem', (req: Request, res: Response) => {

  connection.connect((error) => {
      if(error) 
      {
        console.error('Error creating connection: ', error);
        return;
      }

      const query = "INSERT INTO Bills (`Description`, `Amount`, `PaymentType`, `Date`) VALUES ( ? , ? , ? , ? );";
      const args: String[] = [req.body.description, req.body.amount, req.body.type, req.body.date];
      
      connection.query<ResultSetHeader>(query, args, (error, result) => {
          if(error) 
          {
            console.error('Error querying: ', error);
            return;
          }

          res.json(result);
      });
  });

});