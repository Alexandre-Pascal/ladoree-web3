// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LoyaltyProgram is Ownable {
    IERC20 public ldrToken; // Token LDR ERC-20
    uint256 public monthlyReward = 10 * 10 ** 18; // 10 LDR (en utilisant 18 décimales pour le token)

    struct Member {
        uint256 lastClaimedTimestamp; // Dernière fois que le membre a réclamé ses tokens
        uint256 totalClaimed; // Total des tokens réclamés par ce membre
    }

    mapping(address => Member) public members;

    event MemberRegistered(address indexed member);
    event RewardClaimed(address indexed member, uint256 amount);

    // Constructeur : initialisation du token LDR
    constructor(address _ldrTokenAddress) Ownable(msg.sender) {
        ldrToken = IERC20(_ldrTokenAddress);
    }

    // Fonction pour inscrire un membre dans le programme de fidélité
    function registerMember() public {
        require(
            members[msg.sender].lastClaimedTimestamp == 0,
            "Deja inscrit !"
        );

        members[msg.sender] = Member({
            lastClaimedTimestamp: block.timestamp,
            totalClaimed: 0
        });

        emit MemberRegistered(msg.sender);
    }

    // Fonction pour récupérer la récompense mensuelle
    function claimReward() public {
        require(
            members[msg.sender].lastClaimedTimestamp != 0,
            "Membre non inscrit"
        );

        // Vérifier que le mois est écoulé depuis la dernière réclamation
        require(
            block.timestamp >=
                members[msg.sender].lastClaimedTimestamp + 30 days,
            "Recompense deja reclamee ce mois-ci"
        );

        // Mise à jour de la dernière réclamation
        members[msg.sender].lastClaimedTimestamp = block.timestamp;

        // Transfert des tokens
        require(
            ldrToken.balanceOf(address(this)) >= monthlyReward,
            "Fonds insuffisants dans le contrat"
        );
        ldrToken.transfer(msg.sender, monthlyReward);

        members[msg.sender].totalClaimed += monthlyReward;

        emit RewardClaimed(msg.sender, monthlyReward);
    }

    // Fonction pour vérifier le solde des tokens du contrat (utilisé par l'administrateur)
    function checkContractBalance() public view onlyOwner returns (uint256) {
        return ldrToken.balanceOf(address(this));
    }

    // Fonction pour transférer des tokens au contrat (par l'administrateur)
    function fundContract(uint256 amount) public onlyOwner {
        ldrToken.transferFrom(msg.sender, address(this), amount);
    }
}
