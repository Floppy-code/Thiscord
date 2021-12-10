const express = require('express');
const bodyParser = require('body-parser')
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

const oracledb = require('oracledb');
oracledb.autoCommit = true;

const { stringify } = require('querystring');
const { BIND_OUT } = require('oracledb');
const config = {
    user: 'system',
    password: 'admin',
    connectString: '192.168.1.22:1521/xe'
}

app.use(express.json());
app.use(fileUpload({createParentPath: true}));

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));


async function getSelect (query) {
  let conn;

  try {
    conn = await oracledb.getConnection(config);
    const result = await conn.execute(query);

    return result;

  } catch (err) {
    console.log('Ouch! DB Query failed!', err)
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
}

// ====================== SELECT ==========================

//SERVERS FROM ID
//Get all available servers for this userID
app.post('/servers_for_userID', (req, res) => {
  let body = req.body;
  let query = 'select server_id, servers.name from users_ join user_servers using(user_id) join servers using(server_ID) where user_id = ' + body.userID + '';

  const response = getSelect(query);
  response.then(data => res.send({ query : data.rows }));
});

//CHANNELS FROM ID
//Get server name and all available channels for this user
app.post('/channels_for_serverID', (req, res) => {
  let body = req.body;
  let query = 'select servers.name, channel_id, channels.name from channels \
                join servers using(server_id) \
                join user_servers using(server_id) \
                where user_id = ' +  body.userID + ' and server_id = ' + body.serverID + '';
                //where user_id = 8 and channels.access_level < user_servers.access_level and server_id = 5;' After access_levels are fixed

  const response = getSelect(query);
  response.then(data => res.send({ query : data.rows }));
});

//MESSAGES FOR CHANNEL
//Get messages for channel with certain ID
app.post('/messages_for_channelID', (req, res) => {
  let body = req.body;
  let query = 'select message_id, sender_id, us.avatar, us.name, date_sent, me.text from messages me \
                join users_ us on(us.user_id = me.sender_id) \
                join channels ch on(ch.channel_id = me.channel_id) \
                where ch.channel_id = ' + body.channelID + '';

  const response = getSelect(query);
  //response.then(data => console.log( { data : data.rows } ));
  response.then(data => res.send({ query : data.rows }));
});

//SERVER NAME FROM ID
//Get server name from id
app.post('/server_name_from_ID', (req, res) => {
  let body = req.body;
  let query = 'select servers.name from servers \
                where server_id = ' + body.serverID + '';

  const response = getSelect(query);
  response.then(data => res.send({ query : data.rows[0] }));
});

//CHANNEL NAME FROM ID
//Get channel name from id
app.post('/channel_name_from_ID', (req, res) => {
  let body = req.body;
  let query = 'select channels.name from channels \
                where channel_id = ' + body.channelID + '';

  const response = getSelect(query);
  response.then(data => res.send({ query : data.rows[0] }));
});

// ====================== INSERT ==========================
app.post('/channel_send_message', (req, res) => {
  let body = req.body;
  let query = 'insert into messages(sender_id, private_chat_id, channel_id, date_sent, text) values(' + body.userID + ',' + null + ',' + body.channelID + ', sysdate, \'' + body.text + '\')';

  const response = getSelect(query);
  response.then(res.send({query : 'success'}));
});

// ====================== DELETE ==========================


//==============================================================
app.post("/create_server", (req, res) => {
    console.log(req.body);
    if (!req.files) {
       return res.status(400).send("No files were uploaded.");
    }
    //Get file
    const file = req.files.myFile;
    const path = __dirname + "/temp_files/" + file.name;

    //Save file to path
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.send({ status: "success", path: path });
    });

    //
});

//Testing POST route
app.post('/post_test', (req, response) => {

  response.send({ express: "POST RECEIVED"});
});

app.get('/get', (req, response) => {
  console.log(req.body);
  response.send({ express: "POST RECEIVED"});
});