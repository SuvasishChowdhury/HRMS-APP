export interface Attendance {
    id: number,
    employeeId: number,
    employeeName: string,
    cardNo: string,
    date: string,
    inTime: string,
    outTime: string,
    totalTime: number,
    attendanceStatus: number,
    remarks: string,
}
