$(document).ready(function () {
  $("#loader").fadeOut(1500, function () {
    $("body").css("overflow", "visible");
  });
});

// ___________________________________________

const navWidth = $("#home nav").outerWidth();
$("#home nav").css({ left: -navWidth });

$("#home i#openNavBtn").click(function () {
  $("#home nav").animate({ left: 0 });
});

$("#home nav i#closeNavBtn").click(function () {
  $("#home nav").animate({ left: -navWidth });
});

// ___________________________________________

$("#home nav ul li a").click(function () {
  $("#home nav ul li a").removeClass("active");
  $(this).addClass("active");

  const currentLink = $(this).attr("href");
  const currentOffset = $(currentLink).offset().top;
  $("html, body").animate({ scrollTop: currentOffset }, 1000);
});

const home = $("#home").offset().top,
  details = $("#details").offset().top,
  duration = $("#duration").offset().top,
  contact = $("#contact").offset().top,
  scrollNav = [home, details, duration, contact];

const checkScroll = () => {
  for (var i = 0; i < scrollNav.length; i++) {
    if (
      $(window).scrollTop() == scrollNav[i] ||
      ($(window).scrollTop() >= scrollNav[i] &&
        $(window).scrollTop() < scrollNav[i + 1])
    ) {
      $("#home nav ul li a").removeClass("active");
      $("#home nav ul li a")[i].classList.add("active");
    }
  }

    if ($(window).scrollTop() >= contact) {
      $("#home nav ul li a").removeClass("active");
      $("#home nav ul li a")[3].classList.add("active");
    }
};

$(window).scroll(checkScroll);

// ___________________________________________


$("#details .city-card h3").click(function () {
  const card = $(this).siblings()[0];
  $(card).css("margin-bottom") == "0px"
    ? $(card).css("margin-bottom", "50px")
    : $(card).css("margin-bottom", "0");

  $(this).siblings().slideToggle();
});

$("#details .city-card .card-body .city-details .price a").click(function () {
  const currentOffset = $("#contact").offset().top;
  $("html, body").animate({ scrollTop: currentOffset }, 1000);
});

// ___________________________________________

const targetDate = new Date("2024-05-28T00:00:00").getTime();

function updateTimer() {
  const currentDate = new Date().getTime();
  const timeDifference = targetDate - currentDate;

  if (timeDifference <= 0) {
    const nextYear = new Date(targetDate);
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    targetDate = nextYear.getTime();
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  $("#days").text(formatTime(days));
  $("#hours").text(formatTime(hours));
  $("#mins").text(formatTime(minutes));
  $("#secs").text(formatTime(seconds));

  setTimeout(updateTimer, 1000);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

updateTimer();

// ___________________________________________

$("#message").keyup(function () {
  const messageLength = this.value.length;
  $("#characters").text(100 - messageLength);
  if (messageLength == 100) $(this).attr("maxlength", "100");
});
