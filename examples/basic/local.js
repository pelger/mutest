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
 * local usage single instance of mu
 */

'use strict';

var mu = require('../../core');
var mu1 = mu({logLevel: 0} );


mu1.define({role: 'test', cmd: 'one'}, function(args, cb) {
  mu1.log.info('in one', args);
  cb();
});

mu1.define({role: 'test', cmd: 'two'}, function(args, cb) {
  mu1.log.info('in two', args);
  cb(null, {my: 'response'});
});

mu1.dispatch({role: 'test', cmd: 'one', fish: 'cheese'}, function(err, result) {
  mu1.log.info('in cb');
  mu1.log.info(err);
  mu1.log.info(result);
});

mu1.dispatch({role: 'test', cmd: 'two', fish: 'cheese'}, function(err, result) {
  mu1.log.info('in cb');
  mu1.log.info(err);
  mu1.log.info(result);
});
