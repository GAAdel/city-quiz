<template>
  <div class="card-body text-base leading-normal text-zinc-700 p-6">
    <div class="card-body__content">
      <div class="overflow-y-auto h-[384px] no-scrollbar">
        <div class="card-body__text text-sm text-zinc-400 text-center leading-[384px]" v-if="!isQuizStarted">Первый
          участник вспоминает города...
        </div>

        <div v-else class="card-body__answers flex flex-col mb-4" v-for="answer in masAnswers" :key="answer.text"
          :class="answer.person === 'user' ? 'items-end' : 'items-start'">
          <MeassageItem :item="answer" />
        </div>
      </div>

      <div class="block text-center text-sm font-normal leading-normal text-zinc-400" v-show="isQuizStarted">Всего
        перечислено городов: {{ usedCities.size }}</div>

      <div class="card-body__input relative mt-4">
        <form action="" method="POST" @submit.prevent="sendMessage">
          <input class="
                  card-body__input-text
                  inline-block
                  w-full
                  p-3
                  pr-[55px]
                  rounded-2xl
                bg-gray-50
                  appearance-none
                  focus:outline-none
                  focus:ring
                focus:border-blue-300" v-model="userInput"
            :placeholder="inputPlaceholder"
            :class="currentTurn === 'computer' ? 'text-zinc-400' : 'text-zinc-700'" type="text"
            :disabled="currentTurn === 'computer'">
          <button 
            class="
                  card-body__input-icon
                  absolute
                  z-10
                  top-2
                  right-2
                  w-8
                  h-8
                  bg-send-answer
                  bg-[length:20px_20px]
                  bg-center
                  bg-no-repeat
                  rounded-md
                  appearance-none
                  focus:outline-none
                  focus:ring
                focus:border-blue-300
                  text-[0px]
                  truncate" 
            :class="currentTurn === 'computer' ? 'bg-zinc-400' : 'bg-violet-500'"
            type="submit"
            :disabled="currentTurn === 'computer'"
            aria-label="Ответить"
          >Ответить</button>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import MeassageItem from '@/components/play-card/MeassageItem.vue'

import { computed, ref, defineProps, watch, toRefs } from 'vue';

interface IGameAnswers {
  person: string,
  text: string,
}

const emits = defineEmits(['changeCurrentTurn']);

interface IPropsCardBody {
  currentTurn: string;
}

const props = defineProps<IPropsCardBody>();

const { currentTurn } = toRefs(props);

const computerCities = ["Абакан", "Азов", "Александров", "Алексин", "Альметьевск", "Анапа", "Ангарск", "Анжеро-Судженск", "Апатиты", "Арзамас", "Армавир", "Арсеньев", "Артем", "Архангельск", "Асбест", "Астрахань", "Ачинск", "Балаково", "Балахна", "Балашиха", "Балашов", "Барнаул", "Батайск", "Белгород", "Белебей", "Белово", "Белогорск", "Белорецк", "Белореченск", "Бердск", "Березники", "Березовский", "Бийск", "Биробиджан", "Благовещенск", "Бор", "Борисоглебск", "Боровичи", "Братск", "Брянск", "Бугульма", "Буденновск", "Бузулук", "Буйнакск", "Великие Луки", "Великий Новгород", "Верхняя Пышма", "Видное", "Владивосток", "Владикавказ", "Владимир", "Волгоград", "Волгодонск", "Волжск", "Волжский", "Вологда", "Вольск", "Воркута", "Воронеж", "Воскресенск", "Воткинск", "Всеволожск", "Выборг", "Выкса", "Вязьма", "Гатчина", "Геленджик", "Георгиевск", "Глазов", "Горно-Алтайск", "Грозный", "Губкин", "Гудермес", "Гуково", "Гусь-Хрустальный", "Дербент", "Дзержинск", "Димитровград", "Дмитров", "Долгопрудный", "Домодедово", "Донской", "Дубна", "Евпатория", "Егорьевск", "Ейск", "Екатеринбург", "Елабуга", "Елец", "Ессентуки", "Железногорск", "Жигулевск", "Жуковский", "Заречный", "Зеленогорск", "Зеленодольск", "Златоуст", "Иваново", "Ивантеевка", "Ижевск", "Избербаш", "Иркутск", "Искитим", "Ишим", "Ишимбай", "Йошкар-Ола", "Казань", "Калининград", "Калуга", "Каменск-Уральский", "Каменск-Шахтинский", "Камышин", "Канск", "Каспийск", "Кемерово", "Керчь", "Кинешма", "Кириши", "Киров", "Кирово-Чепецк", "Киселевск", "Кисловодск", "Клин", "Клинцы", "Ковров", "Когалым", "Коломна", "Комсомольск-на-Амуре", "Копейск", "Королев", "Кострома", "Котлас", "Красногорск", "Краснодар", "Краснокаменск", "Краснокамск", "Краснотурьинск", "Красноярск", "Кропоткин", "Крымск", "Кстово", "Кузнецк", "Кумертау", "Кунгур", "Курган", "Курск", "Кызыл", "Лабинск", "Лениногорск", "Ленинск-Кузнецкий", "Лесосибирск", "Липецк", "Лиски", "Лобня", "Лысьва", "Лыткарино", "Люберцы", "Магадан", "Магнитогорск", "Майкоп", "Махачкала", "Междуреченск", "Мелеуз", "Миасс", "Минеральные Воды", "Минусинск", "Михайловка", "Михайловск", "Мичуринск", "Москва", "Мурманск", "Муром", "Мытищи", "Набережные Челны", "Назарово", "Назрань", "Нальчик", "Наро-Фоминск", "Находка", "Невинномысск", "Нерюнгри", "Нефтекамск", "Нефтеюганск", "Нижневартовск", "Нижнекамск", "Нижний Новгород", "Нижний Тагил", "Новоалтайск", "Новокузнецк", "Новокуйбышевск", "Новомосковск", "Новороссийск", "Новосибирск", "Новотроицк", "Новоуральск", "Новочебоксарск", "Новочеркасск", "Новошахтинск", "Новый Уренгой", "Ногинск", "Норильск", "Ноябрьск", "Нягань", "Обнинск", "Одинцово", "Озерск", "Октябрьский", "Омск", "Орел", "Оренбург", "Орехово-Зуево", "Орск", "Павлово", "Павловский Посад", "Пенза", "Первоуральск", "Пермь", "Петрозаводск", "Петропавловск-Камчатский", "Подольск", "Полевской", "Прокопьевск", "Прохладный", "Псков", "Пушкино", "Пятигорск", "Раменское", "Ревда", "Реутов", "Ржев", "Рославль", "Россошь", "Ростов-на-Дону", "Рубцовск", "Рыбинск", "Рязань", "Салават", "Сальск", "Самара", "Санкт-Петербург", "Саранск", "Сарапул", "Саратов", "Саров", "Свободный", "Севастополь", "Северодвинск", "Северск", "Сергиев Посад", "Серов", "Серпухов", "Сертолово", "Сибай", "Симферополь", "Славянск-на-Кубани", "Смоленск", "Соликамск", "Солнечногорск", "Сосновый Бор", "Сочи", "Ставрополь", "Старый Оскол", "Стерлитамак", "Ступино", "Сургут", "Сызрань", "Сыктывкар", "Таганрог", "Тамбов", "Тверь", "Тимашевск", "Тихвин", "Тихорецк", "Тобольск", "Тольятти", "Томск", "Троицк", "Туапсе", "Туймазы", "Тула", "Тюмень", "Узловая", "Улан-Удэ", "Ульяновск", "Урус-Мартан", "Усолье-Сибирское", "Уссурийск", "Усть-Илимск", "Уфа", "Ухта", "Феодосия", "Фрязино", "Хабаровск", "Ханты-Мансийск", "Хасавюрт", "Химки", "Чайковский", "Чапаевск", "Чебоксары", "Челябинск", "Черемхово", "Череповец", "Черкесск", "Черногорск", "Чехов", "Чистополь", "Чита", "Шадринск", "Шали", "Шахты", "Шуя", "Щекино", "Щелково", "Электросталь", "Элиста", "Энгельс", "Южно-Сахалинск", "Юрга", "Якутск", "Ялта", "Ярославль"];

