pragma solidity >=0.7.0 <0.9.0;

contract Ballot {
    struct Voter {
        uint weight;
        bool voted;
        address delegateVote;
        uint vote;
    }

    struct Proposal {
        bytes32 name;
        uint voteCount;
    }

    address public moderator;

    mapping(address => Voter) public voters;

    Proposal[] public proposals;

    constructor(bytes32[] memory proposalNames) {
        moderator = msg.sender;
        voters[moderator].weight = 1;

        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({name: proposalNames[i], voteCount: 0}));
        }
    }

    function giveRightToVote(address voter) external {
        require(
            msg.sender == moderator,
            "Only the moderator can give right to vote."
        );
        require(!voters[voter].voted, "The voter already voted.");
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

    function delegateVote(address to) external {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "You have no right to vote");
        require(!sender.voted, "You have already voted.");
        require(to != msg.sender, "Self-delegation isn't allowed.");

        while (voters[to].delegateVote != address(0)) {
            to = voters[to].delegateVote;
            require(to != msg.sender, "Delegate looping error.");
        }

        Voter storage delegateVote_ = voters[to];
        require(delegateVote_.weight >= 1);

        sender.voted = true;
        sender.delegateVote = to;

        if (delegateVote_.voted) {
            proposals[delegateVote_.vote].voteCount += sender.weight;
        } else {
            delegateVote_.weight += sender.weight;
        }
    }

    function vote(uint proposal) external {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposal;
        proposals[proposal].voteCount += sender.weight;
    }

    function winningProposal() public view returns (uint winningProposal_) {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function getWinningProposal()
        external
        view
        returns (bytes32 winningProposal_)
    {
        winningProposal_ = proposals[winningProposal()].name;
    }
}
