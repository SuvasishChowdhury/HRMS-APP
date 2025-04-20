export interface CalendarVM {
    holiDay : HoliDay[],
    offDay : OffDay[],
    weekend : Weekend[],
    weekendDay : number[]
}

export interface OffDay{
    title : string,
    description : string,
    applicableDate : string
}

export interface HoliDay{
    hoildayName : string,
    description : string,
    fromDate : string,
    toDate : string,
}
export interface Weekend{
    weekend : string,
    description : string
}

export interface WeekendDay{
    weekendDay : number
}
