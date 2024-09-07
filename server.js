import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to render the main page
app.get("/", async (req, res) => {  
  try {
    const response = await axios.get(`${API_URL}/random`);
    console.log(response);
    res.render("index.ejs", { quote: response.data });
  } catch (error) {
    res.render("index.ejs",{ message: "Error fetching Quote" });
  }
});

app.post("/search", async (req, res) => {  
    try {
      const response = await axios.get(`${API_URL}/filter?type=${req.body.name}`);
      console.log(response);
      res.render("index.ejs", { quote: response.data });
    } catch (error) {
      res.render( "index.ejs",{message: "No quotes found for this author" });
    }
  });

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
