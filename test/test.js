const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('D:/SIT725/6.2D/server.js'); 

const should = chai.should();
chai.use(chaiHttp);

describe('CourseSelectionApp', () => {
    /*
     * Tests the /POST route
     */
    describe('/POST submit', () => {
        it('it should POST a course selection', (done) => {
            const course = { unit: 'SIT725' };
            chai.request(server)
                .post('/submit')
                .send(course)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Form submitted successfully');
                    done();
                });
        });

        it('it should not POST a course selection without unit field', (done) => {
            const course = {};
            chai.request(server)
                .post('/submit')
                .send(course)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    /*
     * Tests the /GET health route
     */
    describe('/GET health', () => {
        it('should check if the server is up', (done) => {
            chai.request(server)
                .get('/health')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('ok');
                    done();
                });
        });
    });
});
