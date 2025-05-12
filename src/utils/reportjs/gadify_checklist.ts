export const gadify_checklist = `



<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checklist</title>
   <style>
    /* Global Styles */
        @page {
            size: A4;
            margin-top: 1in;
            margin-bottom: 1in;
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            margin: 0;
            padding: 0;
        }

        /* Certificate Header Styles */
        .certificate_table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            border: 1px solid black;
        }

        .certificate_header_table_head th {
            text-align: center;
            vertical-align: middle;
            padding: 10px;
            border: 1px solid black;
        }

        .university_logo {
            width: 20%;
            text-align: center;
            vertical-align: middle;
        }

        .university_logo img {
            display: block;
            margin: 0 auto;
        }

        .university_details {
            width: 80%;
            text-align: center;
            vertical-align: middle;
            display: table-cell;
        }

        .university_details p,
        .university_details h1 {
            text-align: center;
        }

        .university_details p {
            font-size: 8px;
            font-weight: normal;
        }

        .university_details h1 {
            font-size: 12px;
        }

        .university_details a {
            text-decoration: none;
            color: inherit;
        }

        /* Project Information Section Styles */
        .project_information {
            margin: 0;
            padding-left: 0.5in;
            padding-right: 0.5in;
        }

        .project_information_table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            border: 1px solid black;
        }

        .project_information th,
        .project_information td {
            text-align: left;
            border: 1px solid black;
            padding: 8px;
        }

        .title_column {
            width: 30%;
            font-weight: bold;
            background-color: #f0f0f0;
        }

        .details_column {
            width: 70%;
        }


        /* Form Title */
        .form_title {
            text-align: center;
            font-weight: bold;
            font-size: 14px;
            padding: 10px;
        }

        /* Report Body Styles */
        .report_body,
        .certificate_header {
            margin: 0;
            padding: 0.5in;
        }

        .checklist_header {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
        }

        .summary_checklist {
            text-align: center;
            margin-top: 20px;
        }

        /* Table Styles */
        .table_body table {
            width: 100%;
            border-collapse: collapse;
            page-break-inside: auto;
        }

        .table_body th,
        .table_body td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }

        .table_body th {
            background-color: #BEBEBE;
        }

        tr {
            page-break-inside: avoid;
        }

        .page-break {
            page-break-before: always;
        }

        /* Ending Details Section */
        .ending_details {
            padding: 10px;
            margin-top: 50px;
            background-color: #BEBEBE;
        }

        .ending_details_header {
            text-align: center;
            font-size: 12px;
            font-weight: bold;
        }

        /* Flexbox Layouts */
        .flex-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .flex-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }

        /* Scoring and Description */
        .score {
            font-weight: bold;
            text-align: left;
            width: 15%;
        }

        .description {
            text-align: left;
            width: 80%;
        }
        
        .page-break {
            page-break-before: always;
        }
</style>
</head>

<body>
    <section class="certificate_header">
    <div class="certificate_header_table_body">
       <table class="certificate_table">
            <thead class="certificate_header_table_head">
                <tr>
                    <th class="university_logo">
                        <img src="/logo.png" alt="University Logo" width="100"
                            onerror="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/en/1/18/University_of_Southeastern_Philippines_logo.png';">
                    </th>
                    <th class="university_details">
                        <p>Republic of the Philippines</p>
                        <h1>University of Southeastern Philippines</h1>
                        <p>Iñigo St., Bo. Obrero, Davao City 8000</p>
                        <p>Telephone: (082) 227-8192</p>
                        <p>Website: <a href="https://www.usep.edu.ph">www.usep.edu.ph</a></p>
                        <p>Email: <a href="mailto:president@usep.edu.ph">president@usep.edu.ph</a></p>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="2" class="form_title">GENDER MAINSTREAMING REVIEW FORM</td>
                </tr>
            </tbody>
        </table>
    </div>
    </section>
    <br></br>
    <p style="margin-left: 0.5in;">Kindly provide all the required information on this form.</p>
    
    <section class="project_information">
        <div class="project_information_table_body">
        <table class="project_information_table">
                <thead>
                    <tr>
                        <th class="title_column">TITLE OF THE PROPOSAL</th>
                        <th class="details_column">{{evaluatedSubmission.proposalTitle}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="2"> 
                          <strong>NAME OF THE PROPONENT/S:   </strong>{{evaluatedSubmission.proponent.fullName}}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                             <strong> OFFICE/UNIT: </strong>{{evaluatedSubmission.proponent.department.departmentName}}   
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                             <strong> PROGRAM/PROJECT DESCRIPTION: </strong> {{evaluatedSubmission.proposalDescription}}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1">
                             <strong>SCORE: </strong> {{evaluatedSubmission.totalScore}} 
                        </td>
                        <td colspan="1">
                             <strong>REMARKS: </strong> <br></br/> {{evaluatedSubmission.gadScoreRemark}}    
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                             <strong>REVIEWED BY THE COMMITTEE: </strong>   
                             <p>Evaluator: {{evaluator.fullName}}</p>
                            
                             <p> <strong>Date Requested:  <u>{{evaluatedSubmission.requestedAt}}</u></strong></p> 
                             <p> <strong>Date Reviewed: <u>{{evaluatedSubmission.evaluatedAt}}</u></strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                        <br></br>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    
    <section class="report_body">
        <header class="page-break">
            <h5 class="checklist_header">Summary checklist for the assessment of proposed project</h1>
        </header>
        <main>
            <div class="project_title">
                <p><strong>TITLE OF THE PROPOSAL:</strong> {{evaluatedSubmission.proposalTitle}}</p>
            </div>
            <div class="summary_checklist">
                <p><strong>Box 7.</strong> Summary checklist for the assessment of proposed projects</p>
            </div>
            <div class="table_body">
                <table>
                    <thead class="table_head">
                        <tr>
                            <th rowspan="2">Element and item/question (col.1)</th>
                            <th colspan="3">Done? (col. 2)</th>
                            <th rowspan="2">Score for an item/element* (col. 3)</th>
                            <th rowspan="2">Results or comments (col. 4)</th>
                        </tr>
                        <tr>
                            <th>No (2a)</th>
                            <th>Partly (2b)</th>
                            <th>Yes (2c)</th>
                        </tr>
                    </thead>
                    <tbody>
                    {{#each assessments}}
                        <tr>
                        {{#if section.isMainSection}}
                            <td><strong>{{section.element}}</strong></td>
                        {{else}}
                            <td style="padding-left: 20px;">
                            <em>{{section.element}}</em>
                            </td>
                        {{/if}}
                        <td>{{#if doneNo}}✔{{/if}}</td>
                        <td>{{#if donePartly}}✔{{/if}}</td>
                        <td>{{#if doneYes}}✔{{/if}}</td>
                        {{#if section.isMainSection}}
                            <td style="border: 5px solid black; background-color: #d3d3d3;">{{score}}</td>
                        {{else}}
                             <td>{{score}}</td>
                        {{/if}}
                        <td>{{comments}}</td>
                        </tr>
                    {{/each}}
                    <tr style="background-color: #d3d3d3;">
                        <td colspan="4"></td>
                        <td><strong>{{evaluatedSubmission.totalScore}}</strong></td>
                        <td><strong>{{evaluatedSubmission.gadScoreRemark}}</strong></td>
                    </tr>
   
                    </tbody>
                </table>
            </div>
            <div class="page-break"></div> <!-- Ensures content after the table starts on a new page -->
            <div class="ending_details">
                <p class="ending_details_header">Interpretation of the GAD Score</p>
               <div class="flex-container">
                <div class="flex-row">
                    <div class="score">0-3.9</div>
                    <div class="description">GAD is invisible in the project (proposal is returned).</div>
                </div>
                
                <div class="flex-row">
                    <div class="score">4.0-7.9</div>
                    <div class="description">Proposed project has promising GAD prospects (proposal earns a 'conditional pass').</div>
                </div>

                <div class="flex-row">
                    <div class="score"></div>
                    <div class="description">pending identification of gender issue/s and strategies and activities to address these, </div>
                </div>

                <div class="flex-row">
                    <div class="score"></div>
                    <div class="description">and inclusion of the collection of sex-disaggregated data in the monitoring and</div>
                </div>

                    <div class="flex-row">
                    <div class="score"></div>
                    <div class="description">valuation plan).</div>
                </div>

                <div class="flex-row">
                    <div class="score">8.0-14.9</div>
                    <div class="description">Proposed project is <strong>gender-sensitive</strong> (proposal passes the GAD test).</div>
                </div>

                    <div class="flex-row">
                        <div class="score">15.0-20.0</div>
                        <div class="description">Proposed project is <strong>gender-responsive</strong> (proponent is commended).</div>
                    </div>
                </div>
                <br/>
            </div>
        </main>
    </section>
</body>

</html>

`;

export default gadify_checklist;
