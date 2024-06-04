import express from "express";
import fs from "fs";
import csv from "csv-parser";
import { parseString } from "xml2js";
import yaml from "js-yaml";

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

// Path to the YAML file
const yamlFilePath = "../me.yaml";

// Path to the XML file
const xmlFilePath = "../me.xml";

// Path to the CSV file
const csvFilePath = "../me.csv";

// Path to the JSON file
const jsonFilePath = "../me.json";

// Path to the text file
const textFilePath = "../me.txt";

// API endpoints
app.get("/yaml", (req, res) => {
    const yamlData = readYamlFile(yamlFilePath);
    res.json(yamlData);
});

app.get("/xml", (req, res) => {
    const xmlData = readXmlFile(xmlFilePath);
    res.json(xmlData);
});

app.get("/csv", (req, res) => {
    readCsvFile(csvFilePath, (csvData) => {
        res.json(csvData);
    });
});

app.get("/json", (req, res) => {
    const jsonData = readJsonFile(jsonFilePath);
    res.json(jsonData);
});

app.get("/text", (req, res) => {
    const textData = readTextFile(textFilePath);
    res.send(textData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

