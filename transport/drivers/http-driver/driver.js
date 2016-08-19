/*
 * THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

var http = require('http');
var EventEmitter = require('events');
var request = require('request');

// TODO - NOT FUNCTIONING - COMPLETE

module.exports = function(options) {
  var emitter = new EventEmitter();
  var connections = {};
  var connectionsByIp = {};



  function receive(cb) {
    emitter.on('receive', cb);
  }



  function send(message, cb) {

    if (!connections[message.protocol.dst]) {
      connections[message.protocol.dst] = 'http://' + options.target.host + ':' + options.target.port + '/';
    }

    request.post({url: connections[message.protocol.dst],
                  method: 'POST',
                  json: message},
                  function(err, httpResponse, body) { 
                    var response;

                    if (err) {
                      emitter.emit('receive', err,  null);
                    }
                    else {
                      err = body.err;
                      response = body.response;
                      emitter.emit('receive', null, response);
                    }
                    cb(err, response);
                  });
  }



  function listen() {
    http.createServer(function(req, res) {
      if (req.method === 'POST') {
        var body = '';

        req.on('data', function (data) {
          body += data;
        });

        req.on('end', function () {
          var msg = JSON.parse(body);

          if (!connections[inbound.protocol.src]) {
            connections[inbound.protocol.src] = c;
            req.connection
            connectionsByIp[c.address + '_' + c.port] = inbound.protocol.src;
          }
          emitter.emit('receive', null, inbound);
          
          if (recieveCb) {
            recieveCb(msg

          cb(msg, function(err, response) {

          });
          //emitter.emit('incoming', msg);
          /* push the message up for routing, but if responding over this channel 
           * need to splice it together with the originator id
           */

          /*
          zeno.act(msg, function(err, result) {
            var response = JSON.stringify({err: err, result: result});
            if (err) {
              res.writeHead(400, {'Content-Length': response.length, 'Content-Type': 'application/json'});
            }
            else {
              res.writeHead(200, {'Content-Length': response.length, 'Content-Type': 'application/json'});
            }
            res.write(response);
            res.end();
          });
          */
        });
      }
    }).listen(options.listen.port, options.listen.address);
  }




  return {
    send: send,
    //response: response,

    receive: receive,
    //respond: respond,
    
    listen: listen,
  };
};


