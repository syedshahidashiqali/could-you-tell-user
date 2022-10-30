
var scrollToTopBtn = document.querySelector(".scrollToTopBtn");
var rootElement = document.documentElement;
var TOGGLE_RATIO = 0.8;

function handleScroll() {
  // do something on scroll
  var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  if (rootElement.scrollTop / scrollTotal > TOGGLE_RATIO) {
    //show button
    scrollToTopBtn.classList.add("showBtn");
  } else {
    //hide button
    scrollToTopBtn.classList.remove("showBtn");
  }
}

function scrollToTop() {
  //scroll to top logic
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
scrollToTopBtn.addEventListener("click", scrollToTop);
document.addEventListener("scroll", handleScroll);

// MULTIPLE EMAILS BOX STARTS
$("#generateList").on("click", function () {
  var list = $(".multiple-val-input li div")
    .map(function () {
      return $.trim($(this).text());
    })
    .get();
  console.log(list.toString());
});

$(".multiple-val-input").on("click", function () {
  $(this).find("input:text").focus();
});
$(".multiple-val-input ul input:text").on("input propertychange", function () {
  $(this).siblings("span.input_hidden").text($(this).val());
  var inputWidth = $(this).siblings("span.input_hidden").width();
  $(this).width(inputWidth);
});
$(".multiple-val-input ul input:text").on("keypress", function (event) {
  if (event.which == 13 || event.which == 44) {
    var toAppend = $(this).val();
    if (toAppend != "") {
      $(
        "<li><div>" +
        toAppend +
        '</div> <a href="#"><i class="fas fa-times"></i></a></li>'
      ).insertBefore($(this));
      $(this).val("");
    } else {
      return false;
    }
    return false;
  }
});
$(document).on("click", ".multiple-val-input ul li a", function (e) {
  e.preventDefault();
  $(this).parents("li").remove();
});
// MULTIPLE EMAILS BOX ENDS

// popup for new and used cards on subscription plans page
var newCard = document.getElementById("newCard");
var newBox = document.getElementById("newBox");

var savedCard = document.getElementById("savedCard");
var savedBox = document.getElementById("savedBox");

function myFunction() {
  console.log("clicked");
  if (newCard.checked === true) {
    newBox.style.display = "block";
    savedBox.style.display = "none";
  } else if (savedCard.checked === true) {
    newBox.style.display = "none";
    savedBox.style.display = "block";
  }
}
// end of popup for new and used cards on subscription plans page

// $(".toggle-icon").click(function () {
//   $(this).toggleClass("fa-eye fa-eye-slash");
//   var input = $(".password1");
//   if (input.attr("type") === "password") {
//     input.attr("type", "text");
//   } else {
//     input.attr("type", "password");
//   }
// });

$(".toggle-wishlist").click(function () {
  $(this).toggleClass("fas far");
});
$(".toggle-icon").click(function () {
    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $(".pass-input");
    if (input.attr("type") === "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});


// New Password
$(".newPass").click(function () {
  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $(".resetNewPass");
  if (input.attr("type") === "password") {
      input.attr("type", "text");
  } else {
      input.attr("type", "password");
  }
});


// Confirm Password
$(".confirmPass").click(function () {
  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $(".confirmNewPAssword");
  if (input.attr("type") === "password") {
      input.attr("type", "text");
  } else {
      input.attr("type", "password");
  }
});

// Change Current Password
$(".changeCurrentPass").click(function () {
  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $(".changeCurrentPassword");
  if (input.attr("type") === "password") {
      input.attr("type", "text");
  } else {
      input.attr("type", "password");
  }
});

// Change New Password
$(".changeNewPass").click(function () {
  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $(".changeNewPassword");
  if (input.attr("type") === "password") {
      input.attr("type", "text");
  } else {
      input.attr("type", "password");
  }
});

// Confirm New Password
$(".confirmNewPassword").click(function () {
  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $(".confirmNewPass");
  if (input.attr("type") === "password") {
      input.attr("type", "text");
  } else {
      input.attr("type", "password");
  }
});


// Signup Password
$(".signupPass").click(function () {
  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $(".signupPassword");
  if (input.attr("type") === "password") {
      input.attr("type", "text");
  } else {
      input.attr("type", "password");
  }
});

// Confirm Signup Password
$(".signupPassConfirm").click(function () {
  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $(".signupPasswordConfirm");
  if (input.attr("type") === "password") {
      input.attr("type", "text");
  } else {
      input.attr("type", "password");
  }
});


// MY ORDERS
$(document).ready(function(){
  $('a[href="#search"]').on('click', function(event) {      
    $('#search').addClass('open');
    $('#search > form > input[type="search"]').focus();
  });            
  $('#search, #search button.close').on('click keyup', function(event) {
    if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
      $(this).removeClass('open');
    }
  }); 
  // Reference the tab links.
  const tabLinks = $('#tab-links li a');

  // Handle link clicks.
  tabLinks.click(function (event) {
    var $this = $(this);

    // Prevent default click behaviour.
    event.preventDefault();

    // Remove the active class from the active link and section.
    $('#tab-links a.active, section.active').removeClass('active');

      // Add the active class to the current link and corresponding section.
      $this.addClass('active');
      $($this.attr('href')).addClass('active');
    });
            
});
// MY ORDERS ENDS


// popular categories slider on shop page
$('#popular-categories').owlCarousel({
  loop: true,
  margin: 20,
  dots: false,
  nav: true,
  navText: [
    "<div class='nav-button owl-prev bg-transparent'><image src='./images/owl-prev.png' class='img-fluid'></image></div>",
    "<div class='nav-button owl-next bg-transparent'><image src='./images/owl-next.png' class='img-fluid'></image></div>"
  ],
  responsive: {
    0: {
      items: 1,
      dots: true,
      nav: false
    },
    600: {
      items: 3,
    },
    767: {
      dots: true
    },
    1024: {
      items: 4
    },
    1200: {
      items: 5
    }
  }
});

// QUANTITY INCREASE DECREASE
var minVal = 1, maxVal = 20; // Set Max and Min values
// Increase product quantity on cart page
$(".increaseQty").on('click', function(){
		var $parentElm = $(this).parents(".qtySelector");
		$(this).addClass("clicked");
		setTimeout(function(){
			$(".clicked").removeClass("clicked");
		},100);
		var value = $parentElm.find(".qtyValue").val();
		if (value < maxVal) {
			value++;
		}
		$parentElm.find(".qtyValue").val(value);
});
// Decrease product quantity on cart page
$(".decreaseQty").on('click', function(){
		var $parentElm = $(this).parents(".qtySelector");
		$(this).addClass("clicked");
		setTimeout(function(){
			$(".clicked").removeClass("clicked");
		},100);
		var value = $parentElm.find(".qtyValue").val();
		if (value > 1) {
			value--;
		}
		$parentElm.find(".qtyValue").val(value);
	});

  
// QUANTITY ENDS

// $("[id^=carousel-thumbs]").carousel({
// 	interval: false
// });

/** Pause/Play Button **/
$(".carousel-pause").click(function () {
	var id = $(this).attr("href");
	if ($(this).hasClass("pause")) {
		$(this).removeClass("pause").toggleClass("play");
		$(this).children(".sr-only").text("Play");
		$(id).carousel("pause");
	} else {
		$(this).removeClass("play").toggleClass("pause");
		$(this).children(".sr-only").text("Pause");
		$(id).carousel("cycle");
	}
	$(id).carousel;
});

/** Fullscreen Buttun **/
$(".carousel-fullscreen").click(function () {
	var id = $(this).attr("href");
	$(id).find(".active").ekkoLightbox({
		type: "image"
	});
});

if ($("[id^=carousel-thumbs] .carousel-item").length < 2) {
	$("#carousel-thumbs [class^=carousel-control-]").remove();
	$("#carousel-thumbs").css("padding", "0 5px");
}

$("#carousel").on("slide.bs.carousel", function (e) {
	var id = parseInt($(e.relatedTarget).attr("data-slide-number"));
	var thumbNum = parseInt(
		$("[id=carousel-selector-" + id + "]")
			.parent()
			.parent()
			.attr("data-slide-number")
	);
	$("[id^=carousel-selector-]").removeClass("selected");
	$("[id=carousel-selector-" + id + "]").addClass("selected");
	$("#carousel-thumbs").carousel(thumbNum);
});



const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active')
    })
    tabs.forEach(tab => {
      tab.classList.remove('active')
    })
    tab.classList.add('active')
    target.classList.add('active')
  })
})




const giftImage = document.querySelector("#add-gift-image");
const giftUploadedBtn = document.getElementById("gift-uploaded-btn");
const giftUploaded = document.getElementById("gift-uploaded");
const giftBox = document.getElementById("add-gift-box");
const zoomBtn = document.getElementById("zoom-btn");

giftImage.addEventListener("click", function () {
  giftBox.style.display = "none";
  giftUploaded.style.display = "block";
});

giftUploadedBtn.addEventListener("click", function () {
  giftUploaded.style.display = "none";
  zoomBtn.style.top = "45%";
});


// const lightbox = new FsLightbox();

// // set up props, like sources, types, events etc.
// lightbox.props.sources = ['../images/video.mp4'];
// lightbox.props.onInit = () => console.log('Lightbox initialized!');

// lightbox.open();


