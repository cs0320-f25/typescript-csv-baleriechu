import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const EMPTY_VALUES_CSV_PATH = path.join(__dirname, "../data/empty_fields.csv");
const NO_HEADER_CSV_PATH = path.join(__dirname, "../data/no_header.csv");
const NO_DATA_CSV_PATH = path.join(__dirname, "../data/no_data.csv");
const COMPLEX_DATA_CSV_PATH = path.join(__dirname, "../data/complex_data.csv");

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