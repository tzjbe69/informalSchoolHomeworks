/* global $ */
/* global history */
$(document).ready(onHTMLLoaded);
    var team = [
        {
            name: 'Anca Balc',
            occupation: 'dev',
            email: 'abalc@gmail.com'
        },
        {
            name: 'Mihai Muresan',
            occupation: 'inginer',
            email: 'tzjbe69@gmail.com'
        },
        {
            name: 'Leoveanu Roxana',
            occupation: 'expert achizitii',
            email: 'deea.roxi26@gmail.com'
        },
        {
            name: 'Alina Szilagyi',
            occupation: 'economist',
            email: 'alinaszilagyi@ymail.com'
        },
        {
            name: 'Bianca Mirion',
            occupation: 'Little Programmer',
            email: 'bianca_mirion@yahoo.com'
        },
        {
            name: 'Laura Ille',
            occupation: 'Inginer',
            email: 'n.laura_ioana@yahoo.com'
        },
        {
            name: 'Muntean Monica',
            occupation: 'profesor',
            email: 'monicamuntean13@yahoo.com'
        },
        {
            name: 'Claudia Asavinei',
            occupation: 'Web Developer in devenire',
            email: 'asavinei.claudia@yahoo.com'
        },
        {
            name: 'Ureche Marian',
            occupation: 'Tehnician suport gazduire web',
            email: 'marian.ureche123@gmail.com'
        },
        {
            name: 'Anca Balc',
            occupation: 'dev',
            email: 'abalc@gmail.com'
        },
        {
            name: 'Mihai Muresan',
            occupation: 'inginer',
            email: 'tzjbe69@gmail.com'
        },
        {
            name: 'Leoveanu Roxana',
            occupation: 'expert achizitii',
            email: 'deea.roxi26@gmail.com'
        },
        {
            name: 'Alina Szilagyi',
            occupation: 'economist',
            email: 'alinaszilagyi@ymail.com'
        },
        {
            name: 'Bianca Mirion',
            occupation: 'Little Programmer',
            email: 'bianca_mirion@yahoo.com'
        },
        {
            name: 'Laura Ille',
            occupation: 'Inginer',
            email: 'n.laura_ioana@yahoo.com'
        },
        {
            name: 'Muntean Monica',
            occupation: 'profesor',
            email: 'monicamuntean13@yahoo.com'
        },
        {
            name: 'Claudia Asavinei',
            occupation: 'Web Developer in devenire',
            email: 'asavinei.claudia@yahoo.com'
        },
        {
            name: 'Ureche Marian',
            occupation: 'Tehnician suport gazduire web',
            email: 'marian.ureche123@gmail.com'
        }

    ];
    
