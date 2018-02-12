const fs = require('fs');
const path = require('path');
const IPFSFactory = require('ipfsd-ctl');
const f = IPFSFactory.create({ type: 'go' });

let daemon;

// Spawn daemon
f.spawn((err, ipfsd) => {
    if (err) {
        throw err;
    }

    ipfsd.api.id((err, id) => {
        if (err) {
            throw err;
        }

        daemon = ipfsd;

        console.log('Successfully started IPFS node!');
        console.debug(`Node ID: ${JSON.stringify(id)}`);
    });
});

/**
 * Upload a file to the IPFS
 * @param {ReadableStream} stream 
 */
async function add(stream) {
    let promise = await new Promise((resolve, reject) => {
        daemon.api.add(stream, {}, (err, result) => {
            if (err) {
                throw err;
            }

            resolve(result);
        });
    })
    .catch(err => { throw err });

    return promise;
}

/**
 * Get files using an ipfs path
 * @param {String} path 
 */
async function get(path) {
    let promise = await new Promise((resolve, reject) => {
        daemon.api.get(path, (err, files) => {
            if (err) {
                throw err;
            }

            resolve(files[0].content);
        });
    });

    return promise;
}

module.exports = { add, get };