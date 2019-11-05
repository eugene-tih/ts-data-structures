import {ICodePlayer} from './ICodePlayer';

class CodePlayer implements ICodePlayer {
    private __elementToRender: HTMLElement;

    constructor(elementToRender: HTMLElement) {
        this.__elementToRender = elementToRender;
    }
}
