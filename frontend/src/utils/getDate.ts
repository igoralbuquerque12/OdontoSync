const nameDay = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const nameMonth: [string, string, string, string, string, string, string, string, string, string, string, string] = ["Janeiro", "Fevereiro",  "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

/**
 * Returns today's date as an array containing the day of the week (string), day of the month (number), month (string), and year (number).
 * @returns A tuple containing [day of the week, day of the month, month, year].
 */
export function getDateToday(): [string, number, string, number] {
    const today = new Date();

    const dateWeek = nameDay[today.getDay()];
    const dateDay = today.getDate();  

    const dateMonth = nameMonth[today.getMonth() + 1]; 

    const dateYear = today.getFullYear();

    return [dateWeek, dateDay, dateMonth, dateYear];
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