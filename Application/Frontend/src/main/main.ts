import {html, render} from "lit-html";
import {style} from "./css_main";
import {loadItems} from "../model/item-service";
import {subscribe} from "../model";
import "./detailview/detailview";
import "./item/itemelem";

const HTML_NAME = "custom-main";
function itemTemplate(item){
    if (item == undefined) {
        return html``;
    }
    return html`
        <custom-item dev_id="${item.dev_id}" dev_type="${item.dev_type}" dev_category="${item.dev_category}" dev_serial_nr="${item.dev_serial_nr}" dev_asset_nr="${item.dev_asset_nr}" lent_from="${item.lent_from}" return_date="${item.return_date}" notes="${item.notes}" dev_set="${item.dev_set}"></custom-item>
    `
}
class Module extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"});
    }
    async content(){
        const items = await loadItems();
        const elements = [];

        for(let i = 0;i<items.length;i++){
            elements.push(itemTemplate(items[i]));
        }
        return html`
            ${style}
            <div style="opacity: ${elements.length === 0 ? 0 : 1}">
                ${elements}
                ${items.length === 0 ? "Keine Gegenstände gefunden :/":""}
            </div>
        `;
    }
    connectedCallback() {
        subscribe(model=>{
            this.renderHTML();
        })
        this.renderHTML();
    }
    async renderHTML(){
        const content = await this.content();
        render(content, this.shadowRoot);
    }
}
customElements.define(HTML_NAME, Module);