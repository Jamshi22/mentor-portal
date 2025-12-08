export  const  faqData = [
    {
        id:1,
        question:'How to Create a Lead ?',
        answer:"Click the Create Lead Button to open the lead creation form , enter the first and last name of the lead provide the lead email address enter a valid phone number, including the country code , select the course the lead is interested in UG or PG once all the required fields are completed click submit"
    },
    {
        id:2,
        question:'How to Search for a Lead ?',
        answer:'On the home page, find the search bar at the top-right corner type the user phone number into the search field press the search icons or hit enter if the user exists name will be displayes or you will get user not found'
    },
    {
        id:3,
        question:'How to view my paymnet histroy?',
        answer:'On the home page sidebar click on the payment tab , table will display payment details for users created or upgraded by you , use the filter button to refine results by date degree type plan or payment status'
    },
    {
        id:4,
        question:'How to Upgrade a Users Plan',
        answer:'Use the search bar to find the user by their phone number , on the users details page click the upgrade button in the top-right corner choose the new plan from the dropdown enter payment details apply a coupon if available click send code to send an OTP to the user via email or whatsapp enter the OTP and click submit to complete the upgrade the system will displaya a message confiriming the plan upgrade'
    },
    {
        id:5,
        question:'What does the User not found in lead square error mean?',
        answer:'This error indicates that the system cannot locate the user s details in the Lead Square database or CRM. Possible causes include the user s information not being synced with the system, incomplete or incorrect data in the database, or mismatched identifiers such as phone numbers. To resolve the issue, verify that the user s phone number is correct, check if the user was recently created and if there s a delay in syncing their details, and if the problem persists, contact support to investigate any data synchronization issues.'
    },
    {
        id:6,
        question:'How do I report a technical issue or bug?',
        answer:'To report an issue, clearly describe the problem (e.g., "Cannot apply a coupon during plan upgrade") and note the steps to reproduce it. If applicable, take screenshots or record the error message. Then, navigate to the Help Section by clicking on the Get Help or Support button in the portal. Submit a Support Ticket by filling in the required fields, including the issue description and any attachments, and provide details about your browser, device, and operating system. For immediate assistance, contact support via the provided email or phone number. Finally, track the resolution by following up on your ticket for updates.'
    },
    
]




export const FaqDataSuperAdmin = [
    {
        id:1,
        question:'How to Create a New Employee ?',
        answer:"Once you log in as a Super Admin, click on Create Employee to open the pop-up window. In the pop-up, enter the employee's full name in the Name field and the company email address in the Email ID field. The Password field will be auto-generated based on the provided email address. After filling out all the required fields, click the Submit button. A confirmation message, such as  Employee created successfully, will appear. Additionally, an email notification will be sent to the employee's provided email address, informing them that their account has been created and providing further instructions if necessary."
    },
    {
        id:2,
        question:'How to Create a LEAD?',
        answer:'Log in to the Mentor Portal using your Super Admin credentials and click on the "Create Lead" button to open the lead creation form. In the form, enter the lead s first and last name in the Name field, followed by the lead s email address in the Email field and a valid phone number, including the country code, in the "Phone Number" field. Next, select the course the lead is interested in, such as UG or PG, in the "Course Interest" field. Once all required fields are completed, click "Submit." A success message, such as "Lead created successfully," will appear, and the lead will be added to the Leads Square.'
    },
    {
        id:3,
        question:'How to Search for a LEAD ?',
        answer:'Log in to the portal using your credentials and locate the search field at the top-right corner of the home page. Enter the user s phone number into the search field and press the search icon or hit Enter. If the user exists, their details, including Name, Email, Phone, Course Type, and Plan, will be displayed. If no user is found, an error message, such as "User not found," will appear on the screen.'
    },
    {
        id:4,
        question:'How to View Payment History for My Employees ?',
        answer:'Log in to the portal using your credentials and navigate to the Payment tab on the home page sidebar. The payment table will display payment details for users created or upgraded by you and your employees, including the user’s name, phone number, payment date, plan type, and payment status. To refine the results, use the Filter button to sort the payments by date, degree type, plan, or payment status.'
    },
    {
        id:5,
        question:'How to Upgrade a User’s Plan ?',
        answer:"Log in to the portal using your credentials and search for the user by their phone number using the search bar. Once you locate the user, click the 'Upgrade' button on their details page, which is located in the top-right corner. From the dropdown menu, select the new plan (e.g., Explore or Achieve). Then, enter the payment details by choosing a payment method, such as UPI, Cash, or Credit/Debit Card. If available, apply any coupons. Afterward, click 'Send Code' to send an OTP to the user via email or WhatsApp. Once the user receives the OTP, enter it and click 'Submit' to complete the upgrade process. The system will then display a confirmation message indicating that the plan has been successfully upgraded"

    },
    {
        id:6,
        question:'What are the steps to create a new coupon ?',
        answer:"Log in to the Mentor Portal as a Super Admin and navigate to the Coupons section by clicking on the Coupons tab in the left sidebar. Click the Create Coupon button to open the pop-up window. In the pop-up, fill in the details by entering a unique coupon code (uppercase alphanumeric only), selecting the course type (UG or PG), and specifying the start date for the coupon's validity in the Valid From field. Then, enter the end date for the coupon's validity in the Expire To field and provide the discount percentage. After filling in all the required information, click the Create button to save the coupon. A success message, such as Coupon created successfully, will appear, and the coupon will be added to the list."

    },
    {
        id:7,
        question:'.What does the "User not found in lead square" error mean ?',
        answer:"This error means the system cannot locate the user’s details in the Lead Square database or CRM. Possible causes include the user’s information not being synced with the system, incomplete or incorrect data in the database, or the phone number or other identifiers used in the search not matching the existing records. To resolve the issue, verify that the user’s phone number is correct, check if the user was recently created and if there’s a delay in syncing their details, and if the problem persists, contact support to investigate data synchronization problems."

    },
    {
        id:8,
        question:'How do I report a technical issue or bug ?',
        answer:"Describe the issue clearly (e.g., Cannot apply a coupon during plan upgrade) and note the steps to reproduce the issue. Take screenshots or record the error message if applicable. Next, navigate to the Help Section by clicking on the Get Help or Support button in the portal. To submit a Support Ticket, fill in the required fields, including the issue description and attachments, and provide details about your browser, device, and operating system. If immediate help is needed, use the provided contact email or phone number for the support team. Finally, track the resolution by following up on your ticket for updates and resolution."

    },



    
]