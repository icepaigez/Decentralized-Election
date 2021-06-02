// const Election = artifacts.require("./Election.sol");

// contract("Election", (accounts) => {
// 	let election;

// 	before(async () => {
// 		election = await Election.deployed();
// 	});

// 	describe("Contract is initialized with 3 candidates", async() => {
// 		it("should return 3 candidates", async() => {
// 			let count = await election.candidateCount()
// 			assert.equal(count, 3);
// 		})
// 	})

// 	describe("Confirm the candidate name", async() => {
// 		it("should return the name of a test candidate", async() => {
// 			let testCandidate = await election.candidates(1)
// 			assert.equal(testCandidate['name'], "Kanye West 001");
// 		})
// 	})

// 	describe("voteCandidate() should increase vote count ", async() => {
// 		it("should increase the vote count of test candidate by 1", async() => {
// 			await election.voteCandidate("1", "voter1", { from:accounts[0] });
// 			let testCandidate = await election.candidates(1)
// 			assert.equal(testCandidate['voteCount'], 1);
// 		})
// 	})

// 	describe("Prevent multiple votes by same account", async() => {
// 		it("should throw an error when an account calls voteCandidate() more than once", async() => {
// 			let voter = await election.voterRegistry("voter1");
// 			let allVoters = await election.voters();
// 			expect()
// 		})
// 	})
// })