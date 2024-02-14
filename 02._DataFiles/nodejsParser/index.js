// Reading local file

// const fs = require("fs");
// const csv = require("csv-parser");
// const { parseString } = require("xml2js");
// const yaml = require("js-yaml");

// // Function to read YAML file and return as JavaScript object
// function readYamlFile(filePath) {
//     try {
//         const yamlData = yaml.load(fs.readFileSync(filePath, "utf8"));
//         return yamlData;
//     } catch (error) {
//         console.error("Error reading YAML file:", error);
//         return null;
//     }
// }

// // Function to read XML file and return as JavaScript object
// function readXmlFile(filePath) {
//     try {
//         const xmlData = fs.readFileSync(filePath, "utf8");
//         let xmlJson;
//         parseString(xmlData, (err, result) => {
//             if (err) {
//                 console.error("Error parsing XML:", err);
//                 return;
//             }
//             xmlJson = result;
//         });
//         return xmlJson;
//     } catch (error) {
//         console.error("Error reading XML file:", error);
//         return null;
//     }
// }

// // Function to read CSV file and return as array of JavaScript objects
// function readCsvFile(filePath) {
//     try {
//         const results = [];
//         fs.createReadStream(filePath)
//             .pipe(csv())
//             .on("data", (data) => results.push(data))
//             .on("end", () => {
//                 console.log("CSV data:");
//                 console.log(results);
//             });
//         return results;
//     } catch (error) {
//         console.error("Error reading CSV file:", error);
//         return null;
//     }
// }

// // Function to read JSON file and return as JavaScript object
// function readJsonFile(filePath) {
//     try {
//         const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));
//         return jsonData;
//     } catch (error) {
//         console.error("Error reading JSON file:", error);
//         return null;
//     }
// }

// // Function to read text file and return as string
// function readTextFile(filePath) {
//     try {
//         const textData = fs.readFileSync(filePath, "utf8");
//         return textData;
//     } catch (error) {
//         console.error("Error reading text file:", error);
//         return null;
//     }
// }

// // Path to the YAML file
// const yamlFilePath = "../me.yaml";
// const yamlData = readYamlFile(yamlFilePath);

// // Path to the XML file
// const xmlFilePath = "../me.xml";
// const xmlData = readXmlFile(xmlFilePath);

// // Path to the CSV file
// const csvFilePath = "../me.csv";
// const csvData = readCsvFile(csvFilePath);

// // Path to the JSON file
// const jsonFilePath = "../me.json";
// const jsonData = readJsonFile(jsonFilePath);

// // Path to the text file
// const textFilePath = "../me.txt";
// const textData = readTextFile(textFilePath);

// // Log all data as JavaScript objects
// console.log("YAML data:");
// console.log(yamlData);
// console.log("XML data:");
// console.log(xmlData);
// console.log("JSON data:");
// console.log(jsonData);
// console.log("Text data:");
// console.log(textData);




// Express reading from filepath
const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const { parseString } = require("xml2js");
const yaml = require("js-yaml");

const app = express();

// Function to read YAML file and return as JavaScript object
function readYamlFile(filePath) {
    try {
        const yamlData = yaml.load(fs.readFileSync(filePath, "utf8"));
        return yamlData;
    } catch (error) {
        console.error("Error reading YAML file:", error);
        return null;
    }
}

// Function to read XML file and return as JavaScript object
function readXmlFile(filePath) {
    try {
        const xmlData = fs.readFileSync(filePath, "utf8");
        let xmlJson;
        parseString(xmlData, (err, result) => {
            if (err) {
                console.error("Error parsing XML:", err);
                return;
            }
            xmlJson = result;
        });
        return xmlJson;
    } catch (error) {
        console.error("Error reading XML file:", error);
        return null;
    }
}

// Function to read CSV file and return as array of JavaScript objects
function readCsvFile(filePath, callback) {
    const results = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
            console.log("CSV data:");
            console.log(results);
            callback(results);
        });
}

// Function to read JSON file and return as JavaScript object
function readJsonFile(filePath) {
    try {
        const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));
        return jsonData;
    } catch (error) {
        console.error("Error reading JSON file:", error);
        return null;
    }
}

// Function to read text file and return as string
function readTextFile(filePath) {
    try {
        const textData = fs.readFileSync(filePath, "utf8");
        return textData;
    } catch (error) {
        console.error("Error reading text file:", error);
        return null;
    }
}

// API endpoints
app.get("/yaml", (req, res) => {
    const filePath = req.query.filePath;
    if (!filePath) {
        res.status(400).json({ error: "Missing filePath parameter" });
        return;
    }
    const yamlData = readYamlFile(filePath);
    res.json(yamlData);
});

app.get("/xml", (req, res) => {
    const filePath = req.query.filePath;
    if (!filePath) {
        res.status(400).json({ error: "Missing filePath parameter" });
        return;
    }
    const xmlData = readXmlFile(filePath);
    res.json(xmlData);
});

app.get("/csv", (req, res) => {
    const filePath = req.query.filePath;
    if (!filePath) {
        res.status(400).json({ error: "Missing filePath parameter" });
        return;
    }
    readCsvFile(filePath, (csvData) => {
        res.json(csvData);
    });
});

app.get("/json", (req, res) => {
    const filePath = req.query.filePath;
    if (!filePath) {
        res.status(400).json({ error: "Missing filePath parameter" });
        return;
    }
    const jsonData = readJsonFile(filePath);
    res.json(jsonData);
});

app.get("/text", (req, res) => {
    const filePath = req.query.filePath;
    if (!filePath) {
        res.status(400).json({ error: "Missing filePath parameter" });
        return;
    }
    const textData = readTextFile(filePath);
    res.send(textData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
