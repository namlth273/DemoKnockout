import { IBaseViewModel } from "@/models/models";

class KnockStrapViewModel implements IBaseViewModel {
    templateId: KnockoutObservable<string> = ko.observable("templateId");

    constructor() {

    }
}

export class KnockStrapComponent {
    constructor() {
        return {
            viewModel: KnockStrapViewModel,
            template: require("html-loader!./KnockStrapSection.html")
        };
    }
}
