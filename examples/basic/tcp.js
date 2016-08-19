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

var mu_ = require('../../core/lib/core');
var transport_ = require('../../transport');



// service
var mu1 = mu_({logLevel: mu_.log.levelInfo});
var mu1t = transport_(mu1);

mu1.define({role: 'test', cmd: 'one'}, function(args, cb) {
  mu1.log.info('in one');
  cb();
});

mu1.define({role: 'test', cmd: 'two'}, function(args, cb) {
  mu1.log.info('in two');
  cb(null, {my: 'response'});
});

mu1.define('*', mu1t.tcp({source: {port: 3001, host: '127.0.0.1'}}));



// consumer
var mu2 = mu_({logLevel: mu_.log.levelDebug});
var mu2t = transport_(mu2);

mu2.define('*', mu2t.tcp({target: {port: 3001, host: '127.0.0.1'}}));

mu2.dispatch({role: 'test', cmd: 'one', fish: 'cheese'}, function(err, result) {
  mu2.log.debug('in cb ONE');
  mu2.dispatch({role: 'test', cmd: 'two', fish: 'cheese'}, function(err, result) {
    mu2.log.debug('in cb TWO');
  });
});

