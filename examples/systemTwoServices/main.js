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

var mu = require('../../lib/core')();


mu.define({role: 's1'}, mu.tcp({target: {port: 3001, host: '127.0.0.1'}}));
mu.define({role: 's2'}, mu.tcp({target: {port: 3002, host: '127.0.0.1'}}));
// no default route


mu.dispatch({role: 's1', cmd: 'one', fish: 'cheese'}, function(err, result) {
  console.log('in cb');
  console.log(err);
  console.log(result);
  mu.dispatch({role: 's2', cmd: 'two', fish: 'cheese'}, function(err, result) {
    console.log('in cb');
    console.log(result);
    mu.dispatch({role: 'wibble', cmd: 'fish', fish: 'cheese'}, function(err, result) {
      console.log(err);
      console.log(result);
    });
  });
});

