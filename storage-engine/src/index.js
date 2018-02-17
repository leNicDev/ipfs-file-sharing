const fastify = require('fastify')();
const cors = require('cors');
const multipart = require('fastify-multipart');

const concat = require('concat-stream');

const ipfs = require('./ipfs');


// Routes
fastify.post('/add', add);
fastify.get('/get/:hash/:filename', get);

// CORS
fastify.use(cors());

// Add multipart support
fastify.register(multipart);

// Start server
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();


// ---------- //
//    IPFS    //
// ---------- //

// Add file
async function add(req, res) {
  res.type('application/json').code(200);

  const mp = req.multipart(handler, (err) => {
    if (err) {
      console.error(`Uploaded failed: ${JSON.stringify(err)}`);
      return;
    }
  });

  function handler (field, file, filename, encoding, mimetype) {
    file.pipe(concat(addToIpfs));
  }

  function addToIpfs(buffer) {
    ipfs.add(buffer).then(afterIpfsAdd);
  }

  function afterIpfsAdd(data) {
    let response = [];

    for (let i = 0; i < data.length; i++) {
      response.push(data[i].hash);
    }

    res.code(200).send(response);
  }
}

// Get file
async function get(req, res) {
  const file = await ipfs.get(req.params.hash);

  res.type('application/octet-stream').code(200);
  res.header('Content-Type', 'application/octet-stream');
  res.header('Content-Disposition', 'attachment;filename=' + req.params.filename);
  res.header('Content-Transfer-Encoding', 'binary');
  res.header('Accept-Ranges', 'bytes');
  res.header('Cache-Control', 'private');
  res.header('Pragma', 'private');
  res.header('Expires', 'Mon, 26 Jul 1997 05:00:00 GMT');
  res.header('Content-Length', file.length);

  res.send(file);
}