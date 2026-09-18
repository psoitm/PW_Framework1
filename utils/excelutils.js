import path from 'path';
import ExcelJS from 'exceljs';

export class ExcelUtils {
    static resolveFilePath(filePath) {
        return path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
    }

    static async readExcel(filePath, sheetName) {
        const resolvedFilePath = this.resolveFilePath(filePath);
        const workbook = new ExcelJS.Workbook();

        await workbook.xlsx.readFile(resolvedFilePath);

        const worksheet = workbook.getWorksheet(sheetName);

        if (!worksheet) {
            throw new Error(`Sheet '${sheetName}' not found in '${resolvedFilePath}'`);
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
        const resolvedFilePath = this.resolveFilePath(filePath);
        const workbook = new ExcelJS.Workbook();

        try {
            await workbook.xlsx.readFile(resolvedFilePath);
        } catch {
            // File doesn't exist; create a new workbook.
        }

        let worksheet = workbook.getWorksheet(sheetName);

        if (!worksheet) {
            worksheet = workbook.addWorksheet(sheetName);
        }

        worksheet.addRow(data);
        await workbook.xlsx.writeFile(resolvedFilePath);

        return resolvedFilePath;
    }

    static async getCellValue(filePath, sheetName, cell) {
        const resolvedFilePath = this.resolveFilePath(filePath);
        const workbook = new ExcelJS.Workbook();

        await workbook.xlsx.readFile(resolvedFilePath);

        const worksheet = workbook.getWorksheet(sheetName);

        if (!worksheet) {
            throw new Error(`Sheet '${sheetName}' not found in '${resolvedFilePath}'`);
        }

        return worksheet.getCell(cell).value;
    }

    static async setCellValue(filePath, sheetName, cell, value) {
        const resolvedFilePath = this.resolveFilePath(filePath);
        const workbook = new ExcelJS.Workbook();

        await workbook.xlsx.readFile(resolvedFilePath);

        const worksheet = workbook.getWorksheet(sheetName);

        if (!worksheet) {
            throw new Error(`Sheet '${sheetName}' not found in '${resolvedFilePath}'`);
        }

        worksheet.getCell(cell).value = value;
        await workbook.xlsx.writeFile(resolvedFilePath);
    }
}