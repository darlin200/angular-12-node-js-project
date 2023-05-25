
const fs = require('fs');

// const writeStream = fs.createWriteStream("test.xls");
// import { Interface } from "readline";
const express = require('express')
var cors = require('cors');
const mongoose = require('mongoose')
const authRouter = require('./app/routes/turorial.routes')
const PORT = process.env.PORT || 5000;
const excel = require('exceljs');
const path = require('path');



const countries = [
  { name: 'Cameroon', capital: 'Yaounde', countryCode: 'CM', phoneIndicator: 237 },
  { name: 'France', capital: 'Paris', countryCode: 'FR', phoneIndicator: 33 },
  { name: 'United States', capital: 'Washington, D.C.', countryCode: 'US', phoneIndicator: 1 },
  { name: 'India', capital: 'New Delhi', countryCode: 'IN', phoneIndicator: 91 },
  { name: 'Brazil', capital: 'Brasília', countryCode: 'BR', phoneIndicator: 55 },
  { name: 'Japan', capital: 'Tokyo', countryCode: 'JP', phoneIndicator: 81 },
  { name: 'Australia', capital: 'Canberra', countryCode: 'AUS', phoneIndicator: 61 },
  { name: 'Nigeria', capital: 'Abuja', countryCode: 'NG', phoneIndicator: 234 },
  { name: 'Germany', capital: 'Berlin', countryCode: 'DE', phoneIndicator: 49 },
];

const exportCountriesFile = async () => {
//   const workbook = new excel.Workbook();
//   const worksheet = workbook.addWorksheet('Countries List');

//   worksheet.columns = [
//     { key: 'name', header: "Прізвище, ім'я, по батькові студента" },
//     { key: 'countryCode', header: 'Country Code' },
//     { key: 'capital', header: 'Capital' },
//     { key: 'phoneIndicator', header: 'International Direct Dialling' },
//   ];

//   countries.forEach((item) => {
//     worksheet.addRow(item);
//   });

//   const exportPath = path.resolve(__dirname, 'countries.xlsx');

//   await workbook.xlsx.writeFile(exportPath);

const workbook = new excel.Workbook();
const worksheet = workbook.addWorksheet('Sheet 1');

// Define column headers
worksheet.columns = [
  { key: 'name', header: "Прізвище, ім'я, по батькові студента", width: 50 },
//   { key: 'discipline1', header: 'Іноземна мова (за професійним спрямуванням)', width: 15 },
//   { key: 'discipline2', header: 'Компютерні системи та мережі', width: 15 },
//   { key: 'discipline3', header: 'Ліцензування та сертифікація програмних продуктів', width: 15 },
  { key: 'discipline4', header: 'Надійність, діагностика та експлуатація КІСМ', width: 5 },
  { key: 'discipline5', header: 'Периферійні пристрої', width: 5 },
  { key: 'discipline6', header: 'Практика з компютерної схемотехніки', width: 5 },
  { key: 'discipline7', header: 'Системне програмування', width: 5 },
  { key: 'discipline8', header: 'Фізичне виховання', width: 5 },
  { key: 'discipline9', header: 'Філософія', width: 5},
  { key: 'rate', header: 'Середня оцінка', width: 15 },
  { key: 'skips1', header: 'Skips A', width: 10 },
//   { key: 'skips2', header: 'Skips B', width: 10 },
  { key: 'free', header: 'Free', width: 10 },
];

// Set subcategory labels for Name of Discipline
worksheet.getCell('B1').value = 'Назва дисциплін';
worksheet.getCell('B3').value = 'Іноземна мова (за професійним спрямуванням)';
worksheet.getCell('B3').alignment =  { textRotation: 90 };
worksheet.getCell('B3').font = { name: 'Times New Roman', family: 4, size: 10 , color: "#000000" };
worksheet.getCell('C3').value = 'Компютерні системи та мережі)';
worksheet.getCell('C3').alignment =  { textRotation: 90 };
worksheet.getCell('C3').font = { name: 'Times New Roman', family: 4, size: 10 , color: "#000000" };

// worksheet.getCell('С2').value = 'Компютерні системи та мережі';
// worksheet.getCell('D2').value = 'Ліцензування та сертифікація програмних продуктів';
worksheet.getCell('B1').alignment = { vertical: 'middle', horizontal: 'center', textRotation: 90 };

// Set subcategory labels for Name of Skips
worksheet.getCell('H1').value = 'Name of Skips';
worksheet.getCell('H1').alignment = { vertical: 'middle', horizontal: 'center', textRotation: 90 };

// Merge cells for subcategory labels
worksheet.mergeCells('A1:A3');
// Merge cells for the header row
// Merge cells for the header row
worksheet.mergeCells('B1:G1');
// worksheet.mergeCells('B1:B2');
// worksheet.mergeCells('C1:C2');
// worksheet.mergeCells('D1:D2');
// worksheet.mergeCells('E1:E2');
// worksheet.mergeCells('F1:F2');
// worksheet.mergeCells('G1:G2');
worksheet.mergeCells('B2:G2');
// console.log(worksheet.mergeCells('B2:G2'))
// Remove the bottom border between merged cells
// worksheet.getCell(mergedCellsRange.split(':')[0]).border = { bottom: { style: 'none' } };
// worksheet.getCell(mergedCellsRange2.split(':')[0]).border = { bottom: { style: 'none' } };
worksheet.mergeCells('H1:I1');
// worksheet.mergeCells('K1:K2');

// Set headers alignment
worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

// Generate random student data
// const students = generateRandomStudents(10);

// Populate student data
// students.forEach((student, index) => {
//   const rowIndex = index + 2;
//   worksheet.getCell(`A${rowIndex}`).value = student.name;
//   worksheet.getCell(`B${rowIndex}`).value = student.discipline1;
//   worksheet.getCell(`C${rowIndex}`).value = student.discipline2;
//   worksheet.getCell(`D${rowIndex}`).value = student.discipline3;
//   worksheet.getCell(`E${rowIndex}`).value = student.discipline4;
//   worksheet.getCell(`F${rowIndex}`).value = student.discipline5;
//   worksheet.getCell(`G${rowIndex}`).value = student.discipline6;
//   worksheet.getCell(`H${rowIndex}`).value = student.skips1;
//   worksheet.getCell(`I${rowIndex}`).value = student.skips2;
//   worksheet.getCell(`J${rowIndex}`).value = student.rate;
//   worksheet.getCell(`K${rowIndex}`).value = student.free;
// });

// Save the workbook
workbook.xlsx.writeFile('last.xlsx')
  .then(() => {
    console.log('Excel file generated successfully.');
  })
  .catch((error) => {
    console.log('An error occurred while generating the Excel file:', error);
  });

// Function to generate random student data
function generateRandomStudents(count) {
  const students = [];
  const disciplines = ['Math', 'Science', 'English', 'History', 'Geography', 'Art'];
  const skips = ['Yes', 'No'];
  const frees = ['Free 1', 'Free 2', 'Free 3', 'Free 4', 'Free 5'];

  for (let i = 0; i < count; i++) {
    const student = {
      name: `Student ${i + 1}`,
      discipline1: disciplines[Math.floor(Math.random() * disciplines.length)],
      discipline2: disciplines[Math.floor(Math.random() * disciplines.length)],
      discipline3: disciplines[Math.floor(Math.random() * disciplines.length)],
      discipline4: disciplines[Math.floor(Math.random() * disciplines.length)],
      discipline5: disciplines[Math.floor(Math.random() * disciplines.length)],
      discipline6: disciplines[Math.floor(Math.random() * disciplines.length)],
      rate: Math.floor(Math.random() * 10) + 1,
      skips1: skips[Math.floor(Math.random() * skips.length)],
      skips2: skips[Math.floor(Math.random() * skips.length)],
      free: frees[Math.floor(Math.random() * frees.length)],
    };
    students.push(student);
  }

  return students;
}
};