const isQuizStarted = ref(false);
const userInput = ref('');
const lastAnswerLetter = ref('');
const lastAnswer = ref('');

const masAnswers = ref([] as IGameAnswers[]);
const usedCities = new Set();

const sendMessage = () => {
  // console.log('Ввели: ', userInput.value);
  if (!isQuizStarted.value) {
  } else if (userInput.value.slice(0, 1).toLowerCase() !== lastAnswerLetter.value) {
    console.log('Некорректный ввод!');
    return
  }

  if (!usedCities.has(userInput.value)) {
    usedCities.add(userInput.value);
    masAnswers.value.push({
      person: 'user',
      text: userInput.value,
    });

    console.log('Уникальные ответы: ', usedCities);
    console.log('Ответы: ', masAnswers.value);

    isQuizStarted.value = true;
    lastAnswerLetter.value = userInput.value.slice(-1);
    lastAnswer.value = userInput.value;
    userInput.value = '';
    emits('changeCurrentTurn', lastAnswer.value, usedCities.size);
  } else {
    console.log('Данный город уже использовали!');
  }
}

const computerAnswer = () => {
  const variants = computerCities.filter((item) => item.slice(0, 1).toLowerCase() === lastAnswerLetter.value.toLowerCase())

  console.log('variants: ', variants);

  if (variants.length !== 0) {
    for (let i = 0; i < variants.length; i++) {
      if (!usedCities.has(variants[i])) {
        usedCities.add(variants[i]);
        masAnswers.value.push({
          person: 'computer',
          text: variants[i],
        });
        lastAnswer.value = variants[i];
        lastAnswerLetter.value = variants[i].slice(-1);
        emits('changeCurrentTurn', lastAnswer.value, usedCities.size);
        break;
      }
    }
  }
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const inputPlaceholder = computed(() => {
  if (!isQuizStarted.value)  {
    return 'Напишите любой город, например: Где вы живете?';
  }
  else if (currentTurn.value === 'computer') {
    return 'Ожидаем ответа соперника...';
  }
  else if (currentTurn.value === 'user') {
    return `Знаете город на букву “${lastAnswerLetter.value.toUpperCase()}”?`;
  }
})

watch(currentTurn, (newNumber, oldNumber) => {
  if (newNumber === 'computer') {
    let randomTime = getRandomInt(10, 12) * 1000;
    console.log('randomTimer: ', randomTime);
    setTimeout(() => {
      computerAnswer();
    }, randomTime)
  }
});

</script>

<style scoped></style>