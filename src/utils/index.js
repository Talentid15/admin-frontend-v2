export function Dateformatter(dateString){

    // Define the date string

    // const dateString = '2024-09-18T19:36:55.417Z';
    
    // Create a Date object from the string

    const date = new Date(dateString);

    // Define options for formatting the date and time
    const dateOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    
    const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    
    // Format the date and time
    const formattedDate = date.toLocaleDateString('en-GB', dateOptions);
    const formattedTime = date.toLocaleTimeString('en-GB', timeOptions);
    
    // Combine both parts
    const finalOutput = `${formattedTime} ${formattedDate}`;

    return finalOutput; // Return the formatted date and time


}



export const user_role={

    "Super_Admin": "Super_Admin",
    "Sub_Admin":"Sub_Admin",
    "User": "User",
    "Corporate HR": "Corporate HR",
    "HR Agency": "HR Agency",
    "Others": "Others"

}