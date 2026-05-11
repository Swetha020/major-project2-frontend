# Anvaya CRM Dashboard

The Anvaya CRM app focuses on lead management with defined steps for each lead's lifecycle. We can assign sales agents to leads and allow users to add comments or updates to each lead.

---

## Demo Link

Explore the Application here:
[Live Demo](https://major-project2-frontend.vercel.app/).

---

## Quick Start

```
git clone https://github.com/Swetha020/major-project2-frontend.git
cd major-project2-frontend
npm install
npm run dev
```

---

## Technologies

- React JS
- React Router
- Node.js
- Express
- MongoDB


## Video Walkthrough

Watch a walkthrough (6 minutes) of all major features of this app: [Project Walkthrough](https://drive.google.com/file/d/1EuBLTPKy1_TIVSWzxZq5DDXPTp2m6lSf/view?usp=sharing)

---

## Features

**Dashboard Page**
- Recent leads section for quick access to newly added leads.
- Interactive status cards displaying lead counts.
- View All Leads Add New Lead button for viewing and adding new leads.

**Leads**
- Color-coded leads list with status, priority and agent assigned to the lead.
- Filter box with URL based filtering - Filter leads by Assigned sales agent and Lead status
- Sorting leads by Priority level and Estimated closing date
- Clickable leads redirecting to individual lead detail pages.

**Lead Details Page**
- Lead's complete details are displayed.
- Comment section where comments are displayed and new comments can be added.
-Edit lead functionality with pre-filled update forms.

**Add Lead Form**
- Form to create a new lead.
- Form validation to ensure accurate data entry.

**Sales Agent Page**
- Page displaying all sales representatives.
- View Leads button to see leads assigned to specific agent. 
- Add new sales agents through a dedicated form.
- Delete functionallity for removing agents

**Reports Page**
- Detailed report page
- Donut chart displaying the leads in pipeline and leads closed.
- Bar Chat displaying the agent's total leads and leads closed.
- Pie Chart displaying the number of leads based upon their status.

**Settings Page**
- User details are displayed
- Delete functionality removes the sales agent.

**Additional Features**
- Persistent sidebar navigation available on all pages.
- Active page highlighting for improved usability.
- Toast notifications and loading indicators throughout the application.

---

## API Reference

### POST /api/leads
Add new Lead <br/>
Sample Response:
```
{
    message: "Lead added successfully",
    lead: {_id, name, source, salesAgent, status, tags, timeToClose, priority,ClosedAt, ...}
}
```

### POST /api/leads/:leadId
Update new lead <br/>
```
{_id, name, source, salesAgent, status, tags, timeToClose, priority,ClosedAt, ...}
```

### GET /api/leads

List All Leads <br/>
Sample Response:

```
 {{_id, name, source, salesAgent, status, tags, timeToClose, priority,ClosedAt, ...}, {...}}

```

### GET /api/leads/:id

Get details of one Lead  <br/>
Sample Response:

```
{_id, name, source, salesAgent, status, tags, timeToClose, priority,ClosedAt, ...}

```

### GET /api/leads/:id/comments

Get all comments of the lead  <br/>
Sample Response:

```
{{ _id, lead, author, commentText, ... },{...}}
```

### POST /api/leads/:id/comments

Add a new comment  <br/>
Sample Response:
```
{ _id, lead, author, commentText, ... }
```

### GET /api/agents
Get All Agents <br/>
Sample Response:
```
  {{_id, image, name, email, ...}, {...}}
```

### DELETE /api/address/:addressId

Delete an agent<br/>
Sample Response:
```
{
    message: "Agent deleted successfully.",
    Agent: {_id, image, name, email, ...}
}
```
### POST /api/agents

Add a new agent<br/>
Sample Response:

```
    {message: "Agent added successfully",
    salesAgent: {_id, image, name, email, ...}}

```

---

## Contact

For Bugs or feature requests, please contact swetha00200@gmail.com