const dayWeekList = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

/**
 * Returns today's date as an array containing the day of the week (string), month (number), and year (number).
 * @returns A tuple containing [day of the week, month, year].
 */
export function getDateToday(): [string, number, number] {
    const today = new Date();

    const dateWeek = dayWeekList[today.getDay()];
    const dateMonth = today.getMonth() + 1;
    const dateYear = today.getFullYear();

    return [dateWeek, dateMonth, dateYear]
}