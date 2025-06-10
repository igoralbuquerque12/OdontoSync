export function formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') 
    const day = String(date.getDate()).padStart(2, '0')

    const dateFormat = `${year}-${month}-${day}`

    return dateFormat
} 

export function getWeekStartEndDates(): [string, string] {
    const today: Date = new Date();
    
    const dayOfWeek: number = today.getDay(); 

    const diffToMonday: number = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const mondayOfThisWeek: Date = new Date(today);
    mondayOfThisWeek.setDate(today.getDate() - diffToMonday);

    const saturdayOfThisWeek: Date = new Date(mondayOfThisWeek);
    saturdayOfThisWeek.setDate(mondayOfThisWeek.getDate() + 5);

    const formatDate = (date: Date): string => {
        const year: number = date.getFullYear();
        const month: string = String(date.getMonth() + 1).padStart(2, '0');
        const day: string = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const mondayStr: string = formatDate(mondayOfThisWeek);
    const saturdayStr: string = formatDate(saturdayOfThisWeek);

    return [mondayStr, saturdayStr];
}