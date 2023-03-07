import { createApp } from "https://mavue.mavo.io/mavue.js";

globalThis.app = createApp({
	data: {
        imageIndex: 0,
		images: [ "", 
            "https://interactive-examples.mdn.mozilla.net/media/examples/rocket.svg",
            "https://cssreference.io/images/list-style-image.png",
        ],
		type: "disc",
        position: "outside",
        customSymbol: "alpha",
        customSystem: "cyclic",
        suffix: "none"
	},
	computed: {
		css () {
            console.log(this.type, this.position, this.imageIndex, this.customSymbols, this.customSystem)
			let css = "list-style: " +  this.position + " ";
            css += (this.type === "custom") ? this.customSymbol+"-"+this.customSystem : this.type
            css += (this.suffix === "none") ? "" : "-"+this.suffix
            if (this.imageIndex == 1 || this.imageIndex == 2) {
                css += " url("+ this.images[this.imageIndex] + ")";
            } else if (this.imageIndex == 3) {
                css += " linear-gradient(to left bottom, red, blue)"
            }
			return css;
		},
        disabled() {return this.type!=="custom"}
	},
    methods: {
        copy() {
          const element = this.$refs.code;
          element.select();
          element.setSelectionRange(0, 99999);
          document.execCommand('copy');
        }
    },
},  "#app");