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
    let reason = "";
    let other_reason = "";
    let flags_up = true;
    
    // Format like 4th June 2014
    const m_names = ["January", "February", "March",
            "April", "May", "June", "July", "August", "September",
            "October", "November", "December"];
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
        intro = 'Flags were up in Finland because ' + date_format + ' was:';
    } else if (today < date) {
        future = true;
        intro = 'Flags will be up in Finland because ' + date_format + ' will be:';
    } else {
        intro = 'Flags are up in Finland because today, ' + date_format + ', is:';
    }

    // Static dates
    if (mm === FEBRUARY && dd === 5) {
        reason = 'Birthday of the national poet Johan Ludvig Runeberg';
    } else if (mm === FEBRUARY && dd === 3 && yyyy >= 2022) {
        reason = 'Alvar and Aino Aalto day, Day of Finnish Architecture and Design';
    } else if (mm === FEBRUARY && dd === 28) {
        reason = 'Day of Kalevala; the occasion is also celebrated as the Day of Finnish culture';
    } else if (mm === MARCH && dd === 19) {
        reason = 'Birthday of novelist and playwright Minna Canth, Day of Equality';
    } else if (mm === APRIL && dd === 8) {
        reason = 'International Romani Day';
    } else if (mm === APRIL && dd === 9) {
        reason = 'The day Mikael Agricola, the founder of the literary Finnish died and Elias Lönnrot, a collector of folklore was born; the occasion is also celebrated as the Day of the Finnish language';
    } else if (mm === APRIL && dd === 27) {
        reason = "National War Veterans' Day";
    } else if (mm === MAY && dd === 1) {
        reason = 'Vappu, the Day of Finnish Labour';
    } else if (mm === MAY && dd === 9) {
        reason = 'Europe Day';
    } else if (mm === MAY && dd === 12) {
        reason = 'Day of the Finnish Identity, birthday of the statesman Johan Vilhelm Snellman';
    } else if (mm === JUNE && dd === 4) {
        reason = 'Birthday of Carl Gustaf Emil Mannerheim, Marshal of Finland; the occasion is also celebrated as the Flag Day of the Finnish Defence Forces';
    } else if (mm === JUNE && dd === 9 && yyyy >= 2021) {
        reason = "Åland's autonomy day";
    } else if (mm === JULY && dd === 6) {
        reason = 'Birthday of the poet Eino Leino; the occasion is also a celebration of poetry and summer';
    } else if (mm === JULY && dd === 10 && yyyy >= 2017) {
        reason = "Helene Schjerfbeck Day, anniversary of the birth of the celebrated Finnish painter Helene Schjerfbeck; Finnish Visual Arts Day";
    } else if (mm === AUGUST && dd === 9 && yyyy >= 2020) {
        reason = "To celebrate Tove Jansson and Finnish art";
    } else if (mm === OCTOBER && dd === 1 && yyyy >= 2017) {
        reason = 'To honour Miina Sillanpää and civic influence';
    } else if (mm === OCTOBER && dd === 10) {
        reason = 'Birthday of the National writer Aleksis Kivi; the occasion is also celebrated as the Day of Finnish literature';
    } else if (mm === OCTOBER && dd === 24) {
        reason = 'Day of the United Nations';
    } else if (mm === NOVEMBER && dd === 6) {
        reason = 'Day of the Swedish Identity and Gustavus Adolphus Day';
    } else if (mm === NOVEMBER && dd === 20) {
        reason = "Universal Children's Day";
    } else if (mm === DECEMBER && dd === 6) {
        reason = 'Independence Day';
    } else if (mm === DECEMBER && dd === 8) {
        reason = 'Birthday of the composer Jean Sibelius; the occasion is also celebrated as the Day of Finnish music';
    }
    
    // Moveable dates
    if (is_xth_day_in_month(date, 2, SUNDAY, MAY)) {
        reason = "Mother's Day";
    } else if (is_xth_day_in_month(date, 3, SUNDAY, MAY)) {
        reason = "Memorial day for the war dead (everyone who has died in Finnish wars, combat-like duties or peacekeeping operations both during fighting and after they've ceased, including those executed or who have died as a POW)";
    } else if (mm === JUNE && dd >= 19 && dd <= 25 && day === FRIDAY) {
        reason = "Midsummer's eve";
    } else if (mm === JUNE && dd >= 20 && dd <= 26 && day === SATURDAY) {
        reason = "Midsummer";
    } else if (mm === AUGUST && dd >= 25 && dd <= 31 && day === SATURDAY && yyyy >= 2017) {
        reason = "Finnish Nature Day";
    } else if (is_xth_day_in_month(date, 2, SUNDAY, NOVEMBER)) {
        reason = "Father's Day";
    }
    
    // General election every fourth year.
    // Since 2011: third Sunday in April unless Easter affects this schedule.
    if (is_xth_day_in_month(date, 3, SUNDAY, APRIL)) {
        if (![2019, 2023].includes(yyyy) && (yyyy - 2011) % 4 === 0) {
        reason = "A parliamentary election";
        }
    }
    
    // Other elections
    if (dd === 28 && mm === JANUARY && yyyy === 2018) {
        reason = "A presidential election";
    } else if ((dd === 14 && mm === APRIL && yyyy === 2019)
        || (dd === 2 && mm === APRIL && yyyy === 2023)) {
        // Exceptionally
        reason = "A parliamentary election";
    } else if (dd === 26 && mm === MAY && yyyy === 2019) {
        reason = "A European parliamentary election";
    } else if (dd === 13 && mm === JUNE && yyyy === 2021) {
        reason = "Municipal elections";
    } else if (dd === 23 && mm === JANUARY && yyyy === 2022) {
        reason = "County elections";
    }

    // One-offs
    if (dd === 4 && mm === SEPTEMBER && yyyy === 2014) {
        reason = "70 years since the end of the Continuation War";
    } else if (dd === 5 && mm === DECEMBER && yyyy === 2017) {
        reason = "Finland's Centenary Independence Day Eve";
    } else if (dd === 1 && mm === FEBRUARY && yyyy === 2018) {
        reason = "Inauguration of the President";
    } else if (dd === 28 && mm === MAY && yyyy === 2018) {
        reason = "100th anniversary of the Finnish flag";
    } else if (dd === 16 && mm === FEBRUARY && yyyy === 2018) {
        reason = "Lithuania's 100 years of independence";
    } else if (dd === 24 && mm === FEBRUARY && yyyy === 2018) {
        reason = "Estonia's 100 years of independence";
    } else if (dd === 18 && mm === NOVEMBER && yyyy === 2018) {
        reason = "Latvia's 100 years of independence";
    } else if (dd === 13 && mm === MARCH && yyyy === 2020) {
        reason = "80th anniversary of the end of the Winter War";
    }
    
    if (reason === "") {
        flags_up = false;
        intro = '';
        if (past) {
            reason = 'Flags were not up in Finland on ' + date_format;
        } else if (future) {
            reason = 'Flags will not be up in Finland on ' + date_format;
        } else {
            reason = 'Flags are not up in Finland today, ' + date_format;
        }
        other_reason = "(Unless there's elections, a referendum, the president is inaugurated, or something else &ndash; <a href=\"https://github.com/whyaretheflagsup/whyaretheflagsup/issues/new\">let us know</a>)";
    }

    return [
        flags_up,
        intro,
        reason,
        other_reason,
    ]


}


