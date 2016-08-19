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
/*
 * separate mu instances using TCP socket
 */

'use strict';

var mu_ = require('../../lib/core');


// service 1 ----------------------------------------------------------------

var mu1 = mu_();

mu1.define({role: 'test', cmd: 'one'}, function(args, cb) {
  console.log('in one');
  cb();
});

mu1.define({role: 'test', cmd: 'two'}, function(args, cb) {
  console.log('SERVICE 1');
  cb(null, {my: 'response'});
});

mu1.define('*', mu1.tcp({source: {port: 3001, host: '127.0.0.1'}}));
      

// service 2 ----------------------------------------------------------------

var mu2 = mu_();

mu2.define({role: 'test', cmd: 'one'}, function(args, cb) {
  console.log('in one');
  cb();
});

mu2.define({role: 'test', cmd: 'two'}, function(args, cb) {
  console.log('SERVICE 2');
  cb(null, {my: 'response'});
});

mu2.define('*', mu2.tcp({source: {port: 3002, host: '127.0.0.1'}}));


// consumer -------------------------------------------

var mu = mu_();


//transport(mu, tcpDriver(options));
mu.define({role: 'test'}, mu.balance([mu.tcp({target: {port: 3001, host: '127.0.0.1'}}),
                                      mu.tcp({target: {port: 3002, host: '127.0.0.1'}})]));

for (var idx = 0; idx < 20; idx++) {
  console.log('dispatching');
  mu.dispatch({role: 'test', cmd: 'two', fish: 'cheese'}, function(err, result) {
    console.log('BACK');
  });
}

/*
mu.dispatch({role: 'test', cmd: 'two', fish: 'cheese'}, function(err, result) {
  mu.dispatch({role: 'test', cmd: 'two', fish: 'cheese'}, function(err, result) {
    mu.dispatch({role: 'test', cmd: 'two', fish: 'cheese'}, function(err, result) {
      mu.dispatch({role: 'test', cmd: 'two', fish: 'cheese'}, function(err, result) {
        console.log('DONE!');
      });
    });
  });
});
*/

