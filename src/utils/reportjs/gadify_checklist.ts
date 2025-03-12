export const gadify_checklist = `<!DOCTYPE html>
<html lang="en">

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
            padding: 1in;
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
            background-color: #f2f2f2;
        }

        .ending_details {
            padding: 50px;
            margin-top: 50px;
            background-color: gray;
        }

        /* Ensures each table row does not split across pages */
        tr {
            page-break-inside: avoid;
        }

        /* Forces page breaks after the table for cleaner formatting */
        .page-break {
            page-break-before: always;
        }
    </style>
</head>

<body>
    <section class="report_body">
        <header>
            <h1 class="checklist_header">GAD CHECKLIST</h1>
        </header>
        <main>
            <div class="project_title">
                <p><strong>PROJECT TITLE:</strong> {{projectTitle}}</p>
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
                    {{#each table}}
                        <tr>
                        {{#if isMainSection}}
                            <td><strong>{{element}}</strong></td>
                        {{else}}
                            <td style="padding-left: 20px;">
                            <em>{{element}}</em>
                            </td>
                        {{/if}}
                        <td>{{#if done.no}}✔{{/if}}</td>
                        <td>{{#if done.partly}}✔{{/if}}</td>
                        <td>{{#if done.yes}}✔{{/if}}</td>
                        {{#if isMainSection}}
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
            <div class="ending_details"></div>
        </main>
    </section>
</body>

</html>
`;

export default gadify_checklist;
