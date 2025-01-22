import { Attendance } from "./attendance";

export interface DashboardVM {
    inTime: string;
    outTime: string;
    totalLeaveApplication: string,
    totalPendingLeaveApplication: string,
    totalOtherApplication: string,
    totalOtherPendingApplication: string,
    shiftStartTime : string,
    shiftEndTime : string,
    lastSevendDaysAttendance:  Attendance[]
}
