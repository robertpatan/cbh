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

1. Add a custom ID column to the `Agents` table
- Acceptance Criteria:
    - a new column named `custom_id` is added to the `Agents` table in the database
    - the column_id is optional and can be empty/null
    - you can use both the database id and custom_id to generate reports
- Effort Estimate: 1-2h
- Implementation details:
    - create a database migration to add the new custom_id column to the Agents table
    - update the Agents model to include the new custom_id property
    - update the Agents CRUD to support setting and retrieving the custom_id field

2. Update the `getShiftsByFacility` function to use custom_id
- Acceptance Criteria:
    - the Shifts list metadata must include the new custom_id
- Effort Estimate: 30m
- Implementation details:
    - modify the query to select the Agents `custom_id`
    - add the `custom_id` to the list metadata

3. Update the `generateReport` function to use the Agents custom id
- Acceptance Criteria:
    - the Agents `custom_id` is displayed if present instead of the database id
- Effort Estimate: 1h
- Implementation details:
    - modify the function to use the Agents `custom_id` if present, if not, default to the primary database id
    - the method should override the database id with the `custom_id` and serve the PDF view only an `id` property to not duplicate the checks

