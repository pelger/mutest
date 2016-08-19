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

var mu = require('../../lib/core');
var funcDriver = require('../../func-driver/driver');
var transport = require('../../lib/transport');


// service ----------------------------------------------------------------

var mu1 = mu();

mu1.define({role: 'test', cmd: 'one'}, function(args, cb) {
  console.log('in one');
  cb();
});

mu1.define({role: 'test', cmd: 'two'}, function(args, cb) {
  console.log('in two', args);
  cb(null, {my: 'response'});
});

var m1Driver = funcDriver(mu1);
mu1.define('*', transport(mu1, m1Driver));


// consumer -------------------------------------------

var mu2 = mu();

var m2Driver = funcDriver(mu2);
m1Driver.setTarget(m2Driver);
m2Driver.setTarget(m1Driver);

mu2.define('*', transport(mu2, m2Driver));

mu2.dispatch({role: 'test', cmd: 'one', fish: 'cheese'}, function(err, result) {
  console.log('in cb');
  console.log(err);
  console.log(result);
  mu2.dispatch({role: 'test', cmd: 'two', fish: 'cheese'}, function(err, result) {
    console.log('in cb');
    console.log(result);
  });
});


