export default class Collapsible {
  #content;

  #toggleButtonTitle;

  #copyButtonTitle;

  #offsetHeight;

  static get selector() {
    return '.collapsible';
  }

  static get selectorToggleButton() {
    return '.collapsible-toggle_button';
  }

  static get selectorCopyButton() {
    return '.collapsible-copy_button';
  }

  static get selectorContent() {
    return '.collapsible-content';
  }

  static get selectorContentWrapper() {
    return '.collapsible-content-wrapper';
  }

  static get markup() {
    return `
      <div class="collapsible">
        <div class="collapsible-body">
          <button class="collapsible-toggle_button"></button>
          <div class="collapsible-content-wrapper">
            <div class="collapsible-content"></div>
          </div>
        </div>
        <button class="collapsible-copy_button"></button>
      </div>      
    `;
  }

  constructor(content = '', toggleButtonTitle = 'Collapse', copyButtonTitle = 'Copy') {
    this.#content = content;
    this.#toggleButtonTitle = toggleButtonTitle;
    this.#copyButtonTitle = copyButtonTitle;
    this.toggle = this.toggle.bind(this);
  }

  get content() { return this.#content; }

  set content(content) {
    this.#content = content;
    if (this.elContent) {
      this.elContent.textContent = content;
    }
  }

  get toggleButtonTitle() { return this.#toggleButtonTitle; }

  set toggleButtonTitle(title) {
    this.#toggleButtonTitle = title;
    if (this.elToggleButtonTitle) {
      this.elToggleButtonTitle.textContent = title;
    }
  }

  get copyButtonTitle() { return this.#copyButtonTitle; }

  set copyButtonTitle(title) {
    this.#copyButtonTitle = title;
    if (this.elCopyButton) {
      this.elCopyButton.textContent = title;
    }
  }

  bindToDOM(el) {
    this.container = el;
    if (this.elWrapper) {
      this.container.appendChild(this.elWrapper);
    }
  }

  render() {
    this.container.innerHTML = Collapsible.markup;

    this.elWrapper = this.container.querySelector(Collapsible.selector);
    this.elContent = this.container.querySelector(Collapsible.selectorContent);
    this.elContentWrapper = this.container.querySelector(Collapsible.selectorContentWrapper);
    this.elToggleButton = this.container.querySelector(Collapsible.selectorToggleButton);
    this.elCopyButton = this.container.querySelector(Collapsible.selectorCopyButton);

    this.elContent.textContent = this.#content;
    this.elToggleButton.textContent = this.#toggleButtonTitle;
    this.elCopyButton.textContent = this.#copyButtonTitle;

    this.#offsetHeight = this.elContentWrapper.offsetHeight;
    this.elContentWrapper.style.height = 0;

    this.registerEvents();
  }

  registerEvents() {
    this.elToggleButton.addEventListener('click', this.toggle);
  }

  toggle() {
    this.elWrapper.classList.toggle('collapsible-active');
    const isActive = this.elWrapper.classList.contains('collapsible-active');
    this.elContentWrapper.style.height = isActive ? `${this.#offsetHeight}px` : '0px';
  }
}
