// utils/timeSlots.js

function getKolkataTime() {
  const now = new Date();
  return new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
}

function getNext7DatesInKolkata() {
  const kolkataTime = getKolkataTime();
  const currentHour = kolkataTime.getHours();

  const startDate = new Date(kolkataTime);

  // If after 6 PM → start from tomorrow
  if (currentHour >= 18) {
    startDate.setDate(startDate.getDate() + 1);
  }

  const dates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const shortWeekDay = date
      .toLocaleDateString("en-IN", {
        weekday: "short",
        timeZone: "Asia/Kolkata",
      })
      .toUpperCase();

    const day = date.getDate();

    const formattedDate = date.toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });

    dates.push({
      shortWeekDay,
      day,
      date: formattedDate,
    });
  }

  return dates;
}

function getAvailableHourlyTimeSlots(selectedDate) {
  const times = [
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "01:00 pm",
    "02:00 pm",
    "03:00 pm",
    "04:00 pm",
    "05:00 pm",
    "06:00 pm",
  ];

  const kolkataTime = getKolkataTime();

  const today = kolkataTime.toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  });

  // If selected date is not today → show all slots
  if (selectedDate !== today) {
    return times;
  }

  // Only filter slots for today
  const nowPlusOneHour = new Date(kolkataTime);
  nowPlusOneHour.setHours(nowPlusOneHour.getHours() + 1);

  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "pm" && hours !== 12) hours += 12;
    if (modifier === "am" && hours === 12) hours = 0;

    const slotDate = new Date(kolkataTime);
    slotDate.setHours(hours, minutes, 0, 0);

    return slotDate;
  };

  return times.filter((time) => parseTime(time) > nowPlusOneHour);
}

export { getNext7DatesInKolkata, getAvailableHourlyTimeSlots };