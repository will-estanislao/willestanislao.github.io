//IIFE -- Immediately Invoked Function Expression
// AKA -- Anonymous Self-Executing Function
(function()
{
    // To avoid breaking JS since button may not exist on other pages
    function DisplayHomePage()
    {
        console.log("Homepage loaded")

        let AboutUsButton = document.getElementById("AboutUsButton");
        // console.log(AboutUsButton);

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