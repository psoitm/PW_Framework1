import ExcelJS from 'exceljs';

export class ExcelUtils {

    static async readExcel(filePath, sheetName) {

        const workbook = new ExcelJS.Workbook();

        await workbook.xlsx.readFile(filePath);

        const worksheet = workbook.getWorksheet(sheetName);

        if (!worksheet) {
            throw new Error(`Sheet '${sheetName}' not found`);
        }

        const data = [];

        const headers = worksheet.getRow(1).values.slice(1);

        worksheet.eachRow((row, rowNumber) => {

            if (rowNumber === 1) return;

            const rowData = {};

            headers.forEach((header, index) => {
                rowData[header] = row.getCell(index + 1).value;
            });

            data.push(rowData);
        });

        return data;
    }


    static async writeExcel(filePath, sheetName, data) {

        const workbook = new ExcelJS.Workbook();

        try {
            await workbook.xlsx.readFile(filePath);
        } catch {
            // File doesn't exist, create a new workbook
        }

        let worksheet = workbook.getWorksheet(sheetName);

        if (!worksheet) {
            worksheet = workbook.addWorksheet(sheetName);
        }

        worksheet.addRow(data);

        await workbook.xlsx.writeFile(filePath);
    }


    static async getCellValue(filePath, sheetName, cell) {

        const workbook = new ExcelJS.Workbook();

        await workbook.xlsx.readFile(filePath);

        const worksheet = workbook.getWorksheet(sheetName);

        return worksheet.getCell(cell).value;
    }


    static async setCellValue(filePath, sheetName, cell, value) {

        const workbook = new ExcelJS.Workbook();

        await workbook.xlsx.readFile(filePath);

        const worksheet = workbook.getWorksheet(sheetName);

        worksheet.getCell(cell).value = value;

        await workbook.xlsx.writeFile(filePath);
    }
}