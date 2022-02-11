(function (core) {

    class Contact
{
    // Public properties first (Getters + setters)
    get FullName()
    {
        return this.m_fullName;
    }
    
    set FullName(fullName)
    {
        this.m_fullName = fullName;
    }

    get ContactNumber()
    {
        return this.m_contactNumber;
    }
    
    set ContactNumber(contactNumber)
    {
        this.m_contactNumber = contactNumber;
    }

    get EmailAddress()
    {
        return this.m_emailAddress;
    }
    
    set EmailAddress(emailAddress)
    {
        this.m_emailAddress = emailAddress;
    }
    
    // Way of storing/retrieving data in loval storage
    // constructor - w/ default parameters (optional)
    // Purpose can create empty object, serialize info and then fill it
    constructor(fullName = "", contactNumber = "", emailAddress = "")
    {
        this.FullName = fullName;
        this.ContactNumber = contactNumber;
        this.EmailAddress = emailAddress;
    }

    // Takes contact and puts it into a comma separated list
    serialize()
    {
        // Returns a value or returns no. Puts it into local storage
        if(this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== "")
        {
            return `${this.FullName},${this.ContactNumber},${this.EmailAddress}`;
        }
        else
        {
            console.error("One or more properties of the Contact are missing or empty");
            return null;
        }
    }

    // data is array - create an array of string
    // Don't know what data coming in is, but the data array will accept it as string
    // data is assumed to be a comma-separated list of properties
    deserialize(data)
    {

        let propertyArray = data.split(",");
        this.FullName = propertyArray[0];
        this.ContactNumber = propertyArray[1];
        this.EmailAddress = propertyArray[2];
    }


    // public overrides
    // Shows up in console
    toString()
    {
        return `Full Name: ${this.FullName} Contact Number: ${this.ContactNumber} Email Address: ${this.EmailAddress}`;
    }
    
}
    core.Contact = Contact;
})(core || (core = {}));


