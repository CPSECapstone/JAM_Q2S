# JAM_Q2S

Project Context:

Cal Poly will be transitioning from a quarter based calendar to a semester based calendar beginning in Fall 2026. As a result, students who are currently enrolled at Cal Poly will be going through the transition to semesters. It will be vital to ensure students are meeting their degree requirements throughout this period. Thus, a web-based curriculum planner will help alleviate advisor workload and provide clarity to students on their required courses. Students can log in and plan the classes they need in order to graduate, send this to their advisor for approval, and ensure they will graduate on time.

Vision Statement:

For Cal Poly Students who need a method to plan their degrees throughout the Q2S transition, the ESS Q2S Degree Planner is a website that provides quarter-to-semester mappings and allows students to efficiently plan/visualize possible paths to graduation. Unlike Poly Flow Builder or Degree Planner, our product will let students easily see their Q2S possible paths, ensure all student requirements are met, and be maintained by Cal Poly administrators.

Permission Levels:
1. Student: This is the main client/user who creates a profile rather than being assigned an account with a permission level. 
    They have the ability to edit, add flowchart, save flowchart, and download their own flowcharts.
2. View Only: This is one permission level above student, expected to be for professors/mentors. 
    They have the ability to look up students by Cal Poly email address and view their flowcharts.
3. Suggest Access: Expected to be for college advisors.
    They have the ability to look up students and suggest edits to their flowcharts as well as create
    new flowcharts on their behalf. 
4. Full Control: 
    This user has the ability to make changes to the supporting data in order to maintain accuracy.
    They control permissions for those accessing student profiles. This user can also pull reports.
5. Builder Admin: To start off as the project team itself.
    Would have the ability to assign the Full Control access. All Permissions. 

Developer Set Up:

Development requires IntelliJ Ultimate. 
You can apply for a free educational license at the following link: 

      https://www.jetbrains.com/community/education/#students

The project also requires Java v.20, available here:

      https://www.oracle.com/java/technologies/javase/jdk20-archive-downloads.html
The project is using ESLint setup with GitHub Actions to lint the code on every pull request to ensure clean and consistent code.
GitHub Actions is also setup to build and test the code on every pull request to ensure continuous testing and integration.

Developer Set Up - Install Instructions:

Beginning to develop once IntelliJ Ultimate is installed with Java v.20 is quite easy.
Simply clone the repo and create a new branch.
It is important to create a new branch since the repository is configured such that no one can push directly to main. 
Once changes are completed, create a PR for review. A minimum of one review is require to merge code into main.

How to Run the Application Locally:

    Back-end: Through IntelliJ run the "Q2SSeniorProjectApplication" file. The APIs can be accessed through "http://localhost:8080/api".

    Front-end: Once the back-end is running, run "npm start" in the terminal from the "src/frontend" directory. A tab should open in your browser. 

Testing:
    
    Backend JUnit tests can be run through IntelliJ and can be found in the "src/test/java" directory.