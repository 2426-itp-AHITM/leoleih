import {Item} from "./item";
import {model} from "../model";

export async function loadItems(){
    if (model.searchText != ""){
        const response = await fetch("http://localhost:8080/devices");
        const data = await response.json() as Item[];
        let items: Item[] = [];
        switch (model.searchText){
            case "photo_camera":
                items = data.filter(item => item.dev_type	 == "Foto");
                break;
            case "video_camera":
                items = data.filter(item => item.dev_type	 == "Video");
                break;
            case "audio_device":
                items = data.filter(item => item.dev_type	 == "Audio");
                break;
            default:
                console.log(model.searchText)
                items = data;
                break;
        }
        console.log("items: ",items);
        return items;
    }else{
        return [];
    }
}
export async function loadDetail(id){
    const response = await fetch("http://localhost:8080/devices/"+id);
    const data = await response.json();
    return await data as Item;
}