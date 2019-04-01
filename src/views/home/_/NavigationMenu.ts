import { IBaseViewModel, IBaseParam } from "@/models/models";

class NavigationMenuViewModel implements IBaseViewModel {
    pageIndex: KnockoutObservable<number> = ko.observable(0);
    params: KnockoutObservable<IBaseParam> = ko.observable({} as IBaseParam);

    constructor(params: INavigationMenuParam) {
        if(params && params.params()) {
            this.params = params.params;
        }
    }

    back() {
        this.params().activeFormId(this.params().activeFormId() - 1);
    }
}

export class NavigationMenuComponent {
    constructor() {
        return {
            viewModel: NavigationMenuViewModel,
            template: require("html-loader!./NavigationMenu.html")
        };
    }
}

interface INavigationMenuParam {
    params: KnockoutObservable<IBaseParam>;
}