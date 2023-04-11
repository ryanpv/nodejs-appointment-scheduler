import excelJS from "exceljs";

export const readExcelFile = async (req, res) => {
  const workbook = new excelJS.Workbook();
  const path = "controllers/admin/excelSheets";
  const fileName = "" // file name passed from req.query/req.params 

  try {
    const excelFileData = await workbook.xlsx.readFile(`${ path }/daySchedule.xlsx`) // ensure worksheet is in xlsx format for this method
      .then(() => {
        const getWorksheet = workbook.getWorksheet("Appointment List")
        const rowCount = getWorksheet.actualRowCount;
        const getRowsData = getWorksheet.getRows(1, rowCount).values();
        for (let row of getRowsData) {
          row.eachCell((cell, cellNum) => {
            console.log('cell value: ', cell.value);
            // console.log('cellNum: ', cellNum);
          });
        };
      });

  } catch (err) {
    console.log(err);
  };
};