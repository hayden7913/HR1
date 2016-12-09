const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

let server = require('../server');
/*// create server afresh before each test in this module
beforeEach(function() {
  server = require('../server');
});

// tear down server between each test in this module
afterEach(function() {
  server.close();
});*/

describe('Shopping List', function() {

  it('should list items on GET', function(done) {
    chai.request(server)
      .get('/getData')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');

        // because we create three items on app load
        res.body.length.should.be.at.least(1);
        // each item should be an object with key/value pairs
        // for `id`, `name` and `checked`.
        /*const expectedKeys = ['id', 'name', 'checked'];
        res.body.forEach(function(item) {
          item.should.be.a('object');
          item.should.include.keys(expectedKeys);
        });*/
        done();
 		});
      });
   });
 




/*const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

let server = require('../server');

// create server afresh before each test in this module
beforeEach(function() {
  server = require('../server');
});

// tear down server between each test in this module
afterEach(function() {
  server.close();
});

describe('HR', () => {
	it('should display database contents', (done) => {
		chai.request(server)
			.get('/getData')
			.end((err, res) => {
				res.should.have.status(200);
				 res.body.should.be.a('array');
			        res.body.length.should.be.at.least(1);
			        const expectedKeys = ['name', 'city', 'category'];
			       
			        res.body.forEach(function(item) {
			          item.should.be.a('object');
			          item.should.include.keys(expectedKeys);
			        });

			done();
			});

	});
});*/