import { typewriter } from "../typewriter.js";

class AwardBios extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return `
      .screen {
        display: block;
        width: var(--width, 1024px);
        height: var(--height, 768px);
        position: relative;
        padding: 25px;
        color: #ccc;
        position: relative;
        background: #000;
      }
      .blue {
        background: #0000FE;
      }
      .center {
        text-align: center;
      }
      .setup {
        display: grid;
        grid-template-rows: 5.8fr 1fr 1.2fr;
        border: 3px double #fff;
        height: 94%;
      }
      .main-options {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }
      .options-1 {
        border-right: 1px solid #fff;
      }

      .options {
        padding: 35px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-bottom: 125px;
      }

      .main-options span {
        display: block;
        white-space: pre;
        color: #EBFE82;

        padding: 2px 6px;
      }

      .main-options span.selected {
        background: #F31A0A;
        display: inline;
      }

      .shorthands {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 0.1fr);
        align-items: center;
        justify-items: flex-start;
        justify-content: center;
        align-content: center;
        border-top: 3px double #fff;
        padding-left: 16px;
      }
      .copyright {
        border-top: 3px double #fff;
        text-align: center;
      }
      .message {
        background: #F31A0A;
        position: absolute;
        top: 320px;
        left: 350px;
        display: flex;
        align-items: center;
        padding: 8px 3px;
        box-shadow: 12px 18px 0 #000a;
      }
      .container {
        color: #fff;
        border: 1px solid #fff;
        padding: 32px;
      }
      strong {
        color: #fff;
        font-weight: normal;
      }
      .cursor {
        width: 12px;
        display: inline-block;
        border-bottom: 2px solid #c1c1c1;
        animation: blink 1s steps(1) infinite;
      }
      @keyframes blink {
        0%, 50% { opacity: 1 }
        50%, 100% { opacity: 0 }
      }
    `;
  }

  connectedCallback() {
    this.render();
    setTimeout(() => this.showExit(), 4000);
  }

  showExit() {
    this.shadowRoot.querySelector(".screen").innerHTML += `
    <div class="message">
      <div class="container">SAVE to CMOS and EXIT (Y/N)?</div>
    </div>`;
    setTimeout(() => this.exitBIOS(), 2000);
  }

  exitBIOS() {
    const screen = this.shadowRoot.querySelector(".screen");
    screen.classList.remove("blue");
    screen.innerHTML = `<p>C:\\&gt;<span class="typewriter" data-duration="2000" data-delay="0">TWITCH.EXE MANZDEV</span><span class="cursor"></span>`;
    typewriter(screen.querySelector(".typewriter"));
    setTimeout(() => {
      screen.innerHTML = `
        <p>
          C:\\&gt;TWITCH.EXE MANZDEV<br><br>
          Start booting <strong>Twitch.tv/ManzDev</strong>...<span class="cursor"></span>
        </p>
      `;
    }, 3000);
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>${AwardBios.styles}</style>
    <div class="blue screen">
      <div class="title center">CMOS Setup Utility - Copyright (C) 1984-2001 Award Software</div>
      <div class="setup">
        <div class="main-options">
          <div class="options options-1">
            <span class="selected">► Standard CMOS Setup</span>
            <span>► Advanced Setup</span>
            <span>► Advanced Chipset Setup</span>
            <span>► Integrated Peripherals</span>
            <span>► Power Management Setup</span>
            <span>► PCI/PnP Setup</span>
            <span>► PC Health Status</span>
          </div>
          <div class="options options-2">
            <span>► Frequency/Voltage Control</span>
            <span>  Load Default Settings</span>
            <span>► Supervisor Password</span>
            <span>► User Password</span>
            <span>  Save & Exit Setup</span>
            <span>  Exit Without Saving</span>
          </div>
        </div>
        <div class="shorthands">
          <span>Esc : Quit</span>
          <span>↑↓→← : Select Item</span>
          <span>F10 : Save & Exit Setup</span>
        </div>
        <div class="copyright">
          <p>Change/Set/Disable Password</p>
        </div>
      </div>
    </div>`;
  }
}

customElements.define("award-bios", AwardBios);
