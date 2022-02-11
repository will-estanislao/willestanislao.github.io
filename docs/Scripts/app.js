/** 
 * app.js
 * Author: Will Estanislao
 * Date: 11/02/22
 * Desc: 
 */

//IIFE -- Immediately Invoked Function Expression
// AKA -- Anonymous Self-Executing Function
(function()
{
    // To avoid breaking JS since button may not exist on other pages
    function DisplayHomePage()
    {
        console.log("Homepage loaded")

    
        // Jquery to select
        $("#AboutUsButton").on("click",() =>
        {
            location.href = "about.html";
        })

        // Using JQuery to insert elements
        $("main").append(`<p id="ArticleParagraph" class = "mt-3"> This is a Article Paragraph! </p>`);
        $("body").append(`<article class="container"><p id="ArticleParagraph" class="mt-3"> This is the Article Paragraph"</p></article>`);
    }

    function DisplayProductsPage()
    {
        console.log("Products Page Loaded");
    }

    function DisplayServicesPage()
    {
        console.log("Services Page Loaded");
    }

    function DisplayAboutPage()
    {
        console.log("About Page Loaded");
    }

    /**
     * This function adds a Contact object to localStorage
     * @param {string} fullName 
     * @param {string} contactNumber 
     * @param {string} emailAddress 
     */
    function AddContact(fullName, contactNumber, emailAddress)
    {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        // console.log(contact.serialize());
        if(contact.serialize())
        {
            // Unique key for each contact, using first chara of their name and current date
            let key = contact.FullName.substring(0, 1) + Date.now();
            // Store in local storage
            localStorage.setItem(key, contact.serialize());
        }

    }

    /**
     * This method validates a field in the form and displays an error in the message area div element
     * @param {string} fieldID 
     * @param {regex} regular_expression 
     * @param {string} error_message 
     */
    function ValidateField(fieldID, regular_expression, error_message)
    {
        let messageArea = $("#MessageArea").hide();

        $("#" + fieldID).on("blur", function()
        {
            let text_value = $(this).val();
            
            if(!regular_expression.test(text_value))
            {
                // You can chain methods
                $(this).trigger("select").trigger("focus"); 
                messageArea.addClass("alert alert-danger").text(error_message).show(); 
            }
            else
            {
                messageArea.removeAttr("class").hide();
            }
        });

    }

    function ContactFormValidation()
    {
        ValidateField("fullName", /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,})((\s|,|-)([A-Z][a-z]{1,}))*(\s|,|-)([A-Z][a-z]{1,})$/, "Please enter a valid Full Name. This must inclue at least a Capitalized First Name and a Capitalized Last Name");
        ValidateField("contactNumber", /^(\+\d{1,3}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Please enter a valid phone number! Example: 905 123 4567");
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, " Please enter a valid email address!");

    }

    function DisplayContactPage()
    {
        console.log("Contact Page Loaded");

        ContactFormValidation();

        // When send button is clicked
        // When subscribe check box is checked
        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        // When user adds new contact
        sendButton.addEventListener("click", function(event)
        {
            // event.preventDefault(); // For testing

            // Just check if box is checked, instead of event listening
            // Only if subscribe checkbox is checked
            if(subscribeCheckbox.checked)
            {
                console.log("Subscriber Checked");
                // console.log(contact.serialize());

                let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);
                if(contact.serialize())
                {
                    // Unique key for each contact, using first chara of their name and current date
                    let key = contact.FullName.substring(0, 1) + Date.now();

                    // Store in local storage
                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
    }

    // Show the contacts list on the ContactList page
    function DisplayContactListPage()
    {
        if(localStorage.length > 0)
        {
            let contactList = document.getElementById("contactList");

            let data = "";

            // Get the keys from local storage - gives list of keys (which hold user info) [o:]
            let keys = Object.keys(localStorage);

            let index = 1;

            
            // for every key in the keys string array - essentially one row on contact table
            for(const key of keys)
            {
                let contactData = localStorage.getItem(key); // get localStorage data value

                // Instantiate contact obj - empty contact
                let contact = new core.Contact();
                
                // contactData retrieved from local storage
                contact.deserialize(contactData);

                console.log(contact.toString);

                // Formatting how data will look on page, notice table structure
                data += `<tr>
                <th scope="row" class="text-center"> ${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
                <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
                </tr>`;

                 
                index++;
            }

            contactList.innerHTML = data;

            $("#addButton").on("click", ()=>
            {
                location.href = "edit.html#add";
            });

            // Not this as in scope
            // this as in what jquery returns
            // watch out for fat arrow functions - can change context (in jquery)
            // value is up there (contact) - trying to read value
            $("button.delete").on("click", function()
            {
                if(confirm("Are you sure you want to delete contact?"))
                {
                    localStorage.removeItem($(this).val());
                    
                }
                location.href = "contact-list.html"; // seems like refreshing page
                
            });

            $("button.edit").on("click", function()
            {
                // return edit button - get key and send that key elsewhere for processing
                location.href = "edit.html#" + $(this).val(); 
            });
        }
    }

    function DisplayEditPage()
    {
        console.log("Edit Page Loaded");

        ContactFormValidation();
        
        // Page info
        let page = location.hash.substring(1); // Technically could just put the last part
        console.log(page);

        // Create instant scope - curly braces!
        switch(page)
        {
            case "add":
                {
                    $("main>h1").text("Add Contact");

                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);

                    // Need to prevent default behaviour
                    $("#editButton").on("click", (event) =>
                    {
                        event.preventDefault();
                        AddContact(fullName.value, contactNumber.value, emailAddress.value);
                        location.href = "contact-list.html";
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "contact-list.html";
                    });
                }
                break;
            default:
                {
                    // gets contact info from local storage
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page));

                    // display the contact in the edit form - injects into forma nd shows it
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);

                    // Once edit button pressed
                    $("#editButton").on("click", (event) =>
                    {
                        event.preventDefault();

                        // Get the changes made on the page and store it
                        contact.FullName = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();


                        // Replace item in local storage
                        localStorage.setItem(page, contact.serialize());
                        // Refresh page - go back to contact-list
                        location.href = "contact-list.html";
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "contact-list.html";
                    })
                }
                break;
        }
    }

    function DisplayLoginPage()
    {
        console.log("Login Page");
    }

    function DisplayRegisterPage()
    {
        console.log("Register Page");
    }

    // Named function
    // Will not execute until called
    function Start()
    {
        console.log("App Started!");

        switch(document.title)
        {
            case "Home":
                DisplayHomePage();
                break;
            case "Our Products":
                DisplayProductsPage();
                break;
            case "Our Services":
                DisplayServicesPage();
                break;
            case "About Us":
                DisplayAboutPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "Contact-List":
                DisplayContactListPage();
                break;
            case "Edit":
                DisplayEditPage();
                break;
            case "Login":
                DisplayLoginPage();
            case "Register":
                DisplayRegisterPage();
        }  
    }

    // Similar to named function above, 2nd way to use function
    // Start identifier, points to memory space of the anon function
    // let Start = function()
    // {
    //     console.log("App Started!");
    // }

    // When the window loads, trigger Start method
    window.addEventListener("load", Start);
})();