function onHTMLLoaded() {
    //Declaring variables
    var containerList = $('#team-list'),
        formInputs = $('.form-input'),
        elementsOnPage = document.getElementById('selectedPage'),
        memberToEdit = null,
        innerMessage = $('#inner-message'),
        messageDiv = $('.message'),
        dialogShow = $('#form-popup').dialog({
            autoOpen: false,
            height: 320,
            width: 300,
            modal: true,
            buttons: {
                "Add Member": addMemberPush,
                "Modify Member": modifyMember,
                Cancel: function() {
                    dialogShow.dialog( "close" );
                }
            },
            close: function() {
                document.getElementById('hidden-form').reset();
            }
        }),
        uiButtonsFormDialog = $('.ui-button');
    uiButtonsFormDialog[1].className += " add-member";
    uiButtonsFormDialog[2].className += " modify-member";
    var uiButtonAddMember = $('.add-member');
    var uiButtonModifyMember = $('.modify-member');
    //Add members from list
    for (var i = 0; i < team.length; i++) {
        addMember(team[i]);
    }
    //Search
    $('[name="search"]').on('keyup',  function(){
        var teamItem = $('.team-item');
        var search = $(this).val().toLowerCase();
        teamItem.each(function() {
            var memberText = $(this).text().toLowerCase();
            if(memberText.indexOf(search) < 0) {
                $(this).hide();
                $(this).removeClass('searched');
            } else {
                $(this).show();
                $(this).addClass(('searched'));
            }
        });
        pagingItems();
    });
    //Select number of items per page
    elementsOnPage.onchange = pagingItems;
    //Buttons
    //Delete
    containerList.on('click', '.delete-member', function() {
        hideMessages();
        $(this).parent().parent().remove();
        pagingItems();
        showMessage('deleted');
    });
    //Add
    $('#add-member').on('click', function() {
        hideMessages();
        $('#ui-id-1').text("Add new member");
        uiButtonModifyMember.addClass('hide-the-button');
        uiButtonAddMember.removeClass('hide-the-button');
        dialogShow.dialog('open');
        resetError();
    });
    //Modify
    containerList.on('click', '.edit-member', function() {
        hideMessages();
        $('#ui-id-1').text("Edit member");
        uiButtonAddMember.addClass('hide-the-button');
        uiButtonModifyMember.removeClass('hide-the-button');
        memberToEdit = $(this).parent().parent().children();
        for (var i = 0; i < formInputs.length; i++) {
            formInputs[i].value = memberToEdit[i].textContent;
        }
        dialogShow.dialog('open');
        resetError();
    });
    //FUNCTION DEFINITIONS
    //Add
    function addMemberPush(e){
        e.preventDefault();
        if (validateForm()) {
            var member = {
                name: formInputs[0].value, 
                occupation: formInputs[1].value, 
                email: formInputs[2].value
            };
            addMember(member);
            team.push(member);
            showMessage('added');
            dialogShow.dialog("close");
        }
    }
    function addMember(member) {
        var htmlItem = '<div class="team-item searched">' +
                            '<div>' + member.name + '</div>' + 
                            '<div>' + member.occupation + '</div>' + 
                            '<div class="mail">' + member.email + '</div>' + 
                            '<div><button class="edit-member">Edit</button><button class="delete-member">Delete</button></div>' + 
                        '</div>';
        containerList.append(htmlItem);
        pagingItems();
    }
    //Modify
    function modifyMember(e) {
        e.preventDefault();
        if (validateForm()){
            for(var i = 0; i < formInputs.length; i++) {
                memberToEdit[i].textContent = formInputs[i].value;
            }
            $('form')[0].reset();
            showMessage('modified');
            dialogShow.dialog("close");
        }
    }
    //Pagination
    function pagingItems() {
        hideMessages();
        var itemsOnPage = elementsOnPage.options[elementsOnPage.selectedIndex].value;
        var showItems = $('.searched');
        var pageNumber = 0;
        var pageList = $('#pagination').html("");
        for (var i = 0; i < showItems.length; i++) {
            if((i - itemsOnPage) % itemsOnPage === 0) {
                pageNumber++;
                var pageItem = '<div class="number-of-page pull-left">' + pageNumber + '</div>';
                pageList.append(pageItem);
            }
        }
        paging(1);
        function paging (pgNb) {
            showItems.hide();
            showItems.slice((pgNb-1)*itemsOnPage,pgNb*itemsOnPage).show();
            $('.number-of-page').each( function() {
                if($(this).text() != pgNb) {
                    $(this).removeClass('sel');
                } else {
                     $(this).addClass('sel');
                }
            });
        }
        $('.number-of-page').click(goToPage);
        function goToPage() {
            hideMessages();
            var pgNb = $(this).text();
            history.pushState({}, "mynew page", "page" + pgNb);
            paging(pgNb);
        }
    window.onpopstate = function(event) {
        var query = document.location.pathname.split('/');
        var loc = query[query.length -1][4];
        // in case it goes back to first page
        if (loc === undefined) {
            loc = 1;
        }
        paging(loc);
    };
    }

    //Form error handler
    function validateForm() {
        var checker = true;
        for (var i = 0; i < formInputs.length; i++) {
            if (formInputs[i].value == '') {
                formInputs[i].style.border = '1px solid red';
                checker = false;
            } else {
                formInputs[i].style.border = '1px solid black';
            }
        }
        return checker;
    }
    function resetError() {
        formInputs.border = '1px solid black';
    }
    formInputs.on('keypress', function () {
        $(this).css('border', '1px solid black');
    });
    //Message functions + button
    function hideMessages() {
        innerMessage.html('');
        messageDiv.hide();
    }
    function showMessage(message) {
        innerMessage.html('Member ' + message + ' successfully.');
        messageDiv.show();
    }
    $('#closeBttn').on('click', hideMessages);
}