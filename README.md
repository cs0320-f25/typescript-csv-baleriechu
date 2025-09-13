# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.
Step 1: 
1. The parser spilts each line by a comma, which is an issue when there is a comma within the field itself.
2. The parser does not escape double quotes.
3. Spiltting occurs after one line is read, issue when you have multiple lines for a field.
4. Nothing different is done with headers, this could be an issue if we try to do something with the parsed data, same
reason why not checking that the data is consistent can be a problem (age being a number versus word).

- #### Step 2: Use an LLM to help expand your perspective.
Step 2:
Using the prompt given in the handout, the llm suggested adding delimiters, supporting quoting/escaping, 
newlines inside quotes, empty lines and trailing delimiters, whitespace, duplicate/blank headers, malformed rows, etc.
There is some overlap with what I thought of but I missed concerns about duplicate/blank headers and malformed rows.
When I modified the prompt in various ways in separate sessions, the llm gave very similar cases to handle but under slightly
different names. For example, it named "ragged rows" instead of malformed and "escape styles" instead of just mentioning
double quote escaping. Overall, the suggestions are about the same but different wording.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

1) Dealing with malformed rows (extensibility, llm)
2) Supporting double quotes and escaping (functionality, both)
3) Newlines inside quotes and whitespace (functionality, both)
4) Commas inside the field itself (functionality, me)

As a user of the CSV parser, I am able to provide a schema for which the CSV file will be validated and transformed so that the CSV data can be organized and structured.
Acceptance Criteria:
- The user can provide a specific schema for which the CSV rows will be validated and transformed.
- Fields with quotes, commas, whitespace, or newlines will be reflected in the output correctly.
- If there is invalid input, the user will see a specific error message. 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

My initial ideas were to alter the spiltting so that commas, quotes, and multiple lines can be part of a field and be preserved in the output. I also thought that headers should be used to ensure
data is consistent. The LLM suggested to add delimiters, support quoting/escaping, newlines, empty lines and trailing delimiters, etc. The results differed by prompt mainly in the owrding but the overall list given was the same. The more specific I made the prompt, the more specific the llm response was. The malformed rows resonated with me because I did not think about truly malformed data as in incorrect or inconsistent structure; I only thought about the case where there were empty fields but still valid structure (commas). 
### Design Choices
I used Zod schema to help validate data rather than have the parser itself validate. I decided that if there was invalid data, a error message would be returned to the user. I did not have it return any rows that were deemed valid because this makes it easier to debug rather than try to ignore the field(s) that were malformed and prevents data corruption.
### 1340 Supplement

- #### 1. Correctness
A CSV parser is correct if it can take in data, parse it, and return an output. General properties tests should be checking about the CSV parser is that it can read CSV files, 
spilt fields based on specified delimiters, and preserve quotes, newlines, whitespace, etc. either within or around a field. It should not be reposible for validating data 
but given a schema that should be used to ensure errors are returned if the data does not
adhere to the schema.

- #### 2. Random, On-Demand Generation
Given a function that randomly produces CSV data on demand, I might use this source of random data to expand the power of my testing by ensuring that my parser works properly on
a myriad of data types and data that I might not have thought of.


- #### 3. Overall experience, Bugs encountered and resolved
This sprint differed from prior programming assignments I have done because I did have never learned how to use a CSV parser before this and the code was given for me to modify. It was different because we were not told to "fix" the issues with the parser but to extend it to allow for data validation based on a schema given by the user. 
#### Errors/Bugs: 
Yes, I encountered minor bugs mainly with syntax and how to alter the code to accpete schema using Zod. I was able to fix them by talking to my peers, looking through the typescript thinking like an engineer document that was provided, and searching online.
#### Tests: 
The tests I implmented focused on specific areas concerning general functionality and edge cases. I tested cases where there is no header, no data at all, or if there were commas or quotes within the csv file that should be preserved or indicated that the contents was one field. For the zod schema, I specifically tested that the parser correctly transformed the data to the types given in the schema. I also tested that if the schema was undefined, then the parser would fall back to its original behavior before incorporating the schema functionality. I tried different schemas with different types, numbers of fields, and ensured that an error message would be returned if there was malformed data.
#### How To…
To run the tests, just do npm run test.
To build the program, npm build then use npm run on the build parser file.

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI): 
bhenok
#### Total estimated time it took to complete project: 7 hours
#### Link to GitHub Repo:  
