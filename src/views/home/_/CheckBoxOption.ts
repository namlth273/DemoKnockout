import { IBaseViewModel } from "@/models/models";

class CheckBoxOptionViewModel implements IBaseViewModel {
    params: ICheckBoxOptionParam = {
        isChecked: ko.observable(false),
        checkBoxText: ko.observable("")
    }

    constructor(params: ICheckBoxOptionParam) {
        this.params = params;
    }

    click() {
        this.params.isChecked(!this.params.isChecked());
    }
}

export interface ICheckBoxOptionParam {
    isChecked: KnockoutObservable<boolean>;
    checkBoxText: KnockoutObservable<string>;
}

export class CheckBoxOptionComponent {
    constructor() {
        return {
            viewModel: CheckBoxOptionViewModel,
            template: require("html-loader!./CheckBoxOption.html")
        };
    }
}
