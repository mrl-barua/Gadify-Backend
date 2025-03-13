export const gadify_checklist = `<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checklist</title>
    <style>
        @page {
            size: A4; /* Standard PDF page size */
            margin-top: 1in;
            margin-bottom: 1in;
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            margin: 0;
            padding: 0;
        }

        .report_body {
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

        .table_body table {
            width: 100%;
            border-collapse: collapse;
            page-break-inside: auto;
        }

        .table_head {
            text-align: center;
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

        /* Ensures each table row does not split across pages */
        tr {
            page-break-inside: avoid;
        }

        /* Forces page breaks after the table for cleaner formatting */
        .page-break {
            page-break-before: always;
        }

        .ending_details {
            padding: 10px;
            margin-top: 50px;
            background-color: #BEBEBE;
        }

        .ending_details_header{
            text-align: center;
            font-size: 12px;
            font-weight: bold;}
                .flex-container {
            display: flex;
            flex-direction: column; 
            gap: 10px;
        }

        .flex-row {
            display: flex;
            justify-content: space-between; 
            align-items: left; 
        }

        .score {
            font-weight: bold;
            text-align: left;
            width: 15%; 
        }

        .description {
            text-align: left;
            width: 80%; 
        }

    </style>
</head>

<body>
    <section class="report_body">
        <header>
            <h5 class="checklist_header">Summary checklist for the assessment of proposed projec</h1>
        </header>
        <main>
            <div class="project_title">
                <p><strong>PROJECT TITLE:</strong> {{submission.proposalTitle}}</p>
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
