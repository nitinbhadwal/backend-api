let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("./server");

//assertion style
const { expect } = chai;

chai.use(chaiHttp);

describe("GET COLOURS CODE DATA", () => {
  it("GET api", (done) => {
    chai
      .request(server)
      .get("/v1/colours-code")
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body.response).to.be.an("array");
        expect(res.body.responseMessage).to.deep.equals("success");
        expect(res.body.total).to.deep.equals(32768);
        done();
      });
  });
});
