const base64 = require('base-64');
const axios = require('axios');
const puppeteer = require('puppeteer');

async function fetchReviews(originalId, offset) {
  const encodedId = base64.encode(`StayListing:${originalId}`); // Добавление префикса и кодирование идентификатора в Base64
  let allReviews = []; // Массив для хранения всех отзывов
  const limit = 50; // Количество отзывов на одну страницу

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://www.airbnb.com/api/v3/StaysPdpReviews?operationName=StaysPdpReviews&locale=en&currency=USD&variables=%7B%22id%22%3A%22${encodedId}%22%2C%22pdpReviewsRequest%22%3A%7B%22fieldSelector%22%3A%22for_p3_translation_only%22%2C%22forPreview%22%3Afalse%2C%22limit%22%3A${limit}%2C%22offset%22%3A${offset}%2C%22showingTranslationButton%22%3Afalse%2C%22first%22%3A${limit}%2C%22sortingPreference%22%3A%22MOST_RECENT%22%2C%22numberOfAdults%22%3A%221%22%2C%22numberOfChildren%22%3A%220%22%2C%22numberOfInfants%22%3A%220%22%2C%22after%22%3Anull%7D%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%224c4d8eaba2408b834aed5efe757c523e9460eb3a11428f8d8e70a322c1c2ce4f%22%7D%7D`,
    headers: { 
      'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"', 
      'X-Airbnb-Supports-Airlock-V2': 'true', 
      'X-CSRF-Token': 'null', 
      'X-Airbnb-API-Key': 'd306zoyjsyarp7ifhu67rjxn52tv0t20', 
      'sec-ch-ua-platform-version': '"6.0"', 
      'X-Niobe-Short-Circuited': 'true', 
      'dpr': '2', 
      'sec-ch-ua-platform': '"Android"', 
      'device-memory': '8', 
      'X-Airbnb-GraphQL-Platform-Client': 'minimalist-niobe', 
      'X-Client-Version': '74f59b35f5d78abea1c96517f859e650f97299bf', 
      'sec-ch-ua-mobile': '?1', 
      'X-CSRF-Without-Token': '1', 
      'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36', 
      'x-client-request-id': '00u843b1rwoxnn0jfvntp1nb8ahv', 
      'viewport-width': '376', 
      'Content-Type': 'application/json', 
      'Referer': 'https://www.airbnb.com/rooms/52316842/reviews?source_impression_id=p3_1704678352_7z%2ByxxNeHzr%2BUlx%2F', 
      'ect': '4g', 
      'X-Airbnb-GraphQL-Platform': 'web', 
      'Cookie': 'ak_bmsc=41AC68DBD0C1DCB1C6B08EE8CDB4423F~000000000000000000000000000000~YAAQhB3fF0Ze4J6MAQAA/T1X7BZQZpkjqNVDEzgtOqI9c5RLJioWFwPI6/NQ+IQcgRoA9m5BBPmP8/AK5Pk6PnEjz/71KyF5V3GO6ZNQa+RYlRwWUkHAsSPYj/a97P+Vw9OkQ4+B+hKTP+BjCrVkhJgDkWwTiftRa3/I7sercm8XjZ3+ZALJ9JMNTktNC2muKfm3+6HGTPrcORvWDNFuKDYM+bksfzqnfJP4VGG7I1BOEqBvFgw+ysHSdutZ9opKr0KHZaFGMPQMe7g7PZ0LoRO6UZC6R564pV18SlJek/EUPDN9CBvS/hBR5Ll5n7MoqzRR8xiPaoDj5a1ea3rhzpJpFyKCTiCFcrJIy003dVg2U+I1hbtAogPSEus=; bev=1704681461_MTUyNjc3YjgyZDFj; cdn_exp_c3c85844e83f6d6bc=control; country=US'
    }
  };
  
  try {
    const response = await axios.request(config);
    const reviews = response.data.data.presentation.stayProductDetailPage.reviews.reviews;
    const reviewComments = reviews.map(review => review.comments);
    allReviews.push(...reviewComments); // Добавляем полученные отзывы в общий массив
    
    if (reviews.length === limit) {
      // Если количество полученных отзывов соответствует лимиту, запрашиваем следующую страницу
      await fetchReviews(offset + limit);
    } else {
      // Если отзывов меньше лимита, значит это последняя страница
      console.log('Все отзывы были загружены');
      console.log(allReviews); // Выводим все отзывы
      console.log(`Получено отзывов: ${allReviews.length}`);
    }
  } catch (error) {
    console.error('Ошибка при загрузке отзывов:', error);
  }
}

function extractOriginalId(url) {
  // Регулярное выражение для поиска числа после '/rooms/'
  const regex = /\/rooms\/(\d+)/;
  const match = url.match(regex);

  // Проверка, найдено ли соответствие
  if (match && match[1]) {
    return match[1]; // Возвращаем найденный ID
  } else {
    return null; // В случае, если ID не найден
  }
}

async function getFinalUrl(shortUrl) {
  const browser = await puppeteer.launch({ headless: "new" }); // Используйте новый режим без головы
  const page = await browser.newPage();
  
  await page.goto(shortUrl, { waitUntil: 'networkidle2' });
  
  const finalUrl = page.url();

  await browser.close();
  return finalUrl;
}

async function processUrl(shortUrl) {
  try {
    const finalUrl = await getFinalUrl(shortUrl);
    const originalId = await extractOriginalId(finalUrl);
    await fetchReviews(originalId, 0);
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

// Пример использования
const shortUrl = "https://abnb.me/SZ5PT3t7cGb";
processUrl(shortUrl);
