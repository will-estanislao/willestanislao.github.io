"use strict";
((function(){
    // Check if user is logged in
    if(!sessionStorage.getItem("user"))
    {
        // If not...redirect them back to login page
        location.href = "login.html";
    }
}))();