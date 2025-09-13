import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import * as z from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const EMPTY_VALUES_CSV_PATH = path.join(__dirname, "../data/empty_fields.csv");
const NO_HEADER_CSV_PATH = path.join(__dirname, "../data/no_header.csv");
const NO_DATA_CSV_PATH = path.join(__dirname, "../data/no_data.csv");
const COMPLEX_DATA_CSV_PATH = path.join(__dirname, "../data/complex_data.csv");
const PEOPLE_NO_HEADER_CSV = path.join(__dirname, "../data/people_no_header.csv");
const STUDENT_CSV = path.join(__dirname, "../data/student.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parseCSV works with empty values", async () => {
  const results = await parseCSV(EMPTY_VALUES_CSV_PATH)
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age", "gender"]);
  expect(results[1]).toEqual(["Alice", "23", "Female"]);
  expect(results[2]).toEqual(["", "30", "Male"]); 
  expect(results[3]).toEqual(["Charlie", "", ""]);
  expect(results[4]).toEqual(["Nim", "", "Male"]);
});

test("empty data", async () => {
  const results = await parseCSV(NO_DATA_CSV_PATH)
  expect(results).toHaveLength(0);
  expect(results).toEqual([]);
});

test("parseCSV works with no header", async () => {
  const results = await parseCSV(NO_HEADER_CSV_PATH)
  expect(results).toHaveLength(4);
  expect(results[0]).toEqual(["Alice", "23"]);
  expect(results[1]).toEqual(["Bob", "30"]); 
  expect(results[2]).toEqual(["Charlie", "25"]);
  expect(results[3]).toEqual(["Nim", "22"]);
});

test("parseCSV works with fields that contain commas", async () => {
  const results = await parseCSV(COMPLEX_DATA_CSV_PATH)
  expect(results).toHaveLength(4);
  expect(results[0]).toEqual(["name", "initial"]);
  expect(results[1]).toEqual(["Jane, Mary", "M.J"]);
  expect(results[2]).toEqual(["Dill, Bob", "B.D"]); 
});

test("parseCSV works with fields that contain double quotes", async () => {
  const results = await parseCSV(COMPLEX_DATA_CSV_PATH)
  expect(results[3]).toEqual(['"Doe", John', "J.D"]); 
});

// modified parser tests
test("parseCSV transforms name to string and age to a number", async () => {
const peopleSchema = z.tuple([z.string(), z.coerce.number()])
.transform(arr => ({name: arr[0], age: arr[1]}))

  const results = await parseCSV(PEOPLE_NO_HEADER_CSV, peopleSchema)
  expect(results[0]).toEqual({name: "Alice", age: 23});
  expect(results[1]).toEqual({name: "Bob", age: 30});
  expect(results[2]).toEqual({name: "Charlie", age: 25}); 
  expect(results[3]).toEqual({name: "Nim", age: 22}); 
});

test("parseCSV works by returning a 2D array even no schema is given", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); 
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV returns a error message when data cannot be transformed based on the schema", async () => {
  const peopleSchema = z.tuple([z.string(), z.coerce.number()])
  .transform(arr => ({name: arr[0], age: arr[1]}))
  const results = await parseCSV(COMPLEX_DATA_CSV_PATH, peopleSchema)
  expect(results).toEqual("invalid data found")
});

test("parseCSV transforms email correctly", async () => {
  const studentSchema = z.tuple([z.string(), z.coerce.number(), z.string()])
  .transform(arr => ({name: arr[0], age: arr[1], email: arr[2]}))
  const results = await parseCSV(STUDENT_CSV, studentSchema)
  expect(results[0]).toEqual({name: "Alice", age: 21, email: "alice@gmail.com"});
  expect(results[1]).toEqual({name: "Bob", age: 11, email: "bob@brown.edu"});
  expect(results[2]).toEqual({name: "Sally", age: 19, email: "sally@yahoo.com"}); 
});