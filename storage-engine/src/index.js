const logger = require('koa-logger');
const koaBody = require('koa-body');
const router = require('koa-router')();
const Koa = require('koa');
const app = new Koa();

const fs = require('fs');
const os = require('os');
const path = require('path');

const ipfs = require('./ipfs');


// log requests
app.use(logger());

// Parse body
app.use(koaBody({ multipart: true }));

// Routes
router
  .post('/add', add)
  .get('/get/:hash/:filename', get);

// Register routes
app.use(router.routes());

// Start server
app.listen(3000);
console.log('listening on port 3000');


// ---------- //
//    IPFS    //
// ---------- //

// Add file
async function add(ctx) {
  const files = ctx.request.body.files;

  for (key in files) {
    const file = files[key];

    const reader = fs.createReadStream(file.path);

    const result = await ipfs.add(reader);

    ctx.body = result;
  }
}

// Get file
async function get(ctx) {
  console.log('Ctx: ' + JSON.stringify(ctx));

  const file = await ipfs.get(ctx.params.hash);

  ctx.set('Content-Type', 'application/octet-stream');
  ctx.set('Content-Disposition', 'attachment;filename=' + ctx.params.filename);
  ctx.set('Content-Transfer-Encoding', 'binary');
  ctx.set('Accept-Ranges', 'bytes');
  ctx.set('Cache-Control', 'private');
  ctx.set('Pragma', 'private');
  ctx.set('Expires', 'Mon, 26 Jul 1997 05:00:00 GMT');
  ctx.set('Content-Length', file.length);

  ctx.body = file;
}