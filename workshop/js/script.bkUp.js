$(document).ready(onHTMLLoaded);


    var team = [
        {
            name: 'Anca Balc',
            occupation: 'dev',
            email: 'abalc@gmail.com'
        },
        {
            name: 'Mihai Muresan',
            occupation: 'ing',
            email: 'tzjbe69@gmail.com'
        },
        {
            name: 'Anca Balc',
            occupation: 'dev',
            email: 'abalc@gmail.com'
        },
        {
            name: 'Mihai Muresan',
            occupation: 'ing',
            email: 'tzjbe69@gmail.com'
        },
        {
            name: 'Anca Balc',
            occupation: 'dev',
            email: 'abalc@gmail.com'
        },
        {
            name: 'Mihai Muresan',
            occupation: 'ing',
            email: 'tzjbe69@gmail.com'
        },
        {
            name: 'Anca Balc',
            occupation: 'dev',
            email: 'abalc@gmail.com'
        },
        {
            name: 'Mihai Muresan',
            occupation: 'ing',
            email: 'tzjbe69@gmail.com'
        },
        {
            name: 'Anca Balc',
            occupation: 'dev',
            email: 'abalc@gmail.com'
        },
        {
            name: 'Mihai Muresan',
            occupation: 'ing',
            email: 'tzjbe69@gmail.com'
        },
        {
            name: 'Anca Balc',
            occupation: 'dev',
            email: 'abalc@gmail.com'
        },
        {
            name: 'Mihai Muresan',
            occupation: 'ing',
            email: 'tzjbe69@gmail.com'
        },
        {
            name: 'Anca Balc',
            occupation: 'dev',
            email: 'abalc@gmail.com'
        },
        {
            name: 'Anca Balc',
            occupation: 'dev',
            email: 'abalc@gmail.com'
        },
        {
            name: 'Anca Balc',
            occupation: 'dev',
            email: 'abalc@gmail.com'
        }
    ];
function onHTMLLoaded() {
    var containerList = $('#team-list');
    var pageNumber = 0;
    for (var i = 0; i < team.length; i++) {
        var member = team[i];
        // var itemsOnPage = 4;
        // if((i - itemsOnPage) % itemsOnPage === 0) {
        //     pageNumber++;
        //     console.log("You are on page",pageNumber);
        //     var pageList = $('#pagination');
        //     var pageItem = '<div class="number-of-page">' + pageNumber + '</div>';
        //     //var pageItem = '<a href="#page' + pageNumber + '">' + pageNumber + '</a>';
        //     pageList.append(pageItem);
        // }
        addMember(member.name, member.occupation, member.email);
        // var htmlItem = '<div class="team-item #page' + pageNumber + '">' +
        //                     '<div>' + member.name + '</div>' + 
        //                     '<div>' + member.occupation + '</div>' + 
        //                     '<div>' + member.email + '</div>' + 
        //                     '<div><button>Edit</button><button>Delete</button></div>' + 
        //                 '</div>';
        // containerList.append(htmlItem);
        // //var a = '.pg-number' + pageNumber;
        //$(a).hide();
    }
    
    
    addMember('name', 'occupation', 'email')
    addMember('name', 'occupation', 'email')
    addMember('name', 'occupation', 'email')
    addMember('name', 'occupation', 'email')
    addMember('name', 'occupation', 'email')
    var dialogAdd = $( "#form-popup" ).dialog({
          autoOpen: false,
          height: 250,
          width: 200,
          modal: true,
          buttons: {
            "Add new member": testFunc,
            Cancel: function() {
              dialogAdd.dialog( "close" );
            }
          },
        //   close: function() {
        //     form[ 0 ].reset();
        //     allFields.removeClass( "ui-state-error" );
        //   }
    });
    var teamItem = $('.team-item');
    

    $('[name="search"]').on('keyup', function(){
        var search = $(this).val();
        teamItem.each(function() {
            var memberText = $(this).text().toLowerCase();
            if(memberText.indexOf(search) < 0) {
                $(this).hide();
            } else {
                $(this).show();
            }
            // addPageNumebrToItem ()
        });
    });
    
    // function addPageNumebrToItem () {
        
    //     for (var i = 0; i <= teamItem.length; i++) {
    //         console.log(teamItem[i].style);
    //         if (teamItem[i].style.indexOf("display: none;")) {
    //             teamItem[i].removeClass();
    //             teamItem[i].addClass(teamItem);
    //         }
            
    //     }
    //     teamItem.removeClass('pageNumber')
    // }

    var teamList = $('.team-item');
    
    $('.number-of-page').click(function() {
        var pgNb = $(this).text();
        console.log(pgNb)
        paging(pgNb);
    });
    
    function paging (pgNb) {
        teamList.hide();
        teamList.slice((pgNb-1)*4,pgNb*4).show();
    }
    
    function addMember(name, occupation, email) {
        // var itemsOnPage = 4;
        // if((i - itemsOnPage) % itemsOnPage === 0) {
        //     pageNumber++;
        //     console.log("You are on page",pageNumber);
        //     var pageList = $('#pagination');
        //     var pageItem = '<div class="number-of-page">' + pageNumber + '</div>';
        //     //var pageItem = '<a href="#page' + pageNumber + '">' + pageNumber + '</a>';
        //     pageList.append(pageItem);
        // }
        var htmlItem = '<div class="team-item #page' + pageNumber + '">' +
                            '<div>' + name + '</div>' + 
                            '<div>' + occupation + '</div>' + 
                            '<div>' + email + '</div>' + 
                            '<div><button class="edit-member">Edit</button><button class="delete-member">Delete</button></div>' + 
                        '</div>';
        containerList.append(htmlItem);
    }
    
    $('.delete-member').on('click', function() {
        $(this).parent().parent().remove();
    })
    
    function editMember(name, occupation, email) {
        $(this).name.text = name;
        $(this).occupation.text = occupation;
        $(this).email.text = email;
    }
    
    var dialogEdit = $( "#form-popup" ).dialog({
        //   autoOpen: false,
        //   height: 400,
        //   width: 350,
        //   modal: true,
        //   buttons: {
        //     "Edit this member": editMember,
        //     Cancel: function() {
        //       dialogEdit.dialog( "close" );
        //     }
        //   }      
    });
    
   

    
    console.log(dialogAdd);
    console.log(dialogEdit);
    $('#add-member').on('click', function() {
        dialogAdd.dialog('open');
    });
    $('.edit-member').on('click', function() {
        console.log('edit')
        dialogEdit.dialog('open');
    });
    
    
    var formInputs = $('.form-input');
    function testFunc(){
        addMember(formInputs[0].value, formInputs[1].value, formInputs[2].value);
    }
    
    
}
    