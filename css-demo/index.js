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
        suffix: "period"
	},
	computed: {
		css () {
            console.log(this.type, this.position, this.imageIndex, this.customSymbol, this.customSystem, this.suffix)
			let css = "list-style: " +  this.position + " ";
            css += (this.type === "custom") ? this.customSymbol+"-"+this.customSystem : this.type
            css += (this.suffix === "period") ? "" : "-"+this.suffix
            if (this.imageIndex == 1 || this.imageIndex == 2) {
                css += " url("+ this.images[this.imageIndex] + ")";
            } else if (this.imageIndex == 3) {
                css += " linear-gradient(to left bottom, red, blue)"
            }
			return css; 
		},
        
        disabled() {return this.type!=="custom"},

        counterStyle() {
            let css = ""
            if (this.type !== "custom") {
                return ""
            } else {
                let name = this.customSymbol+"-"+this.customSystem;
                name+=(this.suffix === "period") ? "" : "-"+this.suffix;
                let symbol = ""
                switch(this.customSymbol) {
                    case "alpha":
                        symbol= "A B C D";
                        break;
                    case "thumbs":
                        symbol= '"\\1F44D"';
                        break;
                    case "circled-alpha":
                        symbol= "Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ Ⓕ Ⓖ Ⓗ Ⓘ Ⓙ Ⓚ Ⓛ Ⓜ Ⓝ Ⓞ Ⓟ Ⓠ Ⓡ Ⓢ Ⓣ Ⓤ Ⓥ Ⓦ Ⓧ Ⓨ Ⓩ";
                        break;
                }

                let suffix = ""
                switch(this.suffix) {
                    case "period":
                        suffix = "}"
                        break;
                    case "paren":
                        suffix=  'suffix: ") ";}';
                        break;
                    case "line":
                        suffix= 'suffix: "| ";}';
                        break;
                }

                css = "\n\n @counter-style "+name+" {\n\t system: "+this.customSystem+"; \n\tsymbols: "+symbol+";\n\t"+suffix;
                return css
            }
        }
	},
    methods: {
        copy() {
          const css = this.$refs.code1;
          const counterStyle = this.$refs.code2;
          if (counterStyle!== undefined) {
            console.log(css.innerHTML + counterStyle.innerHTML)
            navigator.clipboard.writeText(css.innerHTML + counterStyle.innerHTML)
          } else {
            navigator.clipboard.writeText(css.innerHTML)
          }
        }
    },
},  "#app");