//IIFE -- Immediately Invoked Function Expression
// AKA -- Anonymous Self-Executing Function
(function()
{
    // To avoid breaking JS since button may not exist on other pages
    function DisplayHomePage()
    {
        console.log("Homepage loaded")

        let AboutUsButton = document.getElementById("AboutUsButton");
        // Attach event listener
        AboutUsButton.addEventListener("click", function()
        {
            console.log("About Us Button Clicked!!");

            // Redirect to other page
            location.href = "about.html";
        });

        // Step 1: Get an entry point (insertion/deletion point) reference
        // let Body = document.body; // Body is a special keyword
        let DocumentBody = document.body;
        let MainContent = document.getElementsByTagName("main")[0];
        // console.log(MainContent);

        //Step 2: Create an Element to insert
        // Make a paragraph element - in memory
        let MainParagraph = document.createElement("p");
        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph" class = "mt-3"> This is a Article Paragraph! </p>`;

        // Alternate way - New and part of html 5
        // let NewParagraph = `<p id="NewParagraph" class = "mt-3"> This is a New Paragraph! </p>`;

        // Step 3: Configure new element inserted
        // The attributes affect how element will look and show on page
        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");
        MainParagraph.textContent = "This is the new paragraph"; // Text value paragraph will contain

        Article.setAttribute("class", "container");

        // Step 4: Add / Insert the new element
        //Appends/Adds at the bottom
        // MainContent.appendChild(NewParagraph);
        MainContent.appendChild(MainParagraph);
        Article.innerHTML = ArticleParagraph;
        DocumentBody.appendChild(Article);

        // Alternate - Add new content onto
        // MainContent.innerHTML += NewParagraph;

        // To insert before
        // Need to target a location (Element) to insert before
        // TargetElement.before(elementToInsert);

        // Deletion - .remove();
        // Article.remove();

        // Test new contact class
        // let darryl = new Contact("Darryl Olson", "555-555-5555", "darryloslson@hotmail.com");
        // console.log(darryl.toString());

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

    function DisplayContactPage()
    {
        console.log("Contact Page Loaded");

        // When send button is clicked
        // When subscribe check box is checked
        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        // Item test - local storage view in inspect>storage in browser
        // Stays forever in storage persists
        // localStorage.setItem("test", "Test data");
        // console.log(localStorage.getItem("test"));

        // Serializing - Encoding, Hashing etc.
        // De-Serializing - Decoding

        // When user adds new contact
        sendButton.addEventListener("click", function(event)
        {
            // event.preventDefault(); // For testing - This method is deprecated

            // Just check if box is checked, instead of event listening
            // Only if subscribe checkbox is checked
            if(subscribeCheckbox.checked)
            {
                console.log("Subscriber Checked");
                let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value);
                // console.log(contact.serialize());
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

            
            // for evert key in the keys string array
            for(const key of keys)
            {
                let contactData = localStorage.getItem(key); // get localStorage data value

                // Instantiate contact obj - empty contact
                let contact = new Contact();
                
                // contactData retrieved from local storage
                contact.deserialize(contactData);

                console.log(contact.toString);

                // Formatting how data will look on page, notice table structure
                data += `<tr>
                <th scope="row" class="text-center"> ${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td></td>
                <td></td>
                </tr>`;

                index++;
            }
            // To add: CREATE/DELETE FUNCT
            contactList.innerHTML = data;
        }
        
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