import { differenceInMilliseconds, format } from 'date-fns';
import { currentCulture } from './culture';

export const formatDateWithShortTime = (date: Date) => format(date, currentCulture.dateFormatWithShortTime);
export const formatDateWithTime = (date: Date) => format(date, currentCulture.dateFormatWithTime);
export const formatDate= (date: Date) => format(date, currentCulture.dateFormat);
export const formatTime = (date: Date) => format(date, currentCulture.time);
export const formatTimeToHour_Minute = (date: Date): string => date.toLocaleTimeString(currentCulture.value, {hour: "2-digit", minute: "2-digit"})

export const dateComparisonWithOutTime = (date: Date, otherDate: Date) => {
    return format(date, 'dd.MM.yyyy') === format(otherDate, 'dd.MM.yyyy');
};

export const formatDayAndMonth = (month: number, day: number) => {
    if (month < 1 || month > 12) throw new Error('Month must be in range 1-12');
    if (day < 1 || day > 31) throw new Error('Day must be in range 1-31');

    const date = new Date(new Date().getFullYear(), month-1, day);
    
    return format(date, currentCulture.dayOfYear, {locale:currentCulture.locale});
};

export const formatDistance = (date: Date, otherDate: Date, abs: boolean = false) => {
    // Берем разницу дат в секундах
    let delta = differenceInMilliseconds(date, otherDate) / 1000;

    if (abs) delta = Math.abs(delta);

    // Вычисляем количество ПОЛНЫХ дней
    let days = Math.floor(delta / 86400);
    // вычитаем из секунд количество дней, выраженных в секундах
    delta -= days * 86400;
    // В оставшихся секунд вычленяем количество полных часов
    let hours = Math.floor(delta / 3600) % 24;
    // Также их потом вычитаем, выразив в секундах
    delta -= hours * 3600;
    // Из оставшихся секунд берем минуты
    let minutes = Math.floor(delta / 60) % 60;
    // Опять вычитаем
    delta -= minutes * 60;
    // И секунды
    let seconds = Math.ceil(delta % 60);

    let value = '';

    if (days !== 0)
        value += `${days} д. `;
    if (hours !== 0)
        value += `${hours} ч. `;
    if (minutes !== 0)
        value += `${minutes} мин. `;

    value += `${seconds} с.`;

    return value;
}