const Country = require('./country')
const data = [
    'Казахстан',
    'Россия',
    'СССР',
    'США',
    'Франция',
    'Южная Корея',
    'Великобритания',
    'Япония',
    'Италия',
    'Испания',
    'Германия',
    'Турция',
    'Швеция',
    'Дания',
    'Норвегия',
    'Гонконг',
    'Австралия',
    'Бельгия',
    'Нидерланды',
    'Греция',
    'Австрия'
]

async function writeDataCountry(){
    const length = await Country.count();
    if(length == 0){
        data.map((item, index) => {
            new Country({
                name: item,
                key: index
            }).save()
        })
    }
}
module.exports = writeDataCountry