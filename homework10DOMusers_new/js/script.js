document.addEventListener('DOMContentLoaded', onHtmlLoad);
function onHtmlLoad(){
    var users = [{
        name: {
            firstName: 'Ana',
            lastName: 'Pop'
        },
        age: 25,
        cnp: '12345',
        address: {
            street: 'Muzicii',
            number: 123
        },
        parents: [{
            name: 'Clementina Pop',
            age: 50
        },
        {
            name: 'George Pop',
            age: 50}
        ]
        },
        {
            name: {
            firstName: 'Cristina',
            lastName: 'Dumitru'
        },
            age: 15,
            cnp: '12345',
        address: {
            street: 'Donath',
            number: 123
        },
        parents: [{
            name: 'Ana Dumitru',
            age: 40
            },
            {
            name: 'Ion Dumitru',
            age: 45
        }
        ]
    }];
    // console.log(users);
    var list = document.getElementById('main-content');
    //Function for inserting a section from an array
    function insertUsersFromArray(arrName, list){
        //console.log(list);
        for (var i = 0; i < arrName.length; i++) {
            var items = document.createElement('section');
            items.innerHTML = "<div>Name: " + arrName[i].name.firstName + ' ' + arrName[i].name.lastName +
            '</div><div>Age: ' + arrName[i].age + '</div><div>CNP: ' + arrName[i].cnp + '</div><div>Address: ' +  arrName[i].address.number + ' ' + 
            arrName[i].address.street + '</div><div>Parents:</div>';
            list.appendChild(items);
            var parentsChild = items.lastChild;
            parentsChild.className = "parents-class";
            for (var j = 0; j < arrName[i].parents.length; j++) {
                var subItem = document.createElement('p');
                subItem.innerHTML =  arrName[i].parents[j].name + ' Age: ' + arrName[i].parents[j].age;
                parentsChild.appendChild(subItem);
            }
           //console.log(items);
        }
    }
    //Function for deleting an user
    function removeUserList(list, item) {
        var toRemove = document.getElementsByTagName('section');
        list.removeChild(toRemove.item(item));
    }
    
    insertUsersFromArray(users, list);
    insertUsersFromArray(users, list);
    insertUsersFromArray(users, list);
    insertUsersFromArray(users, list);
    var itemToRemove = 0; //Which number of section we want to remove eg. first
    removeUserList(list, itemToRemove);
}