pragma solidity ^0.5.0;

contract Election {
	struct Candidate {
		uint id;
		string name;
		uint voteCount;
	}

	uint public candidateCount;
	mapping (uint => Candidate) public candidates;

	//prevent double votes - voter register
	mapping (string => address) public voterRegistry;
	address[] public voters;

	constructor() public {
		_addCandidate("Kanye West 001");
		_addCandidate("Dwayne Johnson 002");
		_addCandidate("Denzel Washington 003");
	}

	modifier singleVote(string memory _voterName) {
		require(msg.sender != voterRegistry[_voterName]);
		_;
	}

	function _addCandidate(string memory _name) private {
		candidateCount++;
		candidates[candidateCount] = Candidate(candidateCount, _name, 0);
	}

	function voteCandidate(uint _candidateId, string memory _voterName) public singleVote(_voterName) {
		candidates[_candidateId].voteCount++;
		voterRegistry[_voterName] = msg.sender;
		voters.push(msg.sender);
	}
}