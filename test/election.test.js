const Election = artifacts.require("./Election.sol");

contract("Election", (accounts) => {
	let election;

	before(async () => {
		election = await Election.deployed();
	});

	describe("Contract is initialized with 3 candidates", async() => {
		it("should return 3 candidates", async() => {
			let count = await election.candidateCount()
			assert.equal(count, 3);
		})
	})

	describe("Confirm the candidate name", async() => {
		it("should return the data [name, id, voteCount] of a test candidate", async() => {
			let testCandidate = await election.candidates(1)
			assert.equal(testCandidate['name'], "Kanye West");
			assert.equal(testCandidate['id'], 1); 
			assert.equal(testCandidate['voteCount'], 0);
		})
	})

	describe("voteCandidate() ", async() => {

		it("should increase the vote count of test candidate by 1", async() => {
			await election.voteCandidate(1, { from:accounts[0] });
			let testCandidate = await election.candidates(1);
			let voterAddress = accounts[0];
			let voted = await election.voterRegistry(voterAddress)
			assert.equal(testCandidate['voteCount'], 1);
			assert.equal(voted, true);
		})

		it("should prevent double voting by a single account", async() => {
			try {
				await election.voteCandidate(1, { from:accounts[0] });
				await election.voteCandidate(2, { from:accounts[0] });
			} catch (error) {
				assert(error.message.indexOf('revert') >= 0, "error must contain revert")

				let voted = await election.voterRegistry(accounts[0])
				assert.equal(voted, true);

				let testCandidate = await election.candidates(1);
				let testCandidate2 = await election.candidates(2);
				let testCandidate3 = await election.candidates(3);
				assert.equal(testCandidate['voteCount'].toString(), '1');
				assert.equal(testCandidate2['voteCount'].toString(), '0');
				assert.equal(testCandidate3['voteCount'].toString(), '0');
			}
		})

		it("should throw an exception for an invalid candidate", async() => {
			try {
				let result = await election.voteCandidate(99, { from:accounts[6] });
			} catch (error) {
				assert(error.message.indexOf('revert') >= 0, "error must contain revert")
				let testCandidate = await election.candidates(1);
				let testCandidate2 = await election.candidates(2);
				let testCandidate3 = await election.candidates(3);
				assert.equal(testCandidate['voteCount'].toString(), '1');
				assert.equal(testCandidate2['voteCount'].toString(), '0');
				assert.equal(testCandidate3['voteCount'].toString(), '0');

				let voted = await election.voterRegistry(accounts[6])
				assert.equal(voted, false);
			}
		})
	}) 
})