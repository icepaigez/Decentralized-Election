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
	mapping (address => bool) public voterRegistry;

	constructor() public {
		_addCandidate("Kanye West 001");
		_addCandidate("Dwayne Johnson 002");
		_addCandidate("Denzel Washington 003");
	}

	modifier singleVote() {
		require(voterRegistry[msg.sender] == false);
		_;
	}

	function _addCandidate(string memory _name) private {
		candidateCount++;
		candidates[candidateCount] = Candidate(candidateCount, _name, 0);
	}

	function voteCandidate(uint _candidateId) public singleVote {
		candidates[_candidateId].voteCount++;
		voterRegistry[msg.sender] = true;
	}
} 