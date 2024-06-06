const SUNDAY = 0;
const MONDAY = 1;
const TUESDAY = 2;
const WEDNESDAY = 3;
const THURSDAY = 4;
const FRIDAY = 5;
const SATURDAY = 6;

const JANUARY = 1;
const FEBRUARY = 2;
const MARCH = 3;
const APRIL = 4;
const MAY = 5;
const JUNE = 6;
const JULY = 7;
const AUGUST = 8;
const SEPTEMBER = 9;
const OCTOBER = 10;
const NOVEMBER = 11;
const DECEMBER = 12;

function is_xth_day_in_month(date, required_xth, required_day, required_mm) {
  // Is this the required_xth required_day in required_mm?
  // For example, is this the second Sunday in May?
  const day = date.getDay(); // Sunday is 0, Monday is 1, ... Saturday is 6
  const dd = date.getDate();
  const mm = date.getMonth() + 1; // January is 0!

  const max_dd = required_xth * 7;
  const min_dd = max_dd - 6;

  if (mm === required_mm && dd >= min_dd && dd <= max_dd && day === required_day) {
    return true;
  }
  return false;
}

function why_are_the_flags_up(date) {
  let today = new Date();
  today.setHours(0, 0, 0, 0); // keep date, ditch time
  date.setHours(0, 0, 0, 0); // keep date, ditch time
  const day = date.getDay(); // Sunday is 0, Monday is 1, ... Saturday is 6
  const dd = date.getDate();
  const mm = date.getMonth() + 1; // January is 0!
  const yyyy = date.getFullYear();
  let past = false;
  let future = false;
  let reasons = [];
  let other_reason = "";
  let flags_up = true;

  // Format like 4th June 2014
  const m_names = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let suffix = "";
  if (dd === 1 || dd === 21 || dd === 31) {
    suffix = "st";
  } else if (dd === 2 || dd === 22) {
    suffix = "nd";
  } else if (dd === 3 || dd === 23) {
    suffix = "rd";
  } else {
    suffix = "th";
  }
  const date_format = dd + "" + suffix + " " + m_names[mm - 1] + " " + yyyy;

  if (date < today) {
    past = true;
    intro = "Flags were up in Finland because " + date_format + " was:";
  } else if (today < date) {
    future = true;
    intro = "Flags will be up in Finland because " + date_format + " will be:";
  } else {
    intro = "Flags are up in Finland because today, " + date_format + ", is:";
  }

  // Static dates
  if (mm === FEBRUARY && dd === 5) {
    reasons.push("birthday of the national poet Johan Ludvig Runeberg");
  } else if (mm === FEBRUARY && dd === 3 && yyyy >= 2022) {
    reasons.push("Alvar and Aino Aalto day, Day of Finnish Architecture and Design");
  } else if (mm === FEBRUARY && dd === 28) {
    reasons.push(
      "Day of Kalevala; the occasion is also celebrated as the Day of Finnish culture",
    );
  } else if (mm === MARCH && dd === 19) {
    reasons.push("birthday of novelist and playwright Minna Canth, Day of Equality");
  } else if (mm === APRIL && dd === 8) {
    reasons.push("International Romani Day");
  } else if (mm === APRIL && dd === 9) {
    reasons.push(
      "the day Mikael Agricola, the founder of the literary Finnish died and Elias Lönnrot, a collector of folklore was born; the occasion is also celebrated as the Day of the Finnish language",
    );
  } else if (mm === APRIL && dd === 27) {
    reasons.push("National War Veterans' Day");
  } else if (mm === MAY && dd === 1) {
    reasons.push("Vappu, the Day of Finnish Labour");
  } else if (mm === MAY && dd === 9) {
    reasons.push("Europe Day");
  } else if (mm === MAY && dd === 12) {
    reasons.push(
      "Day of the Finnish Identity, birthday of the statesman Johan Vilhelm Snellman",
    );
  } else if (mm === JUNE && dd === 4) {
    reasons.push(
      "birthday of Carl Gustaf Emil Mannerheim, Marshal of Finland; the occasion is also celebrated as the Flag Day of the Finnish Defence Forces",
    );
  } else if (mm === JUNE && dd === 9 && yyyy >= 2021) {
    reasons.push("Åland's autonomy day");
  } else if (mm === JULY && dd === 6) {
    reasons.push(
      "birthday of the poet Eino Leino; the occasion is also a celebration of poetry and summer",
    );
  } else if (mm === JULY && dd === 10 && yyyy >= 2017) {
    reasons.push(
      "Helene Schjerfbeck Day, anniversary of the birth of the celebrated Finnish painter Helene Schjerfbeck; Finnish Visual Arts Day",
    );
  } else if (mm === AUGUST && dd === 9 && yyyy >= 2020) {
    reasons.push("to celebrate Tove Jansson and Finnish art");
  } else if (mm === OCTOBER && dd === 1 && yyyy >= 2017) {
    reasons.push("to honour Miina Sillanpää and civic influence");
  } else if (mm === OCTOBER && dd === 10) {
    reasons.push(
      "birthday of the National writer Aleksis Kivi; the occasion is also celebrated as the Day of Finnish literature",
    );
  } else if (mm === OCTOBER && dd === 24) {
    reasons.push("Day of the United Nations");
  } else if (mm === NOVEMBER && dd === 6) {
    reasons.push("Day of the Swedish Identity and Gustavus Adolphus Day");
  } else if (mm === NOVEMBER && dd === 20) {
    reasons.push("Universal Children's Day");
  } else if (mm === DECEMBER && dd === 6) {
    reasons.push("Independence Day");
  } else if (mm === DECEMBER && dd === 8) {
    reasons.push(
      "Birthday of the composer Jean Sibelius; the occasion is also celebrated as the Day of Finnish music",
    );
  }

  // Moveable dates
  if (is_xth_day_in_month(date, 2, SUNDAY, MAY)) {
    reasons.push("Mother's Day");
  } else if (is_xth_day_in_month(date, 3, SUNDAY, MAY)) {
    reasons.push(
      "memorial day for the war dead (everyone who has died in Finnish wars, combat-like duties or peacekeeping operations both during fighting and after they've ceased, including those executed or who have died as a POW)",
    );
  } else if (mm === JUNE && dd >= 19 && dd <= 25 && day === FRIDAY) {
    reasons.push("Midsummer's eve");
  } else if (mm === JUNE && dd >= 20 && dd <= 26 && day === SATURDAY) {
    reasons.push("Midsummer");
  } else if (
    mm === AUGUST &&
    dd >= 25 &&
    dd <= 31 &&
    day === SATURDAY &&
    yyyy >= 2017
  ) {
    reasons.push("Finnish Nature Day");
  } else if (is_xth_day_in_month(date, 2, SUNDAY, NOVEMBER)) {
    reasons.push("Father's Day");
  }

  // General election every fourth year.
  // Since 2011: third Sunday in April unless Easter affects this schedule.
  if (is_xth_day_in_month(date, 3, SUNDAY, APRIL)) {
    if (![2019, 2023].includes(yyyy) && (yyyy - 2011) % 4 === 0) {
      reasons.push("a parliamentary election");
    }
  }

  // Other elections
  if (
    (dd === 28 && mm === JANUARY && yyyy === 2018) ||
    (dd === 28 && mm === JANUARY && yyyy === 2024) ||
    (dd === 11 && mm === FEBRUARY && yyyy === 2024)
  ) {
    reasons.push("a presidential election");
  } else if (
    (dd === 14 && mm === APRIL && yyyy === 2019) ||
    (dd === 2 && mm === APRIL && yyyy === 2023)
  ) {
    // Exceptionally
    reasons.push("a parliamentary election");
  } else if (dd === 26 && mm === MAY && yyyy === 2019) {
    reasons.push("a European parliamentary election");
  } else if (dd === 13 && mm === JUNE && yyyy === 2021) {
    reasons.push("municipal elections");
  } else if (dd === 23 && mm === JANUARY && yyyy === 2022) {
    reasons.push("county elections");
  } else if (dd === 9 && mm === JUNE && yyyy === 2024) {
    reasons.push("a European parliamentary election");
  }

  // One-offs
  if (dd === 4 && mm === SEPTEMBER && yyyy === 2014) {
    reasons.push("70 years since the end of the Continuation War");
  } else if (dd === 5 && mm === DECEMBER && yyyy === 2017) {
    reasons.push("Finland's Centenary Independence Day Eve");
  } else if (dd === 1 && mm === FEBRUARY && yyyy === 2018) {
    reasons.push("Inauguration of the President");
  } else if (dd === 28 && mm === MAY && yyyy === 2018) {
    reasons.push("100th anniversary of the Finnish flag");
  } else if (dd === 16 && mm === FEBRUARY && yyyy === 2018) {
    reasons.push("Lithuania's 100 years of independence");
  } else if (dd === 24 && mm === FEBRUARY && yyyy === 2018) {
    reasons.push("Estonia's 100 years of independence");
  } else if (dd === 18 && mm === NOVEMBER && yyyy === 2018) {
    reasons.push("Latvia's 100 years of independence");
  } else if (dd === 13 && mm === MARCH && yyyy === 2020) {
    reasons.push("80th anniversary of the end of the Winter War");
  } else if (dd === 10 && mm === NOVEMBER && yyyy === 2023) {
    reasons.push("State funeral of President Martti Ahtisaari");
  } else if (dd === 1 && mm === MARCH && yyyy === 2024) {
    reasons.push("Inauguration of the President of the Republic");
  }

  if (reasons.length === 0) {
    flags_up = false;
    intro = "";
    if (past) {
      reasons.push("Flags were not up in Finland on " + date_format);
    } else if (future) {
      reasons.push("Flags will not be up in Finland on " + date_format);
    } else {
      reasons.push("Flags are not up in Finland today, " + date_format);
    }
    other_reason =
      '(Unless there\'s elections, a referendum, the president is inaugurated, or something else &ndash; <a href="https://github.com/whyaretheflagsup/whyaretheflagsup/issues/new">let us know</a>)';
  }

  return [flags_up, intro, reasons, other_reason];
}
