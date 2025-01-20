import { Attendance } from "./attendance";

export interface Dashboardinfo {
    inTime: string;
    outTime: string;
    totalLeaveApplication: string,
    totalPendingLeaveApplication: string,
    totalOtherApplication: string,
    totalOtherPendingApplication: string,
    lastSevenDaysAttendance:  Attendance[]
}
