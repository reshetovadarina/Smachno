import imgSyrnyky from '../images/syrnyky.jpg'

export const initialCookingTime = 35

export const initialRecipeOfDay = {
  title: 'Сирники з ягідним соусом',
  category: 'Сніданок',
  image: imgSyrnyky,
  isVegetarian: true
}

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
  }
]
