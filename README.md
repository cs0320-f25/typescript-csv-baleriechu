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
data is consistent. The LLM suggested to add delimiters, support quoting/escaping, newlines, empty lines and trailing delimiters, etc. The results differed by prompt mainly in the owrding but the overall list given was the same. The more specific I made the prompt, the more specific the llm response was. The malformed rows resonated with me because I did not think about truly malformed data as in incorrect or inoncistent structure; I only thought about the case where there were empty fields but still valid structure (commas).
### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
#### Total estimated time it took to complete project: 7 hours
#### Link to GitHub Repo:  
