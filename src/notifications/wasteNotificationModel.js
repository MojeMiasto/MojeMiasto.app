import moment from 'moment';
import 'moment/locale/pl'
export const messageModel = (date, type, data) => {
    moment.locale('pl')
    const dateO = moment(date);
    const dateString = dateO.format("dddd, D MMMM YYYY");
    return {
        sound: 'default',
        title: 'Przypomnienie: śmieci',
        body: 'Czy pamiętasz o wywozie śmieci?\n'+type+' w dniu '+dateString,
        data: data
    };
}
