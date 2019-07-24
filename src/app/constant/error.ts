import { toTitleCase } from "./messages";

export const PATTERN_ERRORS = (pattern,key) => {
    if(pattern == /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/){
        return `Please enter a valid ${key.toLowerCase()}`
    }
    if(pattern == /^[^\s]+$/){
        return `${toTitleCase(key)} can not contain blank spaces`
    }
    if(pattern == /(.|\s)*\S(.|\s)*/){
        return `${toTitleCase(key)} can not be blank`
    }
    if(pattern == "^[0-9]+$"){
        return `${toTitleCase(key)} must contain only digits`
    }
    if(pattern == /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi){
        return `Please enter a valid ${key.toLowerCase()}`
    }
    if(pattern == /(?<=^| )\d+(\.\d+)?(?=$| )|(?<=^| )\.\d+(?=$| )/){
        return `${toTitleCase(key)} must be numeric`
    }
}