export interface Attendance {
    id: number,
    employeeId: number,
    employeeName: string,
    date: string,
    inTime: string,
    outTime: string,
    totalTime: number,
    attendanceStatus: number,
    attendanceRemark: string
}
