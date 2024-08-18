// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract SimpleStorage {
    uint256 favNumber; //automatically cast to be a 'storage' variable

    mapping(string => uint256) public nametoFavNum; //string name is being mapped to the uint256 favNumber

    //People public person1 = People({favNumber: 4, name: "Nabeel"});

    People[] public people;

    struct People {
        uint256 favNumber;
        string name;
    }

    function store(uint256 _favNum) public virtual {
        favNumber = _favNum;
        //_favNum++;
        //retrieve();
    }

    function retrieve() public view returns (uint256) {
        return favNumber;
    }

    function addPerson(string memory _name, uint256 _favNum) public {
        /*People memory personNew = People(_favNum, _name);
        people.push(personNew);*/ //1st way of doing the following task
        //people.push(People(_favNum, _name)); //2nd way of doing the following task
        People memory personNew = People({favNumber: _favNum, name: _name}); //3rd way of doing the following task
        people.push(personNew);
        nametoFavNum[_name] = _favNum; //adding people's names and their fav number to our mapping
    }
}
