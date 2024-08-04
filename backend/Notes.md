## Slick Slider in React js

1. Install slick - npm install react-slick
2. Install slick carousel - Install slick
3. Write settings and call setting in slider div.
4. use useState for set slider setting.
5. For create Tabs install react-tabs or we can use custom tabs.

## Backend Information and steps

1. Create database then connect database
2. Setup the basic of project to create server.
3. Connect Mongo DB
4. Util for create custom error objects.

### User Controller and routes

1. For user authentication
   - Make user controller
     - Register user
     - Check if user already exist
     - User Entry
     - Verify User to send verification link
   - Make router for user authentication
   - Make link for user route
2. Import routes in app
3. Check verfication link is sent correctly to user.
4. Become a Author after register and verify user.
5. Request role change
6. Then take approve from admin to become an author
7. Update user role after become an Admin

### Blog post controller and routes

1. Create Blog controller and router
   - Creating, Updating, Deleting post controller
   - Verify User then allow to create blog
2. Controller for Get all blog post by user.
3. Controller for update Blog post using Id and findByIdAndUpdate method.
4. Controller for delete Blog post using Id.

### Category controller and routes

1. Create Category controller and router
   - Creating, Updating, Deleting category controller
2. Controller for Get all category by user.
3. Controller for update category using Id and findByIdAndUpdate method.
4. Controller for delete category using Id.

### Tag controller and routes

1. Create Tag controller and router
   - Creating, Updating, Deleting tag controller
2. Controller for Get all tag by user.
3. Controller for update tag using Id and findByIdAndUpdate method.
4. Controller for delete tag using Id.

### Like controller and routes

1. Create Like controller and router
2. Get likes and liked by user using filter and using the populate method
3. Delete like

### Comment controller and routes

1. Create comment controller and router
2. Get comments, update and delete controller
3. Delete comment

## Backend Modules

1. Register Controller - Done
2. Verify User - Done
3. Login - Done
4. Logout - Done
5. Change Password - Done
6. Update Profile
7. Categories - Done
8. Blog - Done
9. Blog detail
10. News
11. News detail
12. Tags
13. Like - Done

### Hide Navbar in Specific page

Used the useLocation from router dom & created array for locations & then created funtion for hide nav and show nav includes the location pathname. Then added the navbar component in that function.

## Connect Frontend with Backend

** Register User **

1. Use useState for set fields and message.
2. Handle register response using axios(for making http response). 
3. Print error message if wrong response.
4. Handle Register on Submit
5. Print error message and success message
6. 

