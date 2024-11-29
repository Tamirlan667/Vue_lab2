<template>
  <div class="statistics-page">
    <h1>Статистика постов</h1>

    <!-- Выбор диапазона дат -->
    <div class="datepicker">
      <label>Выберите диапазон дат:</label>
      <litepie-datepicker
        ref="myRef"
        v-model="dateRange"
        :range="true"
        :formatter="{ date: 'YYYY-MM-DD' }"
        inline
        class="my-datepicker"
      />
    </div>

    <!-- График или сообщение о пустых данных -->
    <div class="chart-container">
      <div v-if="filteredByDate.length > 0" class="chart">
        <Chart type="bar" :data="chartData" :options="chartOptions" />
      </div>
      <div v-else class="no-data-message">
        <i class="no-data-icon fas fa-chart-bar"></i>
        <p>Нет отзывов для выбранного диапазона дат.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Chart } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import LitepieDatepicker from "litepie-datepicker";

// Регистрация компонентов chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const currentUser = useCurrentUserStore();
const postsId = computed(() => currentUser.currentUser.postsId);
const reviewsStore = blogReviews();
const filteredReviews = computed(() =>
  reviewsStore.filteredByUser({ postsId: postsId.value })
);

// Выбранный диапазон дат
const dateRange = ref([]);

// Фильтрация отзывов по выбранному диапазону
const filteredByDate = computed(() => {
  if (dateRange.value.length === 2) {
    const [start, end] = dateRange.value.map((date) =>
      new Date(date).setHours(0, 0, 0, 0)
    );

    return filteredReviews.value.filter((review) => {
      const reviewDate = new Date(review.date).setHours(0, 0, 0, 0);
      return reviewDate >= start && reviewDate <= end;
    });
  }
  return filteredReviews.value;
});

// Подготовка данных для отображения на графике
const chartData = computed(() => {
  const dateCounts = {};

  filteredByDate.value.forEach((review) => {
    const date = new Date(review.date).toLocaleDateString();
    dateCounts[date] = (dateCounts[date] || 0) + 1;
  });

  const dates = Object.keys(dateCounts);
  const counts = dates.map((date) => dateCounts[date]);

  return {
    labels: dates,
    datasets: [
      {
        label: "Количество отзывов",
        data: counts,
        backgroundColor: "#007bff",
        borderColor: "#0056b3",
        borderWidth: 1,
      },
    ],
  };
});

// Настройки графика
const chartOptions = computed(() => ({
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Количество отзывов по датам",
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => `Отзывов: ${tooltipItem.raw}`,
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Дата",
      },
    },
    y: {
      title: {
        display: true,
        text: "Количество",
      },
      beginAtZero: true,
    },
  },
}));
</script>

<style scoped>
.statistics-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, #76c5e7 0%, #fbf3f3 100%);
  padding: 40px;
  background-color: #f4f7fc;
  min-height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
  font-weight: 600;
}

.datepicker {
  margin-left: auto;
  margin-right: 0;
  margin-bottom: 30px;
  width: 30%;
  max-width: 850px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.datepicker label {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 10px;
  display: block;
}

/* Новый стиль для контейнера графика */
.chart-container {
  width: 100%;
  max-width: 850px;
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Новый стиль для графика */
.chart {
  margin-bottom: 40px;
  border-radius: 8px;
  padding: 10px;
  background-color: #f0f4f8;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.no-data-message {
  padding: 20px;
  background-color: #fff0f0;
  color: #b50000;
  border: 1px solid #b50000;
  border-radius: 8px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
}

.no-data-message p {
  margin: 0;
}

@media (max-width: 900px) {
  .statistics-page {
    padding: 20px;
  }

  h1 {
    font-size: 2rem;
  }

  .datepicker,
  .chart-container {
    width: 100%;
  }
}

/* Стиль для графика в виде bar (улучшен) */
::v-deep .chartjs-render-monitor {
  border-radius: 8px;
}

.chartjs-tooltip {
  background-color: #333;
  color: white;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.chartjs-tooltip .tooltip-item {
  font-size: 1rem;
}

/* Стиль для фона графика */
.chartjs-legend {
  padding: 10px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.chartjs-legend li {
  display: inline-block;
  margin-right: 15px;
  font-size: 1.1rem;
}

.chartjs-legend li span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}

/* Цвета для графика */
::v-deep .chartjs-bar {
  background-color: #4caf50; /* Зеленый цвет для столбцов */
  transition: background-color 0.3s ease;
}

::v-deep .chartjs-bar:hover {
  background-color: #388e3c; /* Темно-зеленый при наведении */
}

h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  -webkit-background-clip: text; /* Применение градиента к тексту */
  background-clip: text;
  text-align: center;
  font-weight: 700; /* Жирный шрифт */
  text-transform: uppercase; /* Преобразование текста в верхний регистр */
  letter-spacing: 2px; /* Пространство между буквами */
  animation: fadeIn 1s ease-out;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Тень для глубины */
}
</style>
