const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const oracledb = require('oracledb');
const config = {
    user: 'system',
    password: 'admin',
    connectString: '192.168.1.22:1521/xe'
}

async function getTestingData (id) {
  let conn;

  try {
    conn = await oracledb.getConnection(config);
    const result = await conn.execute(
      'select * from testing where id = :id', [id]
    );

    console.log(result.rows[0]);

  } catch (err) {
    console.log('Ouch! DB Query failed!', err)
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
}


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/testing_table', (request, response) => {
  getTestingData(1);
  response.send({ express: 'YOU CAME TO THE WRONG HOUSE FOOL!'});
})