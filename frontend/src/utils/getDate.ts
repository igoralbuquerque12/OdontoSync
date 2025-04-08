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
