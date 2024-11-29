import { connectToDatabase } from "../server/db/connect.js";
import User from "../server/db/models/User.js"; // Импортируем модель пользователя

// Массив пользователей
const usersList = [
  {
    id: 1,
    name: "Mark",
    surname: "Twen",
    username: "MarkTwen",
    password: "123",
    age: 45,
    avatarPath: "profile_man_1.png",
    location: "Missouri, USA",
    activity: new Date("2024-09-13T10:00:00"),
    followersId: [],
    friendsId: [1],
    postsId: [1, 5, 8],
    chatsId: [1],
    rating: 3.7,
  },
  {
    id: 2,
    name: "Sally",
    surname: "Robinson",
    username: "SallyRobinson",
    password: "123",
    age: 29,
    avatarPath: "profile_woman_1.png",
    location: "Kentucky, USA",
    activity: new Date("2024-09-12T18:30:00"),
    followersId: [],
    friendsId: [2],
    postsId: [2],
    chatsId: [2],
    rating: 3.5,
  },
  {
    id: 3,
    name: "Milla",
    surname: "Loren",
    username: "MillaLoren",
    password: "123",
    age: 35,
    avatarPath: "profile_woman_2.png",
    location: "Los Angeles, USA",
    activity: new Date("2024-09-12T12:10:00"),
    followersId: [],
    friendsId: [3],
    postsId: [3, 6],
    chatsId: [3],
    rating: 4.0,
  },
  {
    id: 4,
    name: "Stevie",
    surname: "",
    username: "Stevie",
    password: "123",
    age: 30,
    avatarPath: "profile_man_3.png",
    location: "London, UK",
    activity: new Date("2024-09-11T09:05:00"),
    followersId: [],
    friendsId: [4],
    postsId: [4, 7],
    chatsId: [4],
    rating: 4.25,
  },
  {
    id: 5,
    name: "Anna",
    surname: "Smith",
    username: "AnnaSmith",
    password: "123",
    age: 28,
    avatarPath: "profile_woman_3.png",
    location: "New York, USA",
    activity: new Date("2024-09-10T14:45:00"),
    followersId: [],
    friendsId: [5],
    postsId: [9],
    chatsId: [5],
    rating: 5.0,
  },
  {
    id: 6,
    name: "James",
    surname: "Bond",
    username: "JamesBond",
    password: "123",
    age: 40,
    avatarPath: "profile_man_2.png",
    location: "London, UK",
    activity: new Date("2024-09-11T16:20:00"),
    followersId: [],
    friendsId: [],
    postsId: [10],
    chatsId: [6],
    rating: 5.0,
  },
  {
    id: 7,
    name: "Alice",
    surname: "Wonder",
    username: "AliceWonder",
    password: "123",
    age: 25,
    avatarPath: "profile_woman_1.png",
    location: "Oxford, UK",
    activity: new Date("2024-09-10T11:00:00"),
    followersId: [],
    friendsId: [],
    postsId: [11],
    chatsId: [7],
    rating: 5.0,
  },
  {
    id: 8,
    name: "Chris",
    surname: "Evans",
    username: "ChrisEvans",
    password: "123",
    age: 39,
    avatarPath: "profile_man_2.png",
    location: "Boston, USA",
    activity: new Date("2024-09-10T15:10:00"),
    followersId: [],
    friendsId: [],
    postsId: [12],
    chatsId: [],
    rating: 4.5,
  },
  {
    id: 9,
    name: "Sophia",
    surname: "Turner",
    username: "SophiaTurner",
    password: "123",
    age: 24,
    avatarPath: "profile_woman_3.png",
    location: "London, UK",
    activity: new Date("2024-09-09T17:45:00"),
    followersId: [],
    friendsId: [],
    postsId: [13],
    chatsId: [],
    rating: 4.0,
  },
  {
    id: 10,
    name: "John",
    surname: "Doe",
    username: "JohnDoe",
    password: "123",
    age: 35,
    avatarPath: "profile_man_2.png",
    location: "Unknown",
    activity: new Date("2024-09-08T13:30:00"),
    followersId: [],
    friendsId: [],
    postsId: [14],
    chatsId: [],
    rating: 4.5,
  },
  {
    id: 11,
    name: "Eva",
    surname: "Green",
    username: "EvaGreen",
    password: "123",
    age: 40,
    avatarPath: "profile_woman_1.png",
    location: "Paris, France",
    activity: new Date("2024-09-08T14:30:00"),
    followersId: [],
    friendsId: [],
    postsId: [15],
    chatsId: [],
    rating: 4.0,
  },
  {
    id: 12,
    name: "Jack",
    surname: "Sparrow",
    username: "JackSparrow",
    password: "123",
    age: 35,
    avatarPath: "profile_man_2.png",
    location: "The Caribbean",
    activity: new Date("2024-09-07T13:30:00"),
    followersId: [],
    friendsId: [],
    postsId: [16],
    chatsId: [],
    rating: 2.0,
  },
  {
    id: 13,
    name: "Olivia",
    surname: "Brown",
    username: "OliviaBrown",
    password: "123",
    age: 32,
    avatarPath: "profile_woman_3.png",
    location: "Sydney, Australia",
    activity: new Date("2024-09-08T19:10:00"),
    followersId: [],
    friendsId: [],
    postsId: [17],
    chatsId: [],
    rating: 2.0,
  },
  {
    id: 14,
    name: "Michael",
    surname: "Jordan",
    username: "MichaelJordan",
    password: "123",
    age: 60,
    avatarPath: "profile_man_1.png",
    location: "Chicago, USA",
    activity: new Date("2024-09-07T11:30:00"),
    followersId: [],
    friendsId: [],
    postsId: [18],
    chatsId: [],
    rating: 4.0,
  },
  {
    id: 15,
    name: "Emma",
    surname: "Watson",
    username: "EmmaWatson",
    password: "123",
    age: 30,
    avatarPath: "profile_woman_2.png",
    location: "Paris, France",
    activity: new Date("2024-09-07T12:05:00"),
    followersId: [],
    friendsId: [],
    postsId: [19],
    chatsId: [],
    rating: 1.0,
  },
  {
    id: 16,
    name: "Tom",
    surname: "Cruise",
    username: "TomCruise",
    password: "123",
    age: 58,
    avatarPath: "profile_man_3.png",
    location: "Los Angeles, USA",
    activity: new Date("2024-09-05T12:05:00"),
    followersId: [],
    friendsId: [],
    postsId: [20],
    chatsId: [],
    rating: 4.0,
  },
];

async function importUsers() {
  try {
    // Подключаемся к базе данных
    await connectToDatabase();

    // Удаляем существующих пользователей (опционально)
    await User.deleteMany({});

    // Добавляем пользователей в базу данных
    await User.insertMany(usersList);

    console.log("Users imported successfully");
    process.exit(0); // Завершаем процесс
  } catch (error) {
    console.error("Error importing users:", error);
    process.exit(1); // Завершаем процесс с ошибкой
  }
}

importUsers();