class Marks {
  constructor(subjectName, value) {
   this.subjectName = subjectName,
   this.value = value
}
}
class Student {
  constructor(name, surname, patronim, isBudget, absences, disrespectfulAbsences, marks) {
    // console.log('marks', marks)
      this.name = name;
      this.surname = surname;
      this.patronim = patronim;
      this.isBudget = isBudget;
      this.absences = absences;
      this.disrespectfulAbsences = disrespectfulAbsences;
      this.subjectName = marks.subjectName;
      this.value = marks.value
    //   this.marks = new Marks(marks.subjectName, marks.value)
  }
  saveAsCSV() {
    // fs.createWriteStream("../studentData4.xls");
    // const csv = `${this.name},${this.surname},${this.patronim}, ${this.isBudget}, ${this.absences}, ${this.disrespectfulAbsences}, ${this.subjectName}, ${this.value}\n`;
 
    // console.log('marks', this.marks);
    // console.log('subject', this.name)
    try {
        // fs.createWriteStream("../studentData4.xls", csv);
        console.log('The "data to append" was appended to file!');
    } catch (err) {
        console.error(err);
    }
}
}



const app = express()
app.use(cors());
app.use(express.json())
app.use("/auth", authRouter)

const start = async () => {
      
    // exportCountriesFile();
    //   data.students.forEach(student => {
    //     const students = new Student(student.name, student.surname, student.patronim, student.isBudget, student.absences, student.disrespectfulAbsences, ...student.marks);
    //     return students.saveAsCSV()
    //   })
    try {
        await mongoose.connect(`mongodb+srv://nazairenosko:passwordtest@clustertest.klwz1fk.mongodb.net/?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()


// const uri = "mongodb+srv://nazairenosko:<password>@clustertest.klwz1fk.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version



// app.use(express.json())
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// const start = async () => {
//     try {
//         // await mongoose.connect(uri);
//         await client.connect();
//         app.listen(PORT, () => console.log(`server started on port ${PORT}`))
//     } catch (e) {
//         console.log(e)
//     }
// }

// start()