const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 5001;
const dbPath = path.join(__dirname, "database.db");

let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(port, () => {
      console.log(`Server Running At https://localhost:${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

initializeDbAndServer();

/*app.post("/", async (req, res) => {
  try {
    const createStudentTable = `CREATE TABLE IF NOT EXISTS student (
      firstName TEXT,
      lastName TEXT,
      email TEXT,
      phoneNumber INTEGER,
      address TEXT,
      githubLink TEXT,
      linkedIn TEXT
    )`;

    await db.run(createStudentTable);

    const insertStudentData = `INSERT INTO student (
      firstName, lastName, email, phoneNumber, address, githubLink, linkedIn
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    await db.run(insertStudentData, [
      "LeelaGopiKrishna",
      "Munipalle",
      "munipallegopikrishna@gmail.com",
      6304206589,
      "SrNagar, Hyderabad, Telangana",
      "https://github.com/GopiMunipalle",
      "https://www.linkedin.com/in/leelagopikrishna/",
    ]);

    res.json("Student Data Inserted");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error inserting student data" });
  }
});
*/
app.get("/", async (req, res) => {
  try {
    const studentQuery = `select * from student`;
    const students = await db.all(studentQuery);
    res.json(students);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
});

/*app.post("/education", async (req, res) => {
  try {
    const createEducationTable = `CREATE TABLE IF NOT EXISTS education (
      collegeName TEXT,
      branch TEXT,
      major TEXT,
      score varchar(10),
      startYear INTEGER,
      endYear INTEGER
    )`;

    await db.run(createEducationTable);

    const insertEducationData = `INSERT INTO education (
      collegeName, branch, major, score, startYear, endYear
    ) VALUES (?, ?, ?, ?, ?, ?)`;

    await db.run(insertEducationData, [
      "NxtWave Disruptive Technologies",
      "Fullstack Development",
      "",
      "",
      2022,
      2023,
    ]);

    await db.run(insertEducationData, [
      "T.J.P.S College, Guntur",
      "Bachelor Of Science(BSC)",
      "MPCs",
      "76%",
      2019,
      2022,
    ]);

    await db.run(insertEducationData, [
      "SriChaitanya Jr College, Guntur",
      "Intermediate",
      "MPC",
      "92%",
      2017,
      2019,
    ]);

    await db.run(insertEducationData, [
      "Z.P. High School, Prakasm",
      "SSC",
      "",
      "80%",
      2016,
      2017,
    ]);

    res.json("Education Data Inserted");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error inserting education data" });
  }
});
*/

app.get("/education", async (req, res) => {
  try {
    const educationQuery = `select * from education`;
    const education = await db.all(educationQuery);
    res.json(education);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
});

/*app.post("/projects", async (req, res) => {
  try {
    const createprojectsTable = `CREATE TABLE IF NOT EXISTS projects(
    projectTitle VARCHAR(50),
    projectDescription TEXT,
    publishedLink TEXT,
    technologies VARCHAR(100)
  )`;
    await db.run(createprojectsTable);
    const projectSql = `
    INSERT INTO projects(
      projectTitle,
      projectDescription,
      publishedLink,
      technologies
    )VALUES(?,?,?,?)`;

    await db.run(projectSql, [
      "TODOS APPLICATION",
      `A task management solution, designed to make life easier.
      Streamlined task management through a combination of HTML, CSS, and Bootstrap for an intuitive
      interface.
      Seamless CRUD operations through JavaScript event listeners and dynamic UI updates.
      Secure task persistence with local storage methods, ensuring that your tasks are always available.
      `,
      "https://munipalletodo.ccbp.tech/",
      "HTML, CSS, JS, Bootstrap",
    ]);
    await db.run(projectSql, [
      "Wikipedia Search Application",
      `Unlock the vast wealth of knowledge on Wikipedia with a custom search application that delivers relevant and
      curated results. Quick and easy access to information has never been easier.
      Beautifully presented search results with HTML list elements, styled with CSS, Bootstrap, and a
      responsive design that adapts to any device.
      Seamlessly access information with the power of asynchronous fetch GET HTTP API calls and the
      ability to open the desired result in a new tab for further reading.`,
      "https://munipallewiki.ccbp.tech/",
      "HTML, CSS, JS, REST API Calls, Bootstrap",
    ]);
    await db.run(projectSql, [
      "Nxt Trendz ( ECommerce Clone - Amazon, Flipkart)",
      `Username:rahul, Password:rahul@2021
      Rolled out an innovative e-commerce platform patterned after Amazon and Flipkart.
      Designed pages for Login, Products, and Product details with React Router and React components.
      Ensured user security through JWT tokens, REST API calls, and local storage.
      `,
      "https://main.d1tv8o2b3t7zip.amplifyapp.com/ ",
      `React JS, JS, CSS, Bootstrap, Routing, REST API Calls, Local Storage, JWT Token,
      Authorization, Authentication`,
    ]);
    await db.run(projectSql, [
      "Movies App (Netflix/Amazon Prime Clone)",
      `Username:rahul, Password:rahul@2021
      Built a dynamic, feature-rich OTT platform for movie enthusiasts. 
      Utilized React Router for seamless navigation, React Slick for horizontal scrolling, and Figma for UI
      design.
      Integrated TMDb APIs for movie database and authentication, and used client storage to persist login
      state.
      `,
      "https://master.d30euk7c6w32bz.amplifyapp.com/ ",
      "HTML, CSS, JavaScript, React JS, Bootstrap, React Slick, Figma, client storage.",
    ]);
    res.json("projects inserted");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
});*/
app.get("/projects", async (req, res) => {
  try {
    const getProjectsQuery = `
    SELECT * FROM projects`;
    const projectDetails = await db.all(getProjectsQuery);
    res.json(projectDetails);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
});

/*app.post("/skills", async (req, res) => {
  try {
    const createSkillsTable = `
      CREATE TABLE IF NOT EXISTS skills(html,css,javascript,boostrap,nodejs,expressjs,sqlite,reactjs,python)`;

    await db.run(createSkillsTable);
    const skillsQuery = `INSERT INTO skills(html,css,javascript,boostrap,nodejs,expressjs,sqlite,reactjs,python)
    VALUES(?,?,?,?,?,?,?,?,?)`;
    await db.run(skillsQuery, [
      "HTML",
      "CSS",
      "JAVASCRIPT",
      "BOOSTRAP",
      "NODEJS",
      "EXPRESSJS",
      "SQLITE",
      "REACTJS",
      "PYTHON",
    ]);
    res.send("projects Inserted");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
});*/

app.get("/skills", async (req, res) => {
  try {
    const getSkillsQuery = `select * from skills`;
    const skills = await db.all(getSkillsQuery);
    res.json(skills);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
});
