const Genres = require('./Genres')
const data = [
    'Комедии',
    'Мультфильмы',
    'Ужасы',
    'Фантастика',
    'Триллеры',
    'Боевики',
    'Мелодрамы',
    'Детективы',
    'Приключения',
    'Фэнтези',
    'Военные',
    'Семейные',
    'Аниме',
    'Исторические',
    'Драмы',
    'Документальные',
    'Детские',
    'Криминал',
    'Биографии',
    'Вестерны',
    'Фильмы-нуар',
    'Спортивные',
    'Реальное ТВ',
    'Короткометражки',
    'Музыкальные',
    'Мюзиклы',
    'Ток-шоу',
    'Игры'
]

async function writeDataGenre(){
    const length = await Genres.count();
    if(length === 0){
        data.map((item, index) => {
            new Genres({
                name: item,
                key: index
            }).save()
        })
    }
}
module.exports = writeDataGenre