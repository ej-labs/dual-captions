class YouTubeConfig extends DualCaptionsConfig {
  constructor() {
    super();
    this.site = "youtube";
    this.playerId = "movie_player";
    this.captionWindowClass = "ytp-caption-window-bottom";
    this.captionClass = "captions-text";
  }

  // Returns true if mutation reflects a caption added to the DOM.
  captionWasAdded(mutation) {
    return mutation.target.classList.contains(this.captionClass) && mutation.addedNodes.length > 0; 
  }

  // Get the video player element.
  getPlayer() {
    return document.getElementById(this.playerId);
  }

  // Get the caption window element.
  getCaptionWindow() {
    return document.querySelector(`.${this.captionWindowClass}:not(.ytp-caption-window-rollup)`);
    // Automatic captions (.ytp-caption-window-rollup) won't work, so we prevent using them. 
  }

  // Get the new caption element from a mutation record.
  // Returns element
  getNewCaption(mutation) {
    return mutation.addedNodes[0];
  }

  // Apply the appropriate style to the translated caption element.
  styleCaptionElement(element, mutation) {
    const captionStyle = mutation.target.querySelector('span').style.cssText;
    element.style = captionStyle;
    element.classList.add(this.captionClass);
    return element;
  }

  // Append the new caption element to the DOM
  appendToDOM(element) {
    let captionWindow = this.getCaptionWindow();
    if (captionWindow) {
      captionWindow.appendChild(document.createElement('br'));
      captionWindow.appendChild(element);
    }
  }
}

window.DC.config = new YouTubeConfig();
