var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var MAX_INDEX = 5;
var MIN_INDEX = 1;
var CAPTIONS = [ "Stayin' Alive", "How Deep Is Your Love", "You Should Be Dancing", "Night Fever", "To Love Somebody" ];


function setDetails(imageURL, titleText) {
    'use strict';    
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageURL);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb){
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
}

function goNext() {
    'use strict';
    var image = document.getElementById("current-image");
    var captionElement = document.getElementById("current-image-title");
    var source = image.getAttribute("src");
    var position1 = source.indexOf("otter") + 5;    
    var position2 = source.indexOf(".jpg");
    var currentIndex = source.substring(position1, position2);

    if (parseInt(currentIndex) === MAX_INDEX) {
        currentIndex = MIN_INDEX;
    }
    else {
        ++currentIndex;
    }

    image.setAttribute("src", "img/otter" + currentIndex.toString() + ".jpg");
    captionElement.innerHTML = CAPTIONS[currentIndex - 1];

}

function goPrev() {
    'use strict';
    var image = document.getElementById("current-image");
    var captionElement = document.getElementById("current-image-title");
    var source = image.getAttribute("src");
    var position1 = source.indexOf("otter") + 5;    
    var position2 = source.indexOf(".jpg");
    var currentIndex = source.substring(position1, position2);

    if (parseInt(currentIndex) === MIN_INDEX) {
        currentIndex = MAX_INDEX;
    }
    else {
        --currentIndex;
    }

    image.setAttribute("src", "img/otter" + currentIndex.toString() + ".jpg");
    captionElement.innerHTML = CAPTIONS[currentIndex - 1];

}

initializeEvents();