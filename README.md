# Educational Video Player

Notes:
An .env file must be made.
User must be filled out.

.env Rules
-Must contain 3 variables
VITE_PROD_URL
VITE_USER
VITE_DEV

Uses a Vite proxy to call API. Base API route is delclared in the .env file.
Base API route is called as "/api"

Signed in user is declared in .env file

Additional Features

- Responsive on desktop and mobile.
- Animations to text boxes.
- Videos have loading animations, which are picked at random and have an artificial load to be seen.
- Submitting a comment disables the submit button and gives a slight pause for a better user experience.
- Submitted comments are rendered on page without needing to refresh.
- Comments are loading by 10s. A "Load More Comments"
- Loading more comments triggers a load animation.
- The edit video form shows the original video data, and a button that can copy it over to the form if the user made a mistake doing changes.

- (Implement) - The Navbar search can search by users. Can only search by exact username since I have limited access to the API.
