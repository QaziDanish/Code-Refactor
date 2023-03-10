# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

#  Ticket No 1
Title: DB--> Data Dev Ticket --> Add New Table in database for new feature request of having Custom Agent IDs for facilities

Description:
As we are going to allow our facilities to have the custom IDs for the agent they work on different shifts. so for that we need to have a table in database which can store the custom IDs from facilities and map those custom IDs with our Internal database agent table's IDs. so following would be the structure of new table that would store custom IDs of the agents.

CREATE table Agent_Custom_mapping (
Agent_Custom_mapping_id INT AUTO_INCREMENT,
agent_id INT,
facility_id INT,
agent_custom_id varchar(50),
added_date datetime,
added_by datetime,
modified_by varchar(50),
modified_date datetime,
PRIMARY KEY (Agent_Custom_mapping_id),
FOREIGN KEY (agent_id) REFERENCES Agents(agent_id),
FOREIGN KEY (facility_id) REFERENCES products(facility_id)
);

Acceptance criteria:
Please make sure that the table with above structure should be created in all the DB environments (DEV, UAT and PROD).
Please create the Pull request of the SQL structure by targeting the DEV branch
SQL script should include the changes verification script that can be used to DBA after executing the pull request script to make sure that new table has been created in DEV environment
Once the table structure and pull request is approved and merged in DEV then please make sure that it should promote to UAT and PROD environment before the actual code changes release to UAT and PROD.

 # Ticket No 2
Title: Front End--> Front End Ticket --> Add New form to add functionality of assigning custom Ids to agents

Description:
Since we are going to provide the functionality of assigning custom IDs to agents so please develop the front end form as per design provided by the project designer, and consume the backend services to assign the custom ID to single agent and bulk custom ID assignment to multiple agent at a time via importing excel file. the sample excel template is attached with the ticket.

Acceptance criteria:
Please develop Front end form for assigning custom IDs to agent as per the attached design provided by designer.
Please also integrate the existing agent search component in the form
Please add the section for importing the excel sheet for importing excel sheet that contains custom agent IDs mapping with existing agent IDs
please add the front end validations as per instruction of designers and BAs
please add front end validation to make sure that the excel sheet is as per the template of our bulk custom ID assignment

 # Ticket No 3
Title: Back End--> Back End Ticket --> Develop back end services to create, update and delete custom agent IDs for facilities

Description:
Please follow clean architecture to develop back end services to develop services to create, update and delete custom agent IDs for facilities.

Acceptance Criteria:
Please make sure to add/update the Agent_Custom_mapping table through back end API end points
The names of end point routes should be as per our API standards
In case of bulk insert please make sure to disable any indexes on table before making bulk insert and rebuild indexes after bulk insert
please make sure to have proper exceptional handling and proper error messaging so that proper messages can be displayed at front end
Please make sure that you should be reading the right aws s3 bucket where FE suppose to store data through AWS s3 sdk

#  Ticket No 4
Title: Back End--> Back End Ticket --> Update agent reports logic to include custom agent IDs as well in agent reports

Description:
Please update agent reports logic so that reports can also be pulled based on custom agent ID assigned by facilities.

Acceptance Criteria:
Please change the reports query to include Agent_Custom_mapping in the stored procedure which should check if the @is_custom_Id_report parameter is true and there are custom_IDs available in input parameters then report should be based on agent custom ids from table Agent_Custom_mapping  
Please add new parameter in stored procedure if required
please change the business model class and repository class if the results sets are changed
Please make sure to use correct join on correct columns in report query
Please add the new column of custom agent ID in report along with other name in closed brackest like 'Fac-1-Test (Qazi Danish)'
