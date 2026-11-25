import imgSyrnyky from '../images/syrnyky.jpg'

export const RECIPE_OF_DAY_ID = 1

export const initialIngredients = [
  { id: 1, name: 'Кисломолочний сир', amountPerPortion: 125, unit: 'г' },
  { id: 2, name: 'Яйце куряче', amountPerPortion: 0.5, unit: 'шт.' },
  { id: 3, name: 'Борошно пшеничне', amountPerPortion: 15, unit: 'г' },
  { id: 4, name: 'Цукор', amountPerPortion: 10, unit: 'г' },
  { id: 5, name: 'Ванільний цукор', amountPerPortion: 2, unit: 'г' },
  { id: 6, name: 'Дрібка солі', amountPerPortion: 1, unit: 'г' },
  { id: 7, name: 'Олія для смаження', amountPerPortion: 5, unit: 'мл' },
  { id: 8, name: 'Свіжі або заморожені ягоди', amountPerPortion: 50, unit: 'г' },
  { id: 9, name: 'Мед для соусу', amountPerPortion: 10, unit: 'г' }
]

export const recipesList = [
  {
    id: 1,
    title: 'Сирники з ягідним соусом',
    category: 'Сніданок',
    cookingTime: 35,
    ingredientsCount: 9,
    image: imgSyrnyky,
    isVegetarian: true
  },
  {
    id: 2,
    title: 'Український борщ з пампушками',
    category: 'Обід',
    cookingTime: 90,
    ingredientsCount: 12,
    image: '',
    isVegetarian: false
  },
  {
    id: 3,
    title: 'Салат з авокадо та кіноа',
    category: 'Вечеря',
    cookingTime: 20,
    ingredientsCount: 7,
    image: '',
    isVegetarian: true
  },
  {
    id: 4,
    title: 'Шарлотка з яблуками та корицею',
    category: 'Десерт',
    cookingTime: 50,
    ingredientsCount: 6,
    image: '',
    isVegetarian: true
  },
  {
    id: 5,
    title: 'Вівсянка з карамелізованим бананом',
    category: 'Сніданок',
    cookingTime: 15,
    ingredientsCount: 5,
    image: '',
    isVegetarian: true
  },
  {
    id: 6,
    title: 'Крем-суп із запеченого гарбуза',
    category: 'Обід',
    cookingTime: 40,
    ingredientsCount: 8,
    image: '',
    isVegetarian: true
  },
  {
    id: 7,
    title: 'Запечений лосось зі спаржею',
    category: 'Вечеря',
    cookingTime: 30,
    ingredientsCount: 6,
    image: '',
    isVegetarian: false
  },
  {
    id: 8,
    title: 'Львівський сирник у шоколадній глазурі',
    category: 'Десерт',
    cookingTime: 65,
    ingredientsCount: 10,
    image: '',
    isVegetarian: true
  },
  {
    id: 9,
    title: 'Шакшука з фетою та свіжою зеленню',
    category: 'Сніданок',
    cookingTime: 25,
    ingredientsCount: 8,
    image: '',
    isVegetarian: true
  },
  {
    id: 10,
    title: 'Карпатський банош із бринзою та шкварками',
    category: 'Обід',
    cookingTime: 45,
    ingredientsCount: 7,
    image: '',
    isVegetarian: false
  },
  {
    id: 11,
    title: 'Паста з грибами у вершковому соусі',
    category: 'Вечеря',
    cookingTime: 25,
    ingredientsCount: 8,
    image: '',
    isVegetarian: true
  },
  {
    id: 12,
    title: 'Медовик зі сметанним кремом та горіхами',
    category: 'Десерт',
    cookingTime: 80,
    ingredientsCount: 11,
    image: '',
    isVegetarian: true
  }
]